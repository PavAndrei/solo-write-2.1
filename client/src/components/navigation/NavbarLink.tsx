import type { FC, ReactNode } from 'react';
import clsx from 'clsx';

import { Link } from 'react-router-dom';

interface NavbarLink {
  text: string;
  url: string;
  icon?: ReactNode;
  className?: string;
}

export const NavbarLink: FC<NavbarLink> = ({ text, url, icon, className }) => {
  return (
    <Link
      className={clsx(
        'border rounded-md py-1.5 px-4 flex items-center gap-1.5 font-medium',
        className
      )}
      to={url}
    >
      <span>{text}</span>
      {icon}
    </Link>
  );
};
