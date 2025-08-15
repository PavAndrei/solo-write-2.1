import type { FC } from 'react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface CustomCheckboxProps {
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

export const CustomCheckbox: FC<CustomCheckboxProps> = ({
  label,
  register,
  error,
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5">
        <input type="checkbox" id="terms" {...register} />
        <label htmlFor="terms">{label}</label>
      </div>
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};
