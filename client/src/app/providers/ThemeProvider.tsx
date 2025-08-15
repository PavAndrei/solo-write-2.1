import type { FC, ReactNode } from 'react';
import { useAppSelector } from '../store/hooks';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const { themeColor } = useAppSelector((state) => state.theme);

  return (
    <div className={themeColor}>
      <div className="text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800">
        {children}
      </div>
    </div>
  );
};
