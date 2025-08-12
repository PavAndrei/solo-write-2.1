import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IArticle extends Document {
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

const articleSchema = new Schema<IArticle>(
  {
    title: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true },
    categories: { type: [String], required: true, default: [] },
    content: { type: String, required: true, trim: true },
    images: { type: [String], default: [] },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    viewsCount: { type: Number, default: 0 },
    likesCount: { type: Number, default: 0 },
    likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

articleSchema.index({ title: 'text', description: 'text', content: 'text' });

export const Article: Model<IArticle> = mongoose.model<IArticle>(
  'Article',
  articleSchema
);
