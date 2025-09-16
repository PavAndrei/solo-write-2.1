import { useEffect } from 'react';
import { Container } from '../components/layout/Container';
import { PageTitle } from '../components/ui/PageTitle';
import { useAppDispatch, useAppSelector } from '../app/store/hooks';
import { fetchArticles } from '../features/articles/slices/asyncActions';
import { ArticlesList } from '../features/articles/components/ArticlesList';
import { Status } from '../types/api';
import { SpinnerLoading } from '../components/ui/SpinnerLoading';

export const Articles = () => {
  const dispatch = useAppDispatch();
  const { items, popularItems, total, status } = useAppSelector(
    (state) => state.articles.list
  );

  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  console.log(items);
  console.log(popularItems);
  console.log(total);

  if (status === Status.LOADING || status === Status.IDLE) {
    return (
      <div className="h-screen">
        <SpinnerLoading />
      </div>
    );
  }

  if (status === Status.ERROR) {
    return <div>Something went wrong...</div>;
  }

  return (
    <section className="h-full py-10">
      <Container>
        <PageTitle hasSubtitle="Find your favorites">
          Articles Collection
        </PageTitle>
        {items && <ArticlesList articles={items} />}
      </Container>
    </section>
  );
};
