import { Router } from 'express';
import { createArticle } from '../controllers/article.controller';
import { checkAuth } from '../middlewares/checkAuth';
import { uploadMultiplyImages } from '../middlewares/uploadImages';
import { validate } from '../middlewares/validate';
import { editorSchema } from '../schemas/editor.schema';

export const articleRouter = Router();

articleRouter.post(
  '/create',
  checkAuth,
  uploadMultiplyImages,
  validate(editorSchema),
  createArticle
);
