import { Router } from 'express';
import { createArticle } from '../controllers/article.controller';
import { checkAuth } from '../middlewares/checkAuth';
import { uploadMultiplyImages } from '../middlewares/uploadImages';
import { validate } from '../middlewares/validate';
import { createArticleSchema } from '../schemas/editor.schema';

export const articleRouter = Router();

articleRouter.post(
  '/create',
  checkAuth,
  uploadMultiplyImages, // Теперь требует ровно 5 файлов
  validate(createArticleSchema), // Валидация body
  createArticle
);
