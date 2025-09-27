import { Router } from 'express';
import { createComment } from '../controllers/comment.controller';
import { checkAuth } from '../middlewares/checkAuth';

export const commentRouter = Router();

commentRouter.post('/create', checkAuth, createComment);
