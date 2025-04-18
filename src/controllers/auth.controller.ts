

import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/auth.service';
import { getUserProfile } from '../services/user.service';
import { AuthRequest } from '../middlewares/auth.middleware'; // Make sure this path is correct

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const data = await registerUser(name, email, password);
    res.status(201).json(data);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const data = await loginUser(email, password);
    res.status(200).json(data);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ New: Get user profile
export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user?.id) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const user = await getUserProfile(req.user.id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};





