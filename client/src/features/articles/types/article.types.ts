export interface Article {
  categories: string[];
  content: string;
  createdAt: string;
  description: string;
  images: string[];
  likedBy?: string[];
  likesCount: number;
  slug: string;
  title: string;
  updatedAt: string;
  user: string;
  viewsCount: number;
  _v: number;
  _id: string;
}
