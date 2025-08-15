import type { FC } from 'react';
import { FaCopyright } from 'react-icons/fa';
import { getCurrentYear } from '../../utils/getCurrentYear';

export const Footer: FC = () => {
  return (
    <footer className="bg-gray-300 border-t pt-10 dark:bg-gray-900 border-gray-500">
      <div className="p-3 w-full border-t border-gray-500 flex items-center justify-center gap-1.5 opacity-50 font-light">
        <span>Copyright</span>
        <FaCopyright />
        <span>{getCurrentYear()} All rights reserved</span>
      </div>
    </footer>
  );
};
