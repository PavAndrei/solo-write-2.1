import type { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { toggleTheme } from '../slices/themeSlice';
import { FaMoon } from 'react-icons/fa';
import { MdWbSunny } from 'react-icons/md';

export const ThemeToggler: FC = () => {
  const dispatch = useAppDispatch();
  const { themeColor } = useAppSelector((state) => state.theme);

  const toggleThemeColor = () => {
    dispatch(toggleTheme());
  };

  return (
    <button
      className="border border-gray-500 py-1.5 px-3 min-h-[37px] rounded-md flex items-center justify-center cursor-pointer bg-gray-200 dark:bg-gray-700 active:scale-95 transition-all duration-200 ease-in-out hover:shadow-lg/60  shadow-gray-500 focus-visible:shadow-lg/80 focus-visible:shadow-gray-500 focus-visible:inset-shadow-sm inset-shadow-gray-700 dark:focus-visible:inset-shadow-gray-400 dark:shadow-gray-200 dark:focus-visible:outline-gray-400"
      type="button"
      onClick={toggleThemeColor}
      aria-label="toggle theme"
    >
      {themeColor === 'light' ? <MdWbSunny /> : <FaMoon />}
    </button>
  );
};
