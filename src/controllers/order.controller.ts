
import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { placeOrderService } from '../services/order.service';
import { getUserOrders } from '../services/order.service';

export const getOrders = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const orders = await getUserOrders(userId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const placeOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const { products } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      res.status(400).json({ message: 'No products provided' });
      return;
    }

    const newOrder = await placeOrderService(userId, products);

    res.status(201).json(newOrder);
    console.log(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
  
