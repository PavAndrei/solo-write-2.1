import type { FC } from 'react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface CustomInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

export const CustomInput: FC<CustomInputProps> = ({
  label,
  type = 'text',
  placeholder,
  register,
  error,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className={`border rounded px-3 py-2 outline-none ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};
