import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { setArticlesFilters } from '../../../features/filters/slices/filtersSlices';
import { Status } from '../../../types/api';
import { Pagination } from '../../ui/Pagination';
import { SpinnerLoading } from '../../ui/SpinnerLoading';
import { DashArticlesItem } from './DashArticlesItem';

export const DashArticlesList = () => {
  const dispatch = useAppDispatch();

  const { items, total, status } = useAppSelector(
    (state) => state.articles.list
  );

  const { startIndex, limit } = useAppSelector(
    (state) => state.filters.admin.articles
  );

  const handlePreviousPageClick = () => {
    if (startIndex < 1) return;
    dispatch(setArticlesFilters({ startIndex: startIndex - limit }));
  };

  const handleNextPageClick = () => {
    dispatch(setArticlesFilters({ startIndex: startIndex + limit }));
  };

  const handleCurrentPageClick = (page: number) => {
    dispatch(setArticlesFilters({ startIndex: limit * page }));
  };

  if (status === Status.LOADING) {
    return (
      <div className="w-2/3">
        <SpinnerLoading />
      </div>
    );
  }

  if (status === Status.ERROR) {
    return <div className="w-2/3">Something went wrong...</div>;
  }

  return (
    <div className="w-2/3 min-h-full flex flex-col">
      {status === Status.IDLE ? null : (
        <>
          <span className="mb-2 block font-medium text-lg">
            {total && total > 0
              ? `${total} articles were found:`
              : 'Articles not found'}
          </span>
          <ul className="flex flex-col gap-3">
            {items?.map((article) => (
              <DashArticlesItem
                key={article._id}
                {...article}
                image={article.images[0]}
              />
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
      )}
    </div>
  );
};
