



import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { getCartByUserId, addToCart, removeFromCart, clearCart } from '../services/cart.service';

export const getCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const cart = await getCartByUserId(userId);
    res.json(cart || { products: [] });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const addItem = async (req: AuthRequest, res: Response): Promise<void> => {
    console.log("inside cart")
  try {
    const userId = req.user?.id;
    const { productId, quantity } = req.body;

    if (!userId || !productId) {
      res.status(400).json({ message: 'Missing user or product ID' });
      return;
    }

    const updatedCart = await addToCart(userId, productId, quantity || 1);
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const removeItem = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { productId } = req.params;

    if (!userId || !productId) {
      res.status(400).json({ message: 'Missing user or product ID' });
      return;
    }

    const updatedCart = await removeFromCart(userId, productId);
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const clearUserCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    await clearCart(userId);
    res.status(200).json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};





