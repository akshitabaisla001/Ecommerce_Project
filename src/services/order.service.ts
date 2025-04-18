

import OrderModel from '../model/order.model';
import ProductModel from '../model/product.model';
export const getUserOrders = async (userId: string) => {
    return await OrderModel.find({ user: userId }).populate('products.product');
  };
  

  export const placeOrderService = async (userId: string, products: any[]) => {
    let totalPrice = 0;
  
    const validatedProducts = [];
  
    for (const item of products) {
      const productData = await ProductModel.findById(item.product);
      if (!productData) {
        throw new Error(`Product not found: ${item.product}`);
      }
      totalPrice += productData.price * item.quantity;
      validatedProducts.push({
        product: item.product,
        quantity: item.quantity
      });
    }
  
    const newOrder = new OrderModel({
      user: userId,
      products: validatedProducts,
      totalPrice,
      status: 'pending',
    });
  
    return await newOrder.save();
  };
