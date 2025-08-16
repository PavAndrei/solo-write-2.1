import type { FC, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  ariaLabel: string;
}

export const Button: FC<ButtonProps> = ({ children, ariaLabel, ...props }) => {
  return (
    <button
      {...props}
      className="flex justify-center items-center gap-1.5 px-4 py-1.5 bg-gray-200 dark:bg-gray-700 border rounded-md border-gray-500 transition capitalize cursor-pointer font-medium active:scale-95 hover:shadow-lg/30 shadow-gray-500 focus-visible:shadow-lg/80 focus-visible:shadow-gray-500 focus-visible:inset-shadow-sm inset-shadow-gray-700 dark:focus-visible:inset-shadow-gray-400 dark:shadow-gray-200"
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};
