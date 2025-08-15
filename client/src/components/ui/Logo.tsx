import type { FC } from 'react';
import { Link } from 'react-router-dom';

export const Logo: FC = () => {
  return (
    <Link to="/">
      <div className="flex">
        <div className="rounded-full py-0.5 px-2 bg-gradient-to-r from-gray-800 to-gray-300">
          <span className="text-gray-100 text-xl md:text-2xl font-semibold">
            Solo
          </span>
        </div>
        <div className="rounded-full py-0.5 px-2 bg-gradient-to-l from-gray-300 to-gray-100 ml-[-8px]">
          <span className="text-gray-900 text-xl md:text-2xl font-semibold">
            Write
          </span>
        </div>
      </div>
    </Link>
  );
};
