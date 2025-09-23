import type { Article } from '../types/article.types';

export function updateLikes(article: Article, userId: string): Article {
  const likedBy = article.likedBy ? [...article.likedBy] : [];
  const index = likedBy.indexOf(userId);

  if (index === -1) {
    likedBy.push(userId);
  } else {
    likedBy.splice(index, 1);
  }

  return {
    ...article,
    likedBy,
    likesCount: likedBy.length,
  };
}
