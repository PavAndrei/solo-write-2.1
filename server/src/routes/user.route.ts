import { Router } from 'express';
import { getAllUsers } from '../controllers/user.controller';

export const userRouter = Router();

userRouter.get('/', getAllUsers);
