import { Request, Response, NextFunction } from 'express';
import { Comment } from '../models/comment.model';
import { User } from '../models/user.model';
import { errorHandler } from '../middlewares/handleErrors';

export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const { text, articleSlug } = req.body;

    if (!userId) {
      throw errorHandler(401, 'Unauthorized');
    }

    if (!text || !articleSlug) {
      throw errorHandler(400, 'Text and articleSlug are required');
    }

    // Находим пользователя для получения username
    const user = await User.findById(userId).select('username');
    if (!user) {
      throw errorHandler(404, 'User not found');
    }

    // Создаём комментарий
    const newComment = await Comment.create({
      text,
      articleSlug,
      author: {
        userId,
        username: user.username,
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
