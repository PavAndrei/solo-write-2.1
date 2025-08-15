import type { FC, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="flex justify-center items-center gap-1.5 px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition capitalize cursor-pointer font-medium"
    >
      {children}
    </button>
  );
};
