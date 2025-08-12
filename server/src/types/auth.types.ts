import { Request } from 'express';
import { Types } from 'mongoose';
import { signinSchema, signupSchema } from '../schemas/auth.schema';
import z from 'zod';

// images middleware request

export interface ImageRequest<P = {}, ResBody = {}, ReqBody = {}>
  extends Request<P, ResBody, ReqBody> {
  file?: Express.Multer.File;
  imageUrl?: string;
}

// auth inputs

export type SignupInput = z.infer<typeof signupSchema>;
export type SigninInput = z.infer<typeof signinSchema> & { imageUrl?: string };

// auth responses

export interface UserAuthResponse {
  _id: string;
  username: string;
  email: string;
  avatarUrl: string | null;
  role: 'user' | 'admin';
  verified: boolean;
  articles?: Types.ObjectId[];
  commentsCount?: number;
  articlesCount?: number;
}

export interface AuthSuccessResponse {
  success: true;
  user: UserAuthResponse;
  message: string;
}
