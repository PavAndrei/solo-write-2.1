import type { FC, ReactNode } from 'react';

interface PageTitleProps {
  children: ReactNode;
  hasSubtitle: string;
}

export const PageTitle: FC<PageTitleProps> = ({ children, hasSubtitle }) => {
  return (
    <div className="mb-10">
      <h1 className="text-4xl font-bold text-center capitalize mb-5">
        {children}
      </h1>
      {hasSubtitle && (
        <p className="text-center italic text-shadow-xs font-medium">
          {hasSubtitle}
        </p>
      )}
    </div>
  );
};
