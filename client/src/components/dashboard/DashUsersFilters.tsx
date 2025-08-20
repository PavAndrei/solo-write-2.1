import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { CustomInput } from '../ui/CustomInput';
import { FaUser } from 'react-icons/fa';
import { MdEmail, MdFilterAltOff } from 'react-icons/md';
import { CustomCheckbox } from '../ui/CustomCheckbox';
import { CustomRadio } from '../ui/CustomRadio';
import { Button } from '../ui/Button';
import { useEffect, useRef, useCallback, useState } from 'react';
import { fetchUsers } from '../../features/users/slices/asyncActions';
import {
  setUsersFilters,
  resetUsersFilters,
} from '../../features/filters/slices/filtersSlices';
import type { AdminUsersFilters } from '../../features/filters/slices/filters.types';
import { useNavigate, useSearchParams } from 'react-router-dom';

const defaults = {
  role: '',
  verified: false,
  username: '',
  email: '',
  sort: 'desc',
  startIndex: 0,
  limit: 12,
  hasAvatar: false,
};

export const DashUsersFilters = () => {
  const dispatch = useAppDispatch();
  const { users: usersFilters } = useAppSelector(
    (state) => state.filters.admin
  );

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { register, watch, reset, control, getValues } =
    useForm<AdminUsersFilters>({
      defaultValues: usersFilters,
    });

  const values = watch();
  const isFirstMount = useRef(true);
  const isInitializingFromUrl = useRef(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Функция для обновления URL параметров
  const updateUrlParams = useCallback(
    (filters: AdminUsersFilters) => {
      const query = new URLSearchParams();

      if (filters.role !== '') query.set('role', filters.role);
      if (filters.verified) query.set('verified', 'true');
      if (filters.hasAvatar) query.set('hasAvatar', 'true');
      if (filters.username !== '') query.set('username', filters.username);
      if (filters.email !== '') query.set('email', filters.email);
      if (filters.sort !== 'desc') query.set('sort', filters.sort);
      if (filters.startIndex !== 0)
        query.set('startIndex', filters.startIndex.toString());

      const newQueryString = query.toString();
      const currentQueryString = window.location.search.substring(1);

      // Обновляем URL только если есть изменения
      if (newQueryString !== currentQueryString) {
        navigate(
          `/dashboard?tab=users${newQueryString ? `&${newQueryString}` : ''}`,
          { replace: true }
        );
      }
    },
    [navigate]
  );

  // Функция для парсинга параметров из URL
  const parseUrlParams = useCallback(() => {
    const params: Partial<AdminUsersFilters> = {};

    if (searchParams.has('role')) params.role = searchParams.get('role') || '';
    if (searchParams.has('verified'))
      params.verified = searchParams.get('verified') === 'true';
    if (searchParams.has('hasAvatar'))
      params.hasAvatar = searchParams.get('hasAvatar') === 'true';
    if (searchParams.has('username'))
      params.username = searchParams.get('username') || '';
    if (searchParams.has('email'))
      params.email = searchParams.get('email') || '';
    if (searchParams.has('sort'))
      params.sort = searchParams.get('sort') as 'asc' | 'desc';
    if (searchParams.has('startIndex'))
      params.startIndex = parseInt(searchParams.get('startIndex') || '0');

    return params;
  }, [searchParams]);

  // Инициализация при первом рендере
  useEffect(() => {
    const urlParams = parseUrlParams();
    const hasUrlParams = Object.keys(urlParams).length > 0;

    // Сценарий 1: Есть параметры в URL - применяем их
    if (hasUrlParams) {
      isInitializingFromUrl.current = true;
      const mergedFilters = { ...defaults, ...urlParams };
      dispatch(setUsersFilters(mergedFilters));
      reset(mergedFilters);
      dispatch(fetchUsers(mergedFilters));
      setIsInitialized(true);
      return;
    }

    // Сценарий 2: Нет параметров в URL, но есть фильтры в Redux (пользователь вернулся)
    const hasNonDefaultFilters =
      JSON.stringify(usersFilters) !== JSON.stringify(defaults);
    if (hasNonDefaultFilters) {
      isInitializingFromUrl.current = true;
      updateUrlParams(usersFilters);
      dispatch(fetchUsers(usersFilters));
      setIsInitialized(true);
      return;
    }

    // Сценарий 3: Первый вход - загружаем с дефолтными параметрами
    dispatch(fetchUsers(defaults));
    setIsInitialized(true);
  }, []); // Убраны зависимости, вызывающие цикл

  // Обновление формы при изменении фильтров в Redux (только после инициализации)
  useEffect(() => {
    if (!isInitialized) return;

    // Обновляем форму только если значения действительно изменились
    const currentValues = getValues();
    if (JSON.stringify(currentValues) !== JSON.stringify(usersFilters)) {
      reset(usersFilters);
    }
  }, [usersFilters, reset, isInitialized, getValues]);

  // Обработка изменений формы (синхронизация с URL и Redux)
  useEffect(() => {
    if (!isInitialized) return;
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    if (isInitializingFromUrl.current) {
      isInitializingFromUrl.current = false;
      return;
    }

    // Проверяем, действительно ли значения изменились
    const currentValues = getValues();
    if (JSON.stringify(currentValues) === JSON.stringify(usersFilters)) {
      return;
    }

    // Дебаунс для избежания множественных запросов
    const timeoutId = setTimeout(() => {
      dispatch(setUsersFilters(values));
      updateUrlParams(values);
      dispatch(fetchUsers(values));
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [
    JSON.stringify(values),
    dispatch,
    updateUrlParams,
    isInitialized,
    usersFilters,
    getValues,
  ]);

  const handleReset = () => {
    dispatch(resetUsersFilters());
    reset(defaults);
    navigate('/dashboard?tab=users', { replace: true });
    dispatch(fetchUsers(defaults));
  };

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
