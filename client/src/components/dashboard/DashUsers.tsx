import { useEffect, useState } from 'react';
import { PageTitle } from '../ui/PageTitle';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { fetchUsers } from '../../features/users/slices/asyncActions';
import { DashUsersItem } from './DashUsersItem';
import { Container } from '../layout/Container';
import type { FetchUsersRequestParams } from '../../features/users/types/users.types';

const initialFilterState: FetchUsersRequestParams = {
  role: 'user',
  verified: false,
  username: '',
  email: '',
  sort: 'desc',
  startIndex: 0,
  limit: 12,
  hasAvatar: false,
};

export const DashUsers = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.users);

  const [filters, setFilters] = useState(initialFilterState);

  const handleChange = (e) => {
    const name = e.target.name;

    let value;
    if (e.target.type === 'checkbox') {
      value = e.target.checked;
    } else {
      value = e.target.value;
    }

    const newFilters = { ...filters };
    newFilters[name] = value;

    setFilters(newFilters);
  };

  useEffect(() => {
    dispatch(fetchUsers(filters));
  }, [filters]);

  return (
    <section className="pt-10">
      <PageTitle hasSubtitle="Manage the Users collection on the platofrorm Solo Write">
        Users
      </PageTitle>
      <Container>
        <div className="flex justify-between gap-5 pb-10">
          <ul className="flex flex-col gap-3 w-2/3">
            {data?.users.map((user) => (
              <DashUsersItem key={user._id} {...user} />
            ))}
          </ul>
          <div className="flex flex-col gap-5">
            <input
              name="email"
              value={filters.email}
              onChange={(e) => handleChange(e)}
              type="text"
              placeholder="Search by email"
              className="p-1.5 border rounded-md min-w-[360px]"
            />
            <input
              name="username"
              value={filters.username}
              onChange={(e) => handleChange(e)}
              type="text"
              placeholder="Search by username"
              className="p-1.5 border rounded-md min-w-[360px]"
            />
            <label>
              <input
                name="hasAvatar"
                type="checkbox"
                checked={filters.hasAvatar}
                onChange={(e) => handleChange(e)}
              />
              <span>with photo</span>
            </label>
            <label>
              <input
                name="verified"
                type="checkbox"
                checked={filters.verified}
                onChange={(e) => handleChange(e)}
              />
              <span>verified users</span>
            </label>

            <div>
              <label>
                <input
                  name="sort"
                  type="radio"
                  value="asc"
                  onChange={(e) => handleChange(e)}
                />
                <span>oldest first</span>
              </label>
              <label>
                <input
                  name="sort"
                  type="radio"
                  value="desc"
                  onChange={(e) => handleChange(e)}
                />
                <span>newest first</span>
              </label>
            </div>

            <div className="flex flex-col">
              <label>
                <input
                  name="role"
                  type="radio"
                  value="admin"
                  onChange={(e) => handleChange(e)}
                />
                <span>admins only</span>
              </label>
              <label>
                <input
                  name="role"
                  type="radio"
                  value="user"
                  onChange={(e) => handleChange(e)}
                />
                <span>users only</span>
              </label>
              <label>
                <input
                  name="role"
                  type="radio"
                  value=""
                  onChange={(e) => handleChange(e)}
                />
                <span>show both</span>
              </label>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
