import type { FC } from 'react';
import { Button } from '../ui/Button';
import {
  FaHome,
  FaEdit,
  FaUser,
  FaUserPlus,
  FaSignInAlt,
} from 'react-icons/fa';
import { SiReadthedocs } from 'react-icons/si';
import { ImExit } from 'react-icons/im';
import { NavbarLink } from './NavbarLink';
import { useAppSelector } from '../../app/store/hooks';

const PAGES = [
  { name: 'Home', url: '/', icon: <FaHome /> },
  { name: 'Articles', url: '/articles', icon: <SiReadthedocs /> },
  { name: 'Editor', url: '/editor', icon: <FaEdit /> },
  { name: 'Profile', url: '/admin', icon: <FaUser /> },
];

export const Navbar: FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <nav className="flex items-center flex-grow">
      <ul className="flex gap-5 mx-auto">
        {PAGES.map((page) => (
          <li key={page.name}>
            <NavbarLink text={page.name} icon={page.icon} url={page.url} />
          </li>
        ))}
      </ul>

      <div className="flex gap-5 self-end">
        <NavbarLink text="Sign Up" icon={<FaUserPlus />} url="/signup" />
        <NavbarLink text="Sign In" icon={<FaSignInAlt />} url="/signin" />

        {user && (
          <Button className="border rounded-md py-1.5 px-4 flex items-center gap-1.5">
            <span>Sign Out</span>
            <ImExit />
          </Button>
        )}
      </div>
    </nav>
  );
};
