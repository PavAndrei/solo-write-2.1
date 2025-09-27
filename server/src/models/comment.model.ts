import { Schema, model, Document } from 'mongoose';

export interface IComment extends Document {
  text: string;
  likes: number;
  isLiked: Schema.Types.ObjectId[];
  articleSlug: string;
  author: {
    userId: Schema.Types.ObjectId;
    username: string;
  };
  popularity: number; // показатель популярности комментария
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<IComment>(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    isLiked: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    articleSlug: {
      type: String,
      required: true,
      index: true,
    },
    author: {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
    },
    popularity: {
      type: Number,
      default: 0,
      index: true,
    },
  },
  { timestamps: true }
);

export const Comment = model<IComment>('Comment', commentSchema);
