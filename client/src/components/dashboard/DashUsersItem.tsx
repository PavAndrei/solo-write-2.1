import type { FC } from 'react';
import type { User } from '../../features/users/types/users.types';
import { FaUser, FaUserEdit } from 'react-icons/fa';
import { formatDate } from '../../utils/formatDate';
import { RiAdminFill } from 'react-icons/ri';
import { MdVerified, MdDeleteForever } from 'react-icons/md';
import { GoUnverified } from 'react-icons/go';
import { Button } from '../ui/Button';
import { useAppDispatch } from '../../app/store/hooks';
import { deleteUser } from '../../features/users/slices/asyncActions';

export const DashUsersItem: FC<User> = ({
  _id,
  username,
  email,
  avatarUrl,
  createdAt,
  role,
}) => {
  const readableDate = formatDate(createdAt);
  const dispatch = useAppDispatch();

  const handleDeleUserById = (id: string) => {
    const res = confirm('Are you sure to delete the user?');

    if (res) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <li className="border py-3 px-1.5 rounded-md flex gap-2">
      <div className="w-full flex flex-col gap-2">
        <div className="flex justify-between items-center gap-2">
          <div className="rounded-full flex items-center justify-center max-h-8 max-w-8 my-auto">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                className="w-full h-full rounded-full border"
                alt={username}
              />
            ) : (
              <FaUser />
            )}
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="font-medium text-lg">
              {username}{' '}
              <span className="font-light text-sm">{readableDate}</span>
            </div>
            <span className="font-light text-sm text-gray-700 dark:text-gray-300">
              {email}
            </span>
          </div>
          <div className="flex flex-col ml-auto mr-0">
            <div className="flex gap-1.5 items-center min-w-20 justify-between">
              <span>Role: </span>{' '}
              {role === 'admin' ? <RiAdminFill /> : <FaUser />}
            </div>
            <div className="flex gap-1.5 items-center min-w-20 justify-between">
              <span>Verified: </span>
              {role === 'admin' ? <MdVerified /> : <GoUnverified />}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <Button type="button" ariaLabel="edit this user" size="sm">
            <span>Edit</span>
            <FaUserEdit />
          </Button>
          <Button
            type="button"
            ariaLabel="delete this user"
            size="sm"
            onClick={() => handleDeleUserById(_id)}
          >
            <span>Delete</span>
            <MdDeleteForever className="text-red-600" />
          </Button>
        </div>
      </div>
    </li>
  );
};
