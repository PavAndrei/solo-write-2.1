import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { PageTitle } from '../../ui/PageTitle';
import { Container } from '../../layout/Container';
import { DashArticlesList } from './DashArticlesList';
import { DashArticlesFilters } from './DashArticlesFilters';
import { setArticlesFilters } from '../../../features/filters/slices/filtersSlices';
import type { AdminArticlesFilters } from '../../../features/filters/slices/filters.types';
import { useSearchParams } from 'react-router-dom';
import { ARTICLES_FILTERS_DEFAULTS } from '../../../constants/defaults';
import { parseUrlParams, toUrlParams } from '../../../utils/handleUrlParams';
import { articleSchema } from '../../../features/filters/schemas/users.schema';
import { fetchArticles } from '../../../features/articles/slices/asyncActions';

export const DashArticles = () => {
  const dispatch = useAppDispatch();
  const { articles: articlesFilters } = useAppSelector((s) => s.filters.admin);
  const [searchParams, setSearchParams] = useSearchParams();
  const isFirstRender = useRef(true);

  const defaults: Partial<AdminArticlesFilters> = ARTICLES_FILTERS_DEFAULTS;

  const updateUsersURLParams = (filters: AdminArticlesFilters) => {
    const newParams = {
      tab: 'articles',
      ...toUrlParams<AdminArticlesFilters>(filters, defaults),
    };
    setSearchParams(newParams);
  };

  const handleFiltersChange = (values: AdminArticlesFilters) => {
    dispatch(setArticlesFilters(values));
  };

  useEffect(() => {
    if (isFirstRender.current) {
      const urlFilters = parseUrlParams<AdminArticlesFilters>(
        searchParams,
        articleSchema
      );
      const hasUrlParams = Object.keys(urlFilters).length > 0;
      const hasRedux = Object.values(articlesFilters).some(
        (val) => val !== '' && val !== false && val !== 0
      );
      if (hasUrlParams) {
        dispatch(setArticlesFilters({ ...defaults, ...urlFilters }));
      } else if (hasRedux) {
        dispatch(fetchArticles({ ...articlesFilters, limit: undefined }));
        updateUsersURLParams(articlesFilters);
      } else {
        updateUsersURLParams(articlesFilters);
      }
      isFirstRender.current = false;
      return;
    }

    const timeoutId = setTimeout(() => {
      dispatch(fetchArticles({ ...articlesFilters, limit: undefined }));
      updateUsersURLParams(articlesFilters);
      window.scrollTo(0, 0);
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [JSON.stringify(articlesFilters), dispatch]);

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
            isFirstRender={isFirstRender.current}
          />
        </div>
      </Container>
    </section>
  );
};
