interface CommentAuthor {
  userId: string;
  username: string;
  userAvatar?: string;
}

export interface Comment {
  _id: string;
  text: string;
  likes: number;
  isLiked: string[];
  articleId: string;
  author: CommentAuthor;
  popularity: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type CommentList = Comment[];

export interface CreateCommentPayload {
  text: string;
  articleId: string;
}
