import type { FC } from 'react';
import { FaSpinner } from 'react-icons/fa';

export const SpinnerLoading: FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <FaSpinner className="animate-spin text-4xl text-blue-500" />
    </div>
  );
};
