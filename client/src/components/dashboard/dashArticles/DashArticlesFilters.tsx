import { useForm } from 'react-hook-form';
import type { AdminArticlesFilters } from '../../../features/filters/slices/filters.types';
import { useEffect, type FC } from 'react';
import { ARTICLES_FILTERS_DEFAULTS } from '../../../constants/defaults';
import { CustomInput } from '../../ui/CustomInput';
import { MdFilterAltOff, MdOutlineTextSnippet } from 'react-icons/md';
import { FaTags, FaUser } from 'react-icons/fa';
import { Button } from '../../ui/Button';
import { Controller } from 'react-hook-form';
import { CustomRadio } from '../../ui/CustomRadio';
import { CustomSelect } from '../../ui/CustomSelect';
import { CATEGORIES } from '../../../constants/categories';

type DashArticlesFiltersProps = {
  defaultValues: AdminArticlesFilters;
  onFiltersChange: (values: AdminArticlesFilters) => void;
  isFirstRender: boolean;
};

export const DashArticlesFilters: FC<DashArticlesFiltersProps> = ({
  defaultValues,
  onFiltersChange,
  isFirstRender,
}) => {
  const { register, reset, watch, control } = useForm<AdminArticlesFilters>({
    defaultValues,
  });

  const values = watch();

  useEffect(() => {
    if (!isFirstRender) {
      onFiltersChange(values);
    }
  }, [JSON.stringify(values)]);

  useEffect(() => {
    reset({
      ...defaultValues,
      category: Array.isArray(defaultValues.category)
        ? [...defaultValues.category]
        : [],
    });
  }, [JSON.stringify(defaultValues.category), reset]);

  const handleReset = () => {
    console.log('reset');
    reset(ARTICLES_FILTERS_DEFAULTS);
  };

  const areFiltersEmpty =
    !values.category &&
    !values.limit &&
    !values.search &&
    !values.user &&
    values.sortByLikes === 'desc' &&
    values.sortByViews === 'desc' &&
    values.sortByPublishing === 'desc';

  return (
    <form className="flex flex-col gap-3 grow">
      <CustomInput
        label="Search by text"
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
        name="category"
        control={control}
        render={({ field }) => (
          <CustomSelect
            name="categories"
            label="Select Categories"
            options={CATEGORIES}
            selected={field.value}
            onChange={field.onChange}
            minSelection={1}
            maxSelection={5}
            icon={<FaTags />}
            isMulti
          />
        )}
      />
      <span className="h-px bg-gray-500"></span>
      <Controller
        name="sortByPublishing"
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
      <span className="h-px bg-gray-500"></span>
      <Controller
        name="sortByViews"
        control={control}
        render={({ field }) => (
          <CustomRadio
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            buttons={[
              { value: 'desc', label: 'most popular' },
              { value: 'asc', label: 'least popular' },
            ]}
          />
        )}
      />
      <span className="h-px bg-gray-500"></span>
      <Controller
        name="sortByLikes"
        control={control}
        render={({ field }) => (
          <CustomRadio
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            buttons={[
              { value: 'asc', label: 'most liked' },
              { value: 'desc', label: 'least liked' },
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
