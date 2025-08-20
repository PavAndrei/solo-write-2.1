import { useEffect } from 'react';
import { PageTitle } from '../ui/PageTitle';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { fetchUsers } from '../../features/users/slices/asyncActions';
import { DashUsersItem } from './DashUsersItem';
import { Container } from '../layout/Container';
import type { FetchUsersRequestParams } from '../../features/users/types/users.types';
import { Controller, useForm } from 'react-hook-form';
import { CustomInput } from '../ui/CustomInput';
import { FaUser } from 'react-icons/fa';
import { MdEmail, MdFilterAltOff } from 'react-icons/md';
import { CustomCheckbox } from '../ui/CustomCheckbox';
import { Button } from '../ui/Button';
import { CustomRadio } from '../ui/CustomRadio';

const initialFilterState: FetchUsersRequestParams = {
  role: '',
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

  const {
    register,
    watch,
    reset,
    control,
    // formState: { isLoading, errors },
  } = useForm<FetchUsersRequestParams>({
    defaultValues: initialFilterState,
  });

  const values = watch();
  console.log(values);

  useEffect(() => {
    dispatch(fetchUsers(values));
  }, []);

  return (
    <section className="pt-10">
      <PageTitle hasSubtitle="Manage the Users collection on the platofrorm Solo Write">
        Users
      </PageTitle>
      <Container>
        <div className="flex justify-between gap-15 pb-10">
          <div className="w-2/3">
            <span className="mb-2 block font-medium text-lg">
              {data?.total} users were found:
            </span>
            <ul className="flex flex-col gap-3">
              {data?.users.map((user) => (
                <DashUsersItem key={user._id} {...user} />
              ))}
            </ul>
          </div>

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
              name="username"
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

            <Button
              ariaLabel="reset the filters"
              onClick={() => reset()}
              type="reset"
            >
              <MdFilterAltOff /> Clear The Filters
            </Button>
          </form>
        </div>
      </Container>
    </section>
  );
};
