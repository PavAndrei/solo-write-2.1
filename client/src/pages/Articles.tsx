import { useEffect } from 'react';
import { Container } from '../components/layout/Container';
import { PageTitle } from '../components/ui/PageTitle';
import { useAppDispatch, useAppSelector } from '../app/store/hooks';
import { fetchArticles } from '../features/articles/slices/asyncActions';
import { ArticlesList } from '../features/articles/components/ArticlesList';
import { Status } from '../types/api';
import { SpinnerLoading } from '../components/ui/SpinnerLoading';
import { Pagination } from '../components/ui/Pagination';
import { setPublicArticlesFilters } from '../features/filters/slices/filtersSlices';

export const Articles = () => {
  const dispatch = useAppDispatch();
  const { items, total, status } = useAppSelector(
    (state) => state.articles.list
  );

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

  useEffect(() => {
    dispatch(fetchArticles(articlesFilters));
  }, [dispatch, JSON.stringify(articlesFilters)]);

  if (status === Status.LOADING || status === Status.IDLE) {
    return (
      <div className="h-screen">
        <SpinnerLoading />
      </div>
    );
  }

  if (status === Status.ERROR) {
    return <div>Something went wrong...</div>;
  }

  return (
    <section className="h-full py-10">
      <Container>
        <PageTitle hasSubtitle="Find your favorites">
          Articles Collection
        </PageTitle>
        {items && <ArticlesList articles={items} />}
        {total && total > limit && (
          <Pagination
            currentPage={startIndex / limit}
            totalPages={Math.ceil(total / limit)}
            handleNextPage={handleNextPageClick}
            handlePreviousPage={handlePreviousPageClick}
            handlePageClick={handleCurrentPageClick}
          />
        )}
      </Container>
    </section>
  );
};
