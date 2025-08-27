import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';
import { errorHandler } from '../middlewares/handleErrors';
import cloudinary from '../configs/cloudinary.config';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      role,
      verified,
      username,
      email,
      sort,
      startIndex,
      limit,
      hasAvatar,
      articlesCount,
      commentsCount,
    } = req.query;

    const filter: Record<string, any> = {};

    if (role) filter.role = role;
    if (verified) filter.verified = verified === 'true';
    if (username)
      filter.username = { $regex: username as string, $options: 'i' };
    if (email) filter.email = { $regex: email as string, $options: 'i' };
    if (hasAvatar) {
      filter.avatarUrl =
        hasAvatar === 'true'
          ? { $exists: true, $ne: null }
          : { $in: [null, ''] };
    }

    const skip = startIndex ? parseInt(startIndex as string, 10) : 0;
    const limitNum = limit ? parseInt(limit as string, 10) : 10;

    let sortOption: Record<string, 1 | -1> = { createdAt: -1 };
    if (sort === 'asc') sortOption = { createdAt: 1 };
    if (sort === 'desc') sortOption = { createdAt: -1 };

    const pipeline: any[] = [
      { $match: filter },
      {
        $lookup: {
          from: 'articles',
          localField: 'articles',
          foreignField: '_id',
          as: 'articles',
        },
      },
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'userData',
          as: 'comments',
        },
      },
      {
        $addFields: {
          articlesCount: { $size: '$articles' },
          commentsCount: { $size: '$comments' },
        },
      },
    ];

    if (articlesCount) {
      const num = parseInt(articlesCount as string, 10);
      if (!isNaN(num)) {
        pipeline.push({ $match: { articlesCount: num } });
      }
    }

    if (commentsCount) {
      const num = parseInt(commentsCount as string, 10);
      if (!isNaN(num)) {
        pipeline.push({ $match: { commentsCount: num } });
      }
    }

    pipeline.push({ $sort: sortOption });
    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: limitNum });

    // 🔒 исключаем пароль
    pipeline.push({
      $project: {
        password: 0,
      },
    });

    const users = await User.aggregate(pipeline);

    const totalUsers = await User.aggregate([
      ...pipeline.filter(
        (stage) =>
          !('$skip' in stage) && !('$limit' in stage) && !('$project' in stage)
      ),
      { $count: 'count' },
    ]);

    const total = totalUsers[0]?.count || 0;

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      data: { users, total },
    });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const deletedUserId = req.params.id;

    if (!userId) {
      throw errorHandler(401, 'Not authenticated');
    }

    const userExists = await User.findById(userId).select('-password').lean();

    if (
      userExists?.role !== 'admin' &&
      userExists?._id.toString() !== deletedUserId.toString()
    ) {
      throw errorHandler(
        403,
        `You are not allowed to delete the user ${userExists?.username}`
      );
    }

    const userToDelete = await User.findById(deletedUserId)
      .select('-password')
      .lean();

    if (!userToDelete) {
      throw errorHandler(404, 'User not found');
    }

    if (userToDelete.avatarPublicId) {
      await cloudinary.uploader.destroy(userToDelete.avatarPublicId);
    }

    await User.findByIdAndDelete(deletedUserId);

    res.status(200).json({
      success: true,
      message: `The user ${userExists.username} deleted successfully`,
      data: userToDelete,
    });
  } catch (err) {
    next(err);
  }
};
