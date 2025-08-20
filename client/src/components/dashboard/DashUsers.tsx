import { PageTitle } from '../ui/PageTitle';
import { Container } from '../layout/Container';
import { DashUsersList } from './DashUsersList';
import { DashUsersFilters } from './DashUsersFilters';

export const DashUsers = () => {
  return (
    <section className="pt-10">
      <PageTitle hasSubtitle="Manage the Users collection on the platofrorm Solo Write">
        Users
      </PageTitle>
      <Container>
        <div className="flex justify-between gap-15 pb-10">
          <DashUsersList />
          <DashUsersFilters />
        </div>
      </Container>
    </section>
  );
};
