import mongoose from 'mongoose';

export interface ArticleResponse {
  _id: mongoose.Types.ObjectId | unknown;
  title: string;
  description: string;
  categories: string[];
  content: string;
  images: string[];
  slug: string;
  viewsCount: number;
  likesCount: number;
  likedBy: mongoose.Types.ObjectId[];
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
