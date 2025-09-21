import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { PageTitle } from '../../ui/PageTitle';
import { fetchArticles } from '../../../features/articles/slices/asyncActions';
import { Container } from '../../layout/Container';
import { DashArticlesList } from './DashArticlesList';
import { DashArticlesFilters } from './DashArticlesFilters';
import { setArticlesFilters } from '../../../features/filters/slices/filtersSlices';
import type { AdminArticlesFilters } from '../../../features/filters/slices/filters.types';

export const DashArticles = () => {
  const dispatch = useAppDispatch();
  const { articles: articlesFilters } = useAppSelector((s) => s.filters.admin);

  useEffect(() => {
    dispatch(fetchArticles(articlesFilters));
  }, [JSON.stringify(articlesFilters), dispatch]);

  const handleFiltersChange = (values: AdminArticlesFilters) => {
    dispatch(setArticlesFilters(values));
  };

  return (
    <section className="pt-10">
      <PageTitle hasSubtitle="You can read, update and delete the articles on the platform">
        Articles
      </PageTitle>

      <Container>
        <div className="flex justify-between gap-15 pb-10">
          <DashArticlesList />
          <DashArticlesFilters
            defaultValues={articlesFilters}
            onFiltersChange={handleFiltersChange}
          />
        </div>
      </Container>
    </section>
  );
};
