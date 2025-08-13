import { Types } from 'mongoose';
import { signinSchema, signupSchema } from '../schemas/auth.schema';
import z from 'zod';
import { editorSchema } from '../schemas/editor.schema';

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

// article inputs

export type EditorValues = z.infer<typeof editorSchema>;
