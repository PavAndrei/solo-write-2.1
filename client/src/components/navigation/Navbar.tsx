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
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { signOutUser } from '../../features/auth/slices/asyncActions';
import { ThemeToggler } from '../../features/theme/components/ThemeToggler';

const PAGES = [
  { name: 'Home', url: '/', icon: <FaHome /> },
  { name: 'Articles', url: '/articles', icon: <SiReadthedocs /> },
  { name: 'Editor', url: '/editor', icon: <FaEdit /> },
  { name: 'Profile', url: '/admin', icon: <FaUser /> },
];

export const Navbar: FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const logOut = async () => {
    await dispatch(signOutUser());
  };

  return (
    <nav className="flex items-center flex-grow">
      <ul className="flex gap-3 mx-auto">
        {PAGES.map((page) => (
          <li key={page.name}>
            <NavbarLink text={page.name} icon={page.icon} url={page.url} />
          </li>
        ))}
      </ul>

      <div className="flex gap-3">
        <NavbarLink text="Sign Up" icon={<FaUserPlus />} url="/signup" />
        <NavbarLink text="Sign In" icon={<FaSignInAlt />} url="/signin" />
      </div>

      <div className="flex gap-3 ml-auto mr-0">
        {user && (
          <Button
            onClick={logOut}
            className="border rounded-md py-1.5 px-4 flex items-center gap-1.5"
            ariaLabel="log out"
          >
            <span>Sign Out</span>
            <ImExit />
          </Button>
        )}
        <ThemeToggler />
      </div>
    </nav>
  );
};
