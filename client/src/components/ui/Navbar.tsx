import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';

const PAGES = [
  { name: 'Home', url: '/' },
  { name: 'Articles', url: '/articles' },
  { name: 'Editor', url: '/editor' },
  { name: 'Profile', url: '/admin' },
];

export const Navbar: FC = () => {
  return (
    <nav className="flex items-center flex-grow">
      <ul className="flex gap-5 mx-auto">
        {PAGES.map((page) => (
          <li key={page.name}>
            <Link className="border rounded-md py-1.5 px-4" to={page.url}>
              {page.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex gap-5 self-end">
        <Link className="border rounded-md py-1.5 px-4" to="/signup">
          Sign Up
        </Link>
        <Link className="border rounded-md py-1.5 px-4" to="/signin">
          Sign In
        </Link>
        <Button className="border rounded-md py-1.5 px-4">Sign Out</Button>
      </div>
    </nav>
  );
};
