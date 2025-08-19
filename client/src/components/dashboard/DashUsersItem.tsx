import type { FC } from 'react';
import type { User } from '../../features/users/types/users.types';
import { FaUser } from 'react-icons/fa';
import { formatDate } from '../../utils/formatDate';
import { RiAdminFill } from 'react-icons/ri';
import { MdVerified } from 'react-icons/md';
import { GoUnverified } from 'react-icons/go';

export const DashUsersItem: FC<User> = ({
  username,
  email,
  avatarUrl,
  createdAt,
  role,
}) => {
  const readableDate = formatDate(createdAt);

  return (
    <li className="border py-3 px-1.5 rounded-md flex gap-2">
      <div className="border rounded-full p-2 flex items-center justify-center max-h-8 max-w-8 my-auto">
        {avatarUrl ? <img src={avatarUrl} alt={username} /> : <FaUser />}
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="font-medium text-lg">
          {username} <span className="font-light text-sm">{readableDate}</span>
        </div>
        <span className="font-light text-sm text-gray-700 dark:text-gray-300">
          {email}
        </span>
      </div>
      <div className="flex flex-col ml-auto mr-0">
        <div className="flex gap-1.5 items-center min-w-20 justify-between">
          <span>Role: </span> {role === 'admin' ? <RiAdminFill /> : <FaUser />}
        </div>
        <div className="flex gap-1.5 items-center min-w-20 justify-between">
          <span>Verified: </span>
          {role === 'admin' ? <MdVerified /> : <GoUnverified />}
        </div>
      </div>
    </li>
  );
};
