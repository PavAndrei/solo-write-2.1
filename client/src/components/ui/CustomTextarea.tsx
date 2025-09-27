import clsx from 'clsx';
import type { FC, ReactNode, ChangeEvent } from 'react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface CustomTextareaProps {
  label: string;
  name: string;
  placeholder?: string;
  register?: UseFormRegisterReturn; // теперь необязательный
  error?: FieldError;
  icon: ReactNode;
  rows?: number;
  resize?: 'both' | 'horizontal' | 'vertical' | 'none';
  noScroll?: boolean;
  maxLength?: number;
  showCounter?: boolean;
  currentValue?: string; // оставляем для совместимости
  value?: string; // для onChange+useState
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const CustomTextarea: FC<CustomTextareaProps> = ({
  label,
  name,
  placeholder,
  register,
  error,
  icon,
  rows = 4,
  resize = 'none',
  noScroll = false,
  maxLength,
  showCounter = false,
  currentValue,
  value,
  onChange,
}) => {
  const controlledValue = value ?? currentValue ?? '';

  return (
    <label className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center">
        <span className="font-medium text-lg">{label}</span>
        {showCounter && maxLength && (
          <span className="text-sm text-gray-500">
            {controlledValue.length}/{maxLength}{' '}
          </span>
        )}
      </div>
      <div className="relative group">
        <textarea
          placeholder={placeholder}
          rows={rows}
          autoComplete={name}
          maxLength={maxLength}
          style={{ resize }}
          {...(register ?? {})}
          value={controlledValue}
          onChange={onChange ?? register?.onChange}
          className={clsx(
            'border rounded pl-8 pr-3 py-2 placeholder:text-gray-500 w-full transition-all ease-in-out duration-200 shadow-md hover:shadow-gray-300 dark:hover:shadow-gray-500 focus:border-gray-900 dark:focus:border-gray-100 focus:shadow-gray-300 dark:focus:shadow-gray-500 focus-visible:shadow-gray-500 focus-visible:inset-shadow-gray-600 dark:group-focus-within:inset-shadow-gray-100 focus-visible:inset-shadow-sm',
            'min-h-[100px]',
            noScroll && 'overflow-hidden',
            error ? 'border-red-500' : 'border-gray-500'
          )}
        />
        <span className="absolute top-3.5 left-2 text-gray-500 group-focus-within:text-gray-900 dark:group-focus-within:text-gray-100 group-focus-within:scale-110 transition-all duration-300 ease-in-out">
          {icon}
        </span>
      </div>
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </label>
  );
};
