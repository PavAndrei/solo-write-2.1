import type { FC } from 'react';
import { Container } from './Container';
import { Logo } from '../ui/Logo';
import { Navbar } from '../ui/Navbar';

export const Header: FC = () => {
  return (
    <header className="py-4 bg-gray-300">
      <Container>
        <div className="flex items-center gap-25">
          <Logo />
          <Navbar />
        </div>
      </Container>
    </header>
  );
};
