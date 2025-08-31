import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { setUsersFilters } from '../../features/filters/slices/filtersSlices';
import { Status } from '../../types/api';
import { Pagination } from '../ui/Pagination';
import { SpinnerLoading } from '../ui/SpinnerLoading';
import { DashUsersItem } from './DashUsersItem';

export const DashUsersList = () => {
  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector((state) => state.users);
  const { startIndex, limit } = useAppSelector(
    (state) => state.filters.admin.users
  );

  const handlePreviousPageClick = () => {
    if (startIndex < 1) return;
    dispatch(setUsersFilters({ startIndex: startIndex - limit }));
  };

  const handleNextPageClick = () => {
    dispatch(setUsersFilters({ startIndex: startIndex + limit }));
  };

  const handleCurrentPageClick = (page: number) => {
    console.log(page);
    dispatch(setUsersFilters({ startIndex: limit * page }));
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
      <span className="mb-2 block font-medium text-lg">
        {data && data?.total > 0
          ? `${data?.total} users were found:`
          : 'Users not found'}
      </span>
      <ul className="flex flex-col gap-3">
        {data?.users.map((user) => (
          <DashUsersItem key={user._id} {...user} />
        ))}
      </ul>
      {data && data.total > limit && (
        <Pagination
          currentPage={startIndex / limit}
          totalPages={Math.ceil(data?.total / limit)}
          handleNextPage={handleNextPageClick}
          handlePreviousPage={handlePreviousPageClick}
          handlePageClick={handleCurrentPageClick}
        />
      )}
    </div>
  );
};
