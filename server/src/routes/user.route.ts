import { Router } from 'express';
import { deleteUser, getAllUsers } from '../controllers/user.controller';
import { checkAuth } from '../middlewares/checkAuth';

export const userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.delete('/:id', checkAuth, deleteUser);
