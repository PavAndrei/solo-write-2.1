import { Request, Response, NextFunction } from 'express';
import { Comment } from '../models/comment.model';
import { User } from '../models/user.model';
import { Article } from '../models/article.model';
import { errorHandler } from '../middlewares/handleErrors';

export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const { text, articleId } = req.body;

    if (!userId) {
      throw errorHandler(401, 'Unauthorized');
    }

    if (!text || !articleId) {
      throw errorHandler(400, 'Text and articleId are required');
    }

    const article = await Article.findById(articleId);
    if (!article) {
      throw errorHandler(404, 'Article not found');
    }

    const user = await User.findById(userId).select('username avatarUrl');
    if (!user) {
      throw errorHandler(404, 'User not found');
    }

    const newComment = await Comment.create({
      text,
      articleId,
      author: {
        userId,
        username: user.username,
        userAvatar: user.avatarUrl || null,
      },
      likes: 0,
      isLiked: [],
      popularity: 0,
    });

    return res.status(201).json({
      success: true,
      message: 'Comment created successfully',
      data: newComment,
    });
  } catch (err) {
    next(err);
  }
};

export const getCommentsByArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const article = await Article.findById(id);
    if (!article) throw errorHandler(404, 'Article not found');

    const comments = await Comment.find({ articleId: id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      message: `Comments to the article ${article.title} have been received.`,
      data: comments,
    });
  } catch (err) {
    next(err);
  }
};
