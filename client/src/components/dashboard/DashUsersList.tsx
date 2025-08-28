import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { setUsersFilters } from '../../features/filters/slices/filtersSlices';
import { Pagination } from '../ui/Pagination';
import { DashUsersItem } from './DashUsersItem';

export const DashUsersList = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.users);
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

  return (
    <div className="w-2/3">
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
      <Pagination
        currentPage={startIndex / limit}
        totalPages={data ? Math.ceil(data?.total / limit) : 0}
        handleNextPage={handleNextPageClick}
        handlePreviousPage={handlePreviousPageClick}
        handlePageClick={handleCurrentPageClick}
      />
    </div>
  );
};
