

import CartModel from '../model/cart.model';
import { Types } from 'mongoose';

export const getCartByUserId = async (userId: string) => {
  // Populate the product field within products array
  return await CartModel.findOne({ user: userId }).populate('products.product');
};

export const addToCart = async (userId: string, productId: string, quantity: number) => {
  // Check if productId is a valid ObjectId
  if (!Types.ObjectId.isValid(productId)) {
    throw new Error('Invalid product ID');
  }

  let cart = await CartModel.findOne({ user: userId });

  // If a cart exists, modify it. Otherwise, create a new one
  if (cart) {
    // Find if the product already exists in the cart
    const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
    if (productIndex > -1) {
      // If product exists, update the quantity
      cart.products[productIndex].quantity += quantity;
    } else {
      // If product doesn't exist, add a new entry
      cart.products.push({ product: new Types.ObjectId(productId), quantity });
    }
  } else {
    // If cart doesn't exist, create a new one with the product
    cart = new CartModel({
      user: userId,
      products: [{ product: new Types.ObjectId(productId), quantity }],
    });
  }

  return await cart.save();
};

export const removeFromCart = async (userId: string, productId: string) => {
  // Check if productId is a valid ObjectId
  if (!Types.ObjectId.isValid(productId)) {
    throw new Error('Invalid product ID');
  }

  // Remove the product from the cart
  return await CartModel.findOneAndUpdate(
    { user: userId },
    { $pull: { products: { product: new Types.ObjectId(productId) } } },
    { new: true }
  );
};

export const clearCart = async (userId: string) => {
  // Delete the entire cart for the user
  return await CartModel.findOneAndDelete({ user: userId });
};



