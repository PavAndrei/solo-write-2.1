import type { FC } from 'react';
import type { Article } from '../types/article.types';
import { ArticleItem } from './ArticleItem';

interface ArticleListProps {
  articles: Article[];
}

export const ArticlesList: FC<ArticleListProps> = ({ articles }) => {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {articles?.map((article) => (
        <ArticleItem key={article._id} {...article} />
      ))}
    </ul>
  );
};
