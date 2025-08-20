import { useAppSelector } from '../../app/store/hooks';
import { DashUsersItem } from './DashUsersItem';

export const DashUsersList = () => {
  const { data } = useAppSelector((state) => state.users);

  return (
    <div className="w-2/3">
      <span className="mb-2 block font-medium text-lg">
        {data?.total} users were found:
      </span>
      <ul className="flex flex-col gap-3">
        {data?.users.map((user) => (
          <DashUsersItem key={user._id} {...user} />
        ))}
      </ul>
    </div>
  );
};
