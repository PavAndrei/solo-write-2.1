import { Types } from 'mongoose';
import { NextFunction, Response, Request } from 'express';
import { User } from '../models/user.model';
import { errorHandler } from '../middlewares/handleErrors';
import { compare } from 'bcryptjs';
import { Secret, sign } from 'jsonwebtoken';
import { SigninInput } from '../schemas/auth.schema';

export interface UserAuthResponse {
  _id: string;
  username: string;
  email: string;
  avatarUrl: string | null;
  role: 'user' | 'admin';
  verified: boolean;
  articles: Types.ObjectId[];
  commentsCount: number;
  articlesCount: number;
}

export interface AuthSuccessResponse {
  success: true;
  user: UserAuthResponse;
  message: string;
}

export const signin = async (
  req: Request<{}, {}, SigninInput>,
  res: Response<AuthSuccessResponse>,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email })
      .select('+password')
      .lean()
      .exec();

    if (!existingUser) {
      throw errorHandler(401, 'Invalid email or password');
    }

    const result = await compare(password, existingUser.password);
    if (!result) {
      throw errorHandler(401, 'Invalid email or password');
    }

    const token = sign(
      {
        userId: existingUser._id,
        email: existingUser.email,
        verified: existingUser.verified,
        role: existingUser.role,
      },
      process.env.TOKEN_SECRET as Secret,
      { expiresIn: '8h' }
    );

    const userResponse: UserAuthResponse = {
      _id: existingUser._id.toString(),
      username: existingUser.username,
      email: existingUser.email,
      role: existingUser.role,
      verified: existingUser.verified,
      articles: existingUser.articles,
      avatarUrl: existingUser.avatarUrl || null,
      commentsCount: Number(existingUser.commentsCount),
      articlesCount: Number(existingUser.articlesCount),
    };

    return res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 8 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        user: userResponse,
        message: 'Sign in successfully',
      });
  } catch (err) {
    next(err);
  }
};
