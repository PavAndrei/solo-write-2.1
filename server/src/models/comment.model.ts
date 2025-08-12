import mongoose, { Document, Schema, Model } from 'mongoose';
import { IUser } from './user.model';
import { IArticle } from './article.model';

export interface IComment extends Document {
  content: string;
  articleId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  likes: mongoose.Types.ObjectId[];
  numberOfLikes?: number;
  userData?: IUser;
  articleData?: IArticle;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<IComment>(
  {
    content: { type: String, required: true, trim: true },
    articleId: { type: Schema.Types.ObjectId, ref: 'Article', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  }
);

commentSchema.virtual('numberOfLikes').get(function (this: IComment) {
  return this.likes.length;
});

commentSchema.virtual('userData', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

commentSchema.virtual('articleData', {
  ref: 'Article',
  localField: 'articleId',
  foreignField: '_id',
  justOne: true,
});

commentSchema.index({ articleId: 1, createdAt: -1 });

export const Comment: Model<IComment> = mongoose.model<IComment>(
  'Comment',
  commentSchema
);
