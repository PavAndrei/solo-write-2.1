import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { errorHandler } from './handleErrors';

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      return next(errorHandler(401, 'Not authenticated'));
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as {
      userId: string;
      email: string;
      verified: boolean;
      role: string;
      iat: number;
      exp: number;
    };

    req.userId = decoded.userId;

    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
