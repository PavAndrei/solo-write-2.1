import { Router } from 'express';
import {
  createComment,
  getCommentsByArticle,
  deleteComment,
  toggleCommentLike,
  getAllComments,
} from '../controllers/comment.controller';
import { checkAuth } from '../middlewares/checkAuth';

export const commentRouter = Router();

commentRouter.post('/create', checkAuth, createComment);
commentRouter.get('/:id', getCommentsByArticle);
commentRouter.delete('/:id', checkAuth, deleteComment);
commentRouter.patch('/:id/like', checkAuth, toggleCommentLike);
commentRouter.get('/', checkAuth, getAllComments);
