import type { LikeableEntity } from '../../../types/api';

interface CommentAuthor {
  userId: string;
  username: string;
  userAvatar?: string;
}

export interface Comment extends LikeableEntity {
  _id: string;
  text: string;
  articleId: string;
  author: CommentAuthor;
  popularity: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface DeletedCommentData {
  deletedCommentId: string;
}

export type CommentList = Comment[];

export interface CreateCommentPayload {
  text: string;
  articleId: string;
}

export interface CommentLikeResponse {
  likedEntityId: string;
  userId: string;
  likesCount: number;
  liked: boolean;
}

export interface FetchAllCommentsResponse {
  total: number;
  count: number;
  comments: CommentList;
}
