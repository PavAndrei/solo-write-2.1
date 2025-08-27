import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { CustomInput } from '../ui/CustomInput';
import { FaUser } from 'react-icons/fa';
import { MdEmail, MdFilterAltOff } from 'react-icons/md';
import { CustomCheckbox } from '../ui/CustomCheckbox';
import { CustomRadio } from '../ui/CustomRadio';
import { Button } from '../ui/Button';
import { setUsersFilters } from '../../features/filters/slices/filtersSlices';
import type { AdminUsersFilters } from '../../features/filters/slices/filters.types';
import { useEffect, useRef } from 'react';
import { fetchUsers } from '../../features/users/slices/asyncActions';
import { useSearchParams } from 'react-router-dom';

export const DashUsersFilters = () => {
  const dispatch = useAppDispatch();
  const { users: usersFilters } = useAppSelector(
    (state) => state.filters.admin
  );

  const isFirstRender = useRef<boolean>(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const { register, reset, watch, control } = useForm<AdminUsersFilters>({
    defaultValues: usersFilters,
  });

  const handleReset = () => {
    reset({
      username: '',
      email: '',
      hasAvatar: false,
      verified: false,
      role: '',
      sort: 'desc',
    });
    dispatch(
      setUsersFilters({
        username: '',
        email: '',
        hasAvatar: false,
        verified: false,
        role: '',
        sort: 'desc',
      })
    );
    setSearchParams({ tab: 'users' });
  };

  const values = watch();

  // Функиця, которая записывает параметры в url-строку.
  const updateUsersURLParams = () => {
    const newParams = {
      tab: 'users',
      role: usersFilters.role,
      verified: usersFilters.verified.toString(),
      username: usersFilters.username,
      email: usersFilters.email,
      sort: usersFilters.sort,
      // startIndex: 0,
      // limit: 12,
      hasAvatar: usersFilters.hasAvatar.toString(),
    };

    const filteredParams = Object.entries(newParams).filter((arr) => {
      const [key, value] = arr;
      if (key === 'role' || key === 'username' || key === 'email') {
        if (!value) return;
      }
      if (key === 'verified' || key === 'hasAvatar') {
        if (value === 'false') return;
      }

      if (key === 'sort' && value === 'desc') return;
      return arr;
    });

    setSearchParams(Object.fromEntries(filteredParams));
  };

  // Функция, берущая параметры из url-строки.
  const getUsersAllURLParams = () => {
    const allParams = Object.fromEntries(searchParams.entries());

    const result = Object.entries(allParams).filter((arr) => {
      const [key] = arr;
      if (key === 'tab') return;

      return arr;
    });

    return Object.fromEntries(result);
  };

  // Эффект, обновляющий фильтры redux, при каждом изменении в форме.
  useEffect(() => {
    dispatch(setUsersFilters(values));
  }, [JSON.stringify(values)]);

  // Эффект, запрашивающий новых users, с учетом примененных фильтров из redux.
  useEffect(() => {
    if (isFirstRender.current) {
      const urlFilters = getUsersAllURLParams();
      const hasUrlParams = Object.keys(urlFilters).length > 0;
      const hasRedux = Object.values(usersFilters).some(
        (val) => val !== '' && val !== false
      );

      if (hasUrlParams) {
        // 1) URL побеждает
        console.log('URL побеждает');
        reset(urlFilters);
        dispatch(setUsersFilters(urlFilters));
      } else if (hasRedux) {
        // 2) URL пустой, но в Redux есть старые фильтры
        console.log('URL пустой, но в Redux есть старые фильтры');
        reset(usersFilters);
        dispatch(fetchUsers(usersFilters));
        updateUsersURLParams();
      } else {
        // 3) ни там, ни там — ставим URL по умолчанию
        console.log('ни там, ни там — ставим URL по умолчанию');
        updateUsersURLParams();
      }

      isFirstRender.current = false;
      return;
    }

    // при последующих изменениях

    console.log('при последующих изменениях');
    dispatch(fetchUsers(usersFilters));
    updateUsersURLParams();
  }, [JSON.stringify(usersFilters)]);

  return (
    <form className="flex flex-col gap-3 grow">
      <CustomInput
        label="Search by username"
        placeholder="Enter username"
        register={register('username')}
        name="username"
        icon={<FaUser />}
      />
      <CustomInput
        label="Search by email"
        placeholder="Enter email"
        register={register('email')}
        name="email"
        icon={<MdEmail />}
      />

      <span className="h-px bg-gray-500"></span>

      <Controller
        name="hasAvatar"
        control={control}
        render={({ field }) => (
          <CustomCheckbox
            name={field.name}
            checked={field.value}
            onChange={field.onChange}
            label="With avatar"
          />
        )}
      />

      <Controller
        name="verified"
        control={control}
        render={({ field }) => (
          <CustomCheckbox
            name={field.name}
            checked={field.value}
            onChange={field.onChange}
            label="Verified Users"
          />
        )}
      />

      <span className="h-px bg-gray-500"></span>

      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <CustomRadio
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            buttons={[
              { value: 'admin', label: 'Admins only' },
              { value: 'user', label: 'Users only' },
              { value: '', label: 'Show both' },
            ]}
          />
        )}
      />

      <span className="h-px bg-gray-500"></span>

      <Controller
        name="sort"
        control={control}
        render={({ field }) => (
          <CustomRadio
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            buttons={[
              { value: 'asc', label: 'Oldest first' },
              { value: 'desc', label: 'Newest first' },
            ]}
          />
        )}
      />

      <Button ariaLabel="reset the filters" onClick={handleReset} type="button">
        <MdFilterAltOff /> Clear The Filters
      </Button>
    </form>
  );
};
