import clsx from 'clsx';
import type { FC, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  ariaLabel: string;
  className?: string;
  size?: 'md' | 'sm';
}

export const Button: FC<ButtonProps> = ({
  children,
  ariaLabel,
  disabled,
  className,
  size = 'md',
  ...props
}) => {
  const baseClassNames =
    'flex justify-center items-center gap-1.5 bg-gray-200 dark:bg-gray-700 border rounded-md border-gray-500 capitalize cursor-pointer shadow-gray-500 dark:shadow-gray-200 inset-shadow-gray-700 transition';

  const hoversAndActives = 'hover:shadow-lg/30 active:scale-95';
  const focuses =
    'focus-visible:shadow-lg/80 focus-visible:shadow-gray-500 focus-visible:inset-shadow-sm dark:focus-visible:inset-shadow-gray-400';

  return (
    <button
      {...props}
      disabled={disabled}
      className={clsx(
        baseClassNames,
        !disabled ? hoversAndActives : 'opacity-45',
        focuses,
        size === 'md' && 'px-4 py-1.5 font-medium',
        size === 'sm' && 'px-2 py-1 font-light',
        className
      )}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};
