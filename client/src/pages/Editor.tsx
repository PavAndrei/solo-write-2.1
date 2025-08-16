import type { FC } from 'react';
import { Container } from '../components/layout/Container';
import { PageTitle } from '../components/ui/PageTitle';

export const Editor: FC = () => {
  return (
    <section className="h-full py-10">
      <Container>
        <PageTitle hasSubtitle="Do not miss the opportunity to share your views with the others">
          Write an article
        </PageTitle>
      </Container>
    </section>
  );
};
