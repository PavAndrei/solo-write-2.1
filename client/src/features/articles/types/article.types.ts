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
  author: string;
  viewsCount: number;
  _v: number;
  _id: string;
}

export interface AllArticlesResponse {
  articles: Article[];
  popularArticle: Article[];
  totalArticles: number;
}
