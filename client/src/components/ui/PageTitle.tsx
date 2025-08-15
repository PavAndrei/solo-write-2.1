import type { FC, ReactNode } from 'react';

interface PageTitleProps {
  children: ReactNode;
}

export const PageTitle: FC<PageTitleProps> = ({ children }) => {
  return (
    <h1 className="text-3xl font-bold mb-4 text-center capitalize pb-10">
      {children}
    </h1>
  );
};
