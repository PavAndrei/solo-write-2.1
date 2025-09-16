import { Router } from 'express';
import {
  createArticle,
  getArticles,
  getOneArticle,
} from '../controllers/article.controller';
import { checkAuth } from '../middlewares/checkAuth';
import { validate } from '../middlewares/validate';
import { createArticleSchema } from '../schemas/editor.schema';
import { upload } from '../middlewares/upload';

export const articleRouter = Router();

articleRouter.post(
  '/create',
  checkAuth,
  upload.array('images', 5),
  validate(createArticleSchema),
  createArticle
);

articleRouter.get('/', getArticles);
articleRouter.get('/:slug', getOneArticle);
