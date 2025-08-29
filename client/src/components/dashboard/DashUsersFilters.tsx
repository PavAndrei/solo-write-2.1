import { Controller, useForm } from 'react-hook-form';
import { CustomInput } from '../ui/CustomInput';
import { FaUser } from 'react-icons/fa';
import { MdEmail, MdFilterAltOff } from 'react-icons/md';
import { CustomCheckbox } from '../ui/CustomCheckbox';
import { CustomRadio } from '../ui/CustomRadio';
import { Button } from '../ui/Button';
import { useEffect, type FC } from 'react';
import type { AdminUsersFilters } from '../../features/filters/slices/filters.types';
import { USERS_FILTERS_DEFAULTS } from '../../constants/defaults';

type DashUsersFiltersProps = {
  defaultValues: AdminUsersFilters;
  onFiltersChange: (values: AdminUsersFilters) => void;
  isFirstRender: boolean;
};

export const DashUsersFilters: FC<DashUsersFiltersProps> = ({
  defaultValues,
  onFiltersChange,
  isFirstRender,
}) => {
  const { register, reset, watch, control } = useForm<AdminUsersFilters>({
    defaultValues,
  });

  const values = watch();

  useEffect(() => {
    console.log(isFirstRender);
    if (!isFirstRender) {
      onFiltersChange(values);
    }
  }, [JSON.stringify(values)]);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const handleReset = () => {
    console.log('reset');
    reset(USERS_FILTERS_DEFAULTS);
  };

  const areFiltersEmpty =
    !values.email &&
    !values.username &&
    !values.hasAvatar &&
    !values.verified &&
    !values.role &&
    values.sort === 'desc';

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

      <Button
        ariaLabel="reset the filters"
        onClick={handleReset}
        type="reset"
        disabled={areFiltersEmpty}
      >
        <MdFilterAltOff /> Clear The Filters
      </Button>
    </form>
  );
};
