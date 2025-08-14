import type { RequiredExcept } from '../../../types/common';
import type { AuthFormData } from '../validation/authSchemas';

export interface AuthUser {
  _id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  verified: boolean;
  articles: string[];
  avatarUrl: string | null;
  commentsCount: number | null;
  articlesCount: number | null;
}

export type SignInFormData = Pick<AuthFormData, 'email' | 'password'>;
export type SignUpFormData = RequiredExcept<AuthFormData, 'file'> & FormData;
