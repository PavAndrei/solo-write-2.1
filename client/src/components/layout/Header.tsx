import type { FC } from 'react';
import { Container } from './Container';
import { Logo } from '../ui/Logo';
import { Navbar } from '../navigation/Navbar';

export const Header: FC = () => {
  return (
    <header className="py-4 bg-gray-300 dark:bg-gray-900">
      <Container>
        <div className="flex items-center gap-5">
          <Logo />
          <Navbar />
        </div>
      </Container>
    </header>
  );
};
