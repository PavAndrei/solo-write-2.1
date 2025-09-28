import { Controller, useForm } from 'react-hook-form';
import { CustomInput } from '../ui/CustomInput';
import { MdFilterAltOff, MdOutlineTextSnippet } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { CustomRadio } from '../ui/CustomRadio';
import { Button } from '../ui/Button';
import type { AdminCommentsFilters } from '../../features/filters/slices/filters.types';
import { COMMENTS_FILTERS_DEFAULTS } from '../../constants/defaults';

export const DashCommentsFilters = () => {
  const { register, watch, control } = useForm<AdminCommentsFilters>({
    defaultValues: COMMENTS_FILTERS_DEFAULTS,
  });

  const values = watch();
  console.log(values);

  return (
    <form className="flex flex-col gap-3 grow">
      <CustomInput
        label="Search by comment's text"
        placeholder="Enter text"
        register={register('search')}
        name="search"
        icon={<MdOutlineTextSnippet />}
      />

      <CustomInput
        label="Search by author"
        placeholder="Enter author's username"
        register={register('user')}
        name="user"
        icon={<FaUser />}
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
              { value: 'popularity', label: 'Sort by popularity' },
              { value: 'createdAt', label: 'Sort by time publishing' },
            ]}
          />
        )}
      />

      <span className="h-px bg-gray-500"></span>

      <Controller
        name="order"
        control={control}
        render={({ field }) => (
          <CustomRadio
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            buttons={[
              { value: 'asc', label: 'ascending order' },
              { value: 'desc', label: 'descending order' },
            ]}
          />
        )}
      />

      <Button
        ariaLabel="reset the filters"
        // onClick={handleReset}
        type="reset"
        // disabled={areFiltersEmpty}
      >
        <MdFilterAltOff /> Clear The Filters
      </Button>
    </form>
  );
};
