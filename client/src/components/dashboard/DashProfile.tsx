import type { FC } from 'react';
import { PageTitle } from '../ui/PageTitle';

export const DashProfile: FC = () => {
  return (
    <section className="pt-10">
      <PageTitle hasSubtitle="You can find and update any information about you">
        Profile
      </PageTitle>
    </section>
  );
};
