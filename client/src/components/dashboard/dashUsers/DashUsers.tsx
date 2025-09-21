import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import type { AdminUsersFilters } from '../../../features/filters/slices/filters.types';
import { useEffect, useRef } from 'react';
import { parseUrlParams, toUrlParams } from '../../../utils/handleUrlParams';
import { userSchema } from '../../../features/filters/schemas/users.schema';
import { setUsersFilters } from '../../../features/filters/slices/filtersSlices';
import { fetchUsers } from '../../../features/users/slices/asyncActions';
import { PageTitle } from '../../ui/PageTitle';
import { Container } from '../../layout/Container';
import { DashUsersFilters } from './DashUsersFilters';
import { USERS_FILTERS_DEFAULTS } from '../../../constants/defaults';
import { DashUsersList } from './DashUsersList';

export const DashUsers = () => {
  const dispatch = useAppDispatch();
  const { users: usersFilters } = useAppSelector((s) => s.filters.admin);
  const [searchParams, setSearchParams] = useSearchParams();
  const isFirstRender = useRef(true);

  const defaults: Partial<AdminUsersFilters> = USERS_FILTERS_DEFAULTS;

  const updateUsersURLParams = (filters: AdminUsersFilters) => {
    const newParams = {
      tab: 'users',
      ...toUrlParams<AdminUsersFilters>(filters, defaults),
    };
    setSearchParams(newParams);
  };

  const handleFiltersChange = (values: AdminUsersFilters) => {
    dispatch(setUsersFilters(values));
  };

  useEffect(() => {
    if (isFirstRender.current) {
      const urlFilters = parseUrlParams<AdminUsersFilters>(
        searchParams,
        userSchema
      );
      const hasUrlParams = Object.keys(urlFilters).length > 0;
      const hasRedux = Object.values(usersFilters).some(
        (val) => val !== '' && val !== false && val !== 0
      );
      if (hasUrlParams) {
        dispatch(setUsersFilters({ ...defaults, ...urlFilters }));
      } else if (hasRedux) {
        dispatch(fetchUsers({ ...usersFilters, limit: undefined }));
        updateUsersURLParams(usersFilters);
      } else {
        updateUsersURLParams(usersFilters);
      }
      isFirstRender.current = false;
      return;
    }

    const timeoutId = setTimeout(() => {
      dispatch(fetchUsers({ ...usersFilters, limit: undefined }));
      updateUsersURLParams(usersFilters);
      window.scrollTo(0, 0);
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [JSON.stringify(usersFilters), dispatch]);

  return (
    <section className="pt-10">
      <PageTitle hasSubtitle="Manage the Users collection on the platform Solo Write">
        Users
      </PageTitle>
      <Container>
        <div className="flex justify-between gap-15 pb-10">
          <DashUsersList />
          <DashUsersFilters
            defaultValues={usersFilters}
            onFiltersChange={handleFiltersChange}
            isFirstRender={isFirstRender.current}
          />
        </div>
      </Container>
    </section>
  );
};
