import type { FC } from 'react';
import type { Article } from '../types/article.types';
import { ArticleItem } from './ArticleItem';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { setPublicArticlesFilters } from '../../filters/slices/filtersSlices';
import { Pagination } from '../../../components/ui/Pagination';

interface ArticleListProps {
  articles: Article[];
}

export const ArticlesList: FC<ArticleListProps> = ({ articles }) => {
  const dispatch = useAppDispatch();

  const { total } = useAppSelector((state) => state.articles.list);

  const { articles: articlesFilters } = useAppSelector(
    (state) => state.filters.public
  );

  const { startIndex, limit } = articlesFilters;

  const handlePreviousPageClick = () => {
    if (startIndex < 1) return;
    dispatch(setPublicArticlesFilters({ startIndex: startIndex - limit }));
  };

  const handleNextPageClick = () => {
    dispatch(setPublicArticlesFilters({ startIndex: startIndex + limit }));
  };

  const handleCurrentPageClick = (page: number) => {
    dispatch(setPublicArticlesFilters({ startIndex: limit * page }));
  };

  return (
    <>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {articles &&
          articles.length > 0 &&
          articles.map((article) => (
            <ArticleItem key={article._id} {...article} />
          ))}
      </ul>
      {total && total > limit && (
        <Pagination
          currentPage={startIndex / limit}
          totalPages={Math.ceil(total / limit)}
          handleNextPage={handleNextPageClick}
          handlePreviousPage={handlePreviousPageClick}
          handlePageClick={handleCurrentPageClick}
        />
      )}
    </>
  );
};
