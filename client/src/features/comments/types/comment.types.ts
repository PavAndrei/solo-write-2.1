interface CommentAuthor {
  userId: string;
  username: string;
}

export interface Comment {
  _id: string;
  text: string;
  likes: number;
  isLiked: string[];
  articleSlug: string;
  author: CommentAuthor;
  popularity: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CreateCommentPayload {
  text: string;
  articleSlug: string;
}
