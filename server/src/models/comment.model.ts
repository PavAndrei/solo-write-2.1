import { Schema, model, Document } from 'mongoose';

export interface IComment extends Document {
  text: string;
  likesCount: number;
  likedBy: Schema.Types.ObjectId[];
  articleId: Schema.Types.ObjectId;
  author: {
    userId: Schema.Types.ObjectId;
    username: string;
    userAvatar?: string;
  };
  popularity: number;
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
    likesCount: {
      type: Number,
      default: 0,
    },
    likedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    articleId: {
      type: Schema.Types.ObjectId,
      ref: 'Article',
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
      userAvatar: {
        type: String,
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
