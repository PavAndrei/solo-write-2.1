import { useEffect, useState } from 'react';
import {
  FaCog,
  FaComments,
  FaUserAlt,
  FaUsers,
  FaClipboardList,
} from 'react-icons/fa';
import { GrArticle } from 'react-icons/gr';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/Button';
import { ImExit } from 'react-icons/im';
import clsx from 'clsx';

const menuItems = [
  { name: 'Profile', icon: <FaUserAlt />, path: 'profile' },
  { name: 'Users', icon: <FaUsers />, path: 'users' },
  { name: 'Articles', icon: <GrArticle />, path: 'articles' },
  { name: 'Comments', icon: <FaComments />, path: 'comments' },
  { name: 'Settings', icon: <FaCog />, path: 'settings' },
];

export const Sidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={clsx('relative', 'w-0')}>
      <button
        onClick={() => setIsVisible((prev) => !prev)}
        className="border-1 absolute top-2 left-2 cursor-pointer w-10 h-4 rounded-md z-100 flex items-center bg-gray-100 dark:bg-gray-700"
      >
        <span
          className={clsx(
            'bg-gray-900 dark:bg-gray-100 w-3 h-3 rounded-full transition duration-300 ease-in-out',
            !isVisible ? 'translate-x-0.5' : 'translate-x-6'
          )}
        ></span>
      </button>

      <aside
        aria-label="admin-panel tabs switcher"
        className={clsx(
          'w-54 h-full bg-gray-300 dark:bg-gray-900 flex flex-col gap-8 pt-14 pb-10 transition duration-300 ease-in-out z-99 border-r border-gray-500',
          !isVisible && '-translate-x-full w-0'
        )}
      >
        <h3 className="text-3xl font-semibold flex gap-1.5 items-center pl-3 border-b pb-10 border-gray-500">
          Menu <FaClipboardList />
        </h3>
        <nav>
          <ul className="flex flex-col gap-2 pb-10 border-b border-gray-500">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={`/dashboard?tab=${item.path}`}
                  className={clsx(
                    'flex items-center gap-2 py-2.5 pl-3 text-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300 ease-in-out active:scale-95',
                    item.path === tab && 'bg-gray-100 dark:bg-gray-700'
                  )}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Button
          ariaLabel="sign out button"
          className="max-w-2/3 mt-auto mb-0 ml-3"
        >
          Sign Out
          <ImExit className="translate-y-0.5" />
        </Button>
      </aside>
    </div>
  );
};
