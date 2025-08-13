import { NextFunction, Response, Request } from 'express';
import { User } from '../models/user.model';
import { errorHandler } from '../middlewares/handleErrors';
import { compare, hash } from 'bcryptjs';
import { Secret, sign } from 'jsonwebtoken';
import {
  AuthSuccessResponse,
  ImageRequest,
  SigninInput,
  SignupInput,
  UserAuthResponse,
} from '../types/auth.types';

export const signIn = async (
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

export const signUp = async (
  req: ImageRequest<{}, {}, SignupInput>,
  res: Response<AuthSuccessResponse>,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;

    const avatarUrl = req.imageUrl;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    })
      .lean()
      .exec();

    if (existingUser) {
      const field = existingUser.email === email ? 'Email' : 'Username';
      throw errorHandler(409, `${field} is already taken`);
    }

    const hashedPassword = await hash(password, 12);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: 'user',
      avatarUrl,
      verified: false,
      articles: [],
    });

    const token = sign(
      {
        userId: newUser._id,
        email: newUser.email,
        verified: newUser.verified,
        role: newUser.role,
      },
      process.env.TOKEN_SECRET as Secret,
      { expiresIn: '8h' }
    );

    const userResponse: UserAuthResponse = {
      _id: newUser.id.toString(),
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      verified: newUser.verified,
      avatarUrl: newUser.avatarUrl || null,
    };

    return res
      .status(201)
      .cookie('access_token', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 8 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        user: userResponse,
        message: 'User registered successfully',
      });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (
  req: Request,
  res: Response<AuthSuccessResponse>,
  next: NextFunction
) => {
  try {
    if (!req.userId) {
      return next(errorHandler(401, 'Not authenticated'));
    }

    const user = await User.findById(req.userId)
      .select('-password')
      .lean()
      .exec();

    if (!user) {
      throw errorHandler(404, 'User not found');
    }

    const userResponse: UserAuthResponse = {
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
      verified: user.verified,
      articles: user.articles || [],
      avatarUrl: user.avatarUrl || null,
      commentsCount: Number(user.commentsCount) || 0,
      articlesCount: Number(user.articlesCount) || 0,
    };

    return res.status(200).json({
      success: true,
      user: userResponse,
      message: 'User data retrieved successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const signOut = (req: Request, res: Response) => {
  try {
    res
      .clearCookie('access_token')
      .status(200)
      .json({ success: true, message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Logout failed' });
  }
};
