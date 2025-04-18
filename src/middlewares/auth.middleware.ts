
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend Express Request to include user field
export interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction):void=> {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
     res.status(401).json({ message: 'Not authorized, no token' });
     return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'yourVerySecretKey') as { id: string };

    // Attach user ID to request
    req.user = { id: decoded.id };
    
    next();  // Proceed to next middleware or route handler
  } catch (error) {
    // If there's an error with the token, respond with a 401 status
     res.status(401).json({ message: 'Not authorized, token failed' });
  }
};




