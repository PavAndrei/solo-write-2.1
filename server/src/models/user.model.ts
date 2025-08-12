import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  avatarUrl?: string;
  role: 'user' | 'admin';
  verified: boolean;
  articles: mongoose.Types.ObjectId[];
  comments?: mongoose.Types.ObjectId[];
  commentsCount?: number;
  articlesCount?: number;
  popularArticles?: mongoose.Types.ObjectId[];
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    avatarUrl: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    verified: { type: Boolean, default: false },
    articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'userData',
});

userSchema.virtual('commentsCount').get(function () {
  return this.comments?.length || 0;
});

userSchema.virtual('articlesCount').get(function () {
  return this.articles?.length || 0;
});

userSchema.virtual('popularArticles', {
  ref: 'Article',
  localField: '_id',
  foreignField: 'user',
  options: { sort: { viewsCount: -1 }, limit: 3 },
});

export const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
