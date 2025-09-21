import { useForm } from 'react-hook-form';
import type { AdminArticlesFilters } from '../../../features/filters/slices/filters.types';
import { useEffect, type FC } from 'react';
import { ARTICLES_FILTERS_DEFAULTS } from '../../../constants/defaults';
import { CustomInput } from '../../ui/CustomInput';
import { MdFilterAltOff, MdOutlineTextSnippet } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { Button } from '../../ui/Button';

type DashArticlesFiltersProps = {
  defaultValues: AdminArticlesFilters;
  onFiltersChange: (values: AdminArticlesFilters) => void;
  //   isFirstRender: boolean;
};

export const DashArticlesFilters: FC<DashArticlesFiltersProps> = ({
  defaultValues,
  onFiltersChange,
  //   isFirstRender,
}) => {
  const { register, reset, watch, control } = useForm<AdminArticlesFilters>({
    defaultValues,
  });

  const values = watch();

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const handleReset = () => {
    console.log('reset');
    reset(ARTICLES_FILTERS_DEFAULTS);
  };

  const areFiltersEmpty =
    !values.category &&
    !values.limit &&
    !values.search &&
    !values.sortBy &&
    !values.user &&
    values.sort === 'desc';

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
