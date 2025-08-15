import type { FC, ReactNode } from 'react';
import clsx from 'clsx';

import { Link, useLocation } from 'react-router-dom';

interface NavbarLink {
  text: string;
  url: string;
  icon?: ReactNode;
  disabled?: boolean;
  className?: string;
}

export const NavbarLink: FC<NavbarLink> = ({
  text,
  url,
  icon,
  disabled = false,
  className,
}) => {
  const { pathname } = useLocation();

  return (
    <Link
      className={clsx(
        'border border-gray-500 rounded-md py-1.5 px-4 flex items-center gap-1.5 font-medium bg-gray-200 dark:bg-gray-700 active:scale-95 transition-all duration-300 ease-in-out hover:shadow-lg/30 shadow-gray-500',
        disabled && 'opacity-50',
        pathname === url &&
          'inset-shadow-sm inset-shadow-gray-700 dark:inset-shadow-gray-100',
        className
      )}
      to={url}
    >
      <span>{text}</span>
      {icon}
    </Link>
  );
};
