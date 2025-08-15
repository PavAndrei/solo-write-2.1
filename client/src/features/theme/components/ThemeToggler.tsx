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
      className="border py-1.5 px-3 min-h-[37px] rounded-md flex items-center justify-center cursor-pointer bg-gray-200 dark:bg-gray-700 active:scale-95 transition-all duration-200 ease-in-out hover:shadow-lg/30 shadow-gray-500"
      type="button"
      onClick={toggleThemeColor}
      aria-label="toggle theme"
    >
      {themeColor === 'light' ? <MdWbSunny /> : <FaMoon />}
    </button>
  );
};
