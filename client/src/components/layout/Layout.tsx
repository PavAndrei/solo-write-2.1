import type { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return <div className="flex flex-col min-h-screen h-full">{children}</div>;
};
