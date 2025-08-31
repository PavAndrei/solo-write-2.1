import type { FC } from 'react';
import type { User } from '../../features/users/types/users.types';
import { FaUser, FaUserEdit } from 'react-icons/fa';
import { formatDate } from '../../utils/formatDate';
import { RiAdminFill } from 'react-icons/ri';
import { MdVerified, MdDeleteForever } from 'react-icons/md';
import { GoUnverified } from 'react-icons/go';
import { Button } from '../ui/Button';
import { useAppDispatch } from '../../app/store/hooks';
import {
  alertModal,
  confirmModal,
} from '../../features/modal/slices/modalSlice';
import { deleteUser } from '../../features/users/slices/asyncActions';

export const DashUsersItem: FC<User> = ({
  _id,
  username,
  email,
  avatarUrl,
  createdAt,
  role,
  verified,
}) => {
  const readableDate = formatDate(createdAt);
  const dispatch = useAppDispatch();

  const handleEditUserById = async () => {
    const res = await dispatch(alertModal('Edit'));
    console.log(res);
  };

  const handleDeleteUserById = async (id: string) => {
    const confirm = await dispatch(
      confirmModal(`Delete the user ${username}?`)
    );

    let res;
    if (confirm) {
      res = await dispatch(deleteUser(id));
    }
    console.log(res);

    if (res?.payload?.success) {
      console.log('success');
      await dispatch(alertModal(`The user ${username} has been deleted`));
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
              {verified ? <MdVerified /> : <GoUnverified />}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            ariaLabel="edit this user"
            size="sm"
            onClick={() => handleEditUserById()}
          >
            <span>Edit</span>
            <FaUserEdit />
          </Button>
          <Button
            type="button"
            ariaLabel="delete this user"
            size="sm"
            onClick={() => handleDeleteUserById(_id)}
          >
            <span>Delete</span>
            <MdDeleteForever className="text-red-600" />
          </Button>
        </div>
      </div>
    </li>
  );
};
