import clsx from 'clsx';
import type { FC, ReactNode } from 'react';

interface MenuBarButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
  isSelected?: boolean;
}

export const MenuBarButton: FC<MenuBarButtonProps> = ({
  onClick,
  disabled,
  className,
  isSelected,
  children,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'border p-3 rounded cursor-pointer text-gray-500 transition-all duration-300 ease-in-out active:scale-95 active:text-gray-900 dark:active:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-gray-100',
        isSelected && 'text-gray-900 dark:text-gray-100',
        className
      )}
    >
      {children}
    </button>
  );
};
