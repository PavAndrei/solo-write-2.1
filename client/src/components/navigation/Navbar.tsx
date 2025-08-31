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
  { name: 'Home', url: '/', icon: <FaHome />, protected: false },
  {
    name: 'Articles',
    url: '/articles',
    icon: <SiReadthedocs />,
    protected: false,
  },
  { name: 'Editor', url: '/editor', icon: <FaEdit />, protected: true },
  {
    name: 'Profile',
    url: '/dashboard?tab=profile',
    icon: <FaUser />,
    protected: true,
  },
];

export const Navbar: FC = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthChecked } = useAppSelector((state) => state.auth);

  const logOut = async () => {
    await dispatch(signOutUser());
  };

  return (
    <nav className="flex items-center flex-grow">
      <ul className="flex gap-3 ml-20 mr-auto">
        {PAGES.map((page) => {
          if (page.protected && (!isAuthChecked || !user)) return;

          return (
            <li key={page.name}>
              <NavbarLink text={page.name} icon={page.icon} url={page.url} />
            </li>
          );
        })}
      </ul>

      <div className="flex gap-3">
        {isAuthChecked &&
          (user ? (
            <Button
              onClick={logOut}
              className="border rounded-md py-1.5 px-4 flex items-center gap-1.5"
              ariaLabel="log out"
            >
              <span>Sign Out</span>
              <ImExit />
            </Button>
          ) : (
            <>
              <NavbarLink text="Sign Up" icon={<FaUserPlus />} url="/signup" />
              <NavbarLink text="Sign In" icon={<FaSignInAlt />} url="/signin" />
            </>
          ))}

        <ThemeToggler />
      </div>
    </nav>
  );
};
