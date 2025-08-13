import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { errorHandler } from '../middlewares/handleErrors';
import { Article } from '../models/article.model';
import { EditorValues } from '../types/auth.types';
import { ApiResponse, ImageRequest } from '../types/common.types';
import { User } from '../models/user.model';
import { editorSchema } from '../schemas/editor.schema';
import { ArticleResponse } from '../types/article.types';

export const createArticle = async (
  req: ImageRequest<{}, {}, EditorValues>,
  res: Response<ApiResponse<ArticleResponse>>,
  next: NextFunction
) => {
  try {
    if (!req.userId || !mongoose.Types.ObjectId.isValid(req.userId)) {
      return next(errorHandler(400, 'Invalid or missing userId'));
    }

    // Проверка существования пользователя
    const userExists = await User.exists({ _id: req.userId });
    if (!userExists) {
      return next(errorHandler(404, 'User not found'));
    }

    const slug = req.body.title
      .split(' ')
      .join('-')
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, '');

    const existingArticle = await Article.findOne({ slug });
    if (existingArticle) {
      return next(errorHandler(400, 'Article with this title already exists'));
    }

    const newArticle = new Article({
      title: req.body.title,
      description: req.body.description,
      categories: req.body.category,
      content: req.body.content,
      images: req.imageUrls,
      viewsCount: 0,
      likesCount: 0,
      likedBy: [],
      user: req.userId,
      slug,
    });

    const savedArticle = await newArticle.save();

    await User.findByIdAndUpdate(
      req.userId,
      { $push: { articles: savedArticle._id } },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: 'The article has been created',
      data: savedArticle,
    });
  } catch (err) {
    next(err);
  }
};
