import { PageTitle } from '../ui/PageTitle';
import { Container } from '../layout/Container';
import { DashCommentsList } from './DashCommentsList';
import { DashCommentsFilters } from './DashCommentsFilters';

export const DashComments = () => {
  return (
    <section className="pt-10">
      <PageTitle hasSubtitle="You can read, update and delete the comments on the platform">
        Comments
      </PageTitle>

      <Container>
        <div className="flex justify-between gap-15 pb-10">
          <DashCommentsList />
          <DashCommentsFilters />
        </div>
      </Container>
    </section>
  );
};
