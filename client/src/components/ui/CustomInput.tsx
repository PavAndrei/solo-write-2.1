import clsx from 'clsx';
import { useState, type FC, type ReactNode } from 'react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { HiEye, HiEyeOff } from 'react-icons/hi';

interface CustomInputProps {
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  icon: ReactNode;
}

export const CustomInput: FC<CustomInputProps> = ({
  label,
  type = 'text',
  name,
  placeholder,
  register,
  error,
  icon,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const isPassword = name === 'password' || name === 'repeatPassword';
  const inputType = isPassword && !isPasswordVisible ? 'password' : 'text';

  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-medium text-lg">{label}</span>
      <div className="relative group">
        <input
          type={isPassword ? inputType : type}
          placeholder={placeholder}
          {...register}
          autoComplete={name}
          className={clsx(
            'border rounded pl-8 pr-3 py-2 placeholder:text-gray-500 w-full transition-all ease-in-out duration-200 shadow-md hover:shadow-gray-300 dark:hover:shadow-gray-500 focus:border-gray-900 dark:focus:border-gray-100 focus:shadow-gray-300 dark:focus:shadow-gray-500 focus-visible:shadow-gray-500 focus-visible:inset-shadow-gray-600 dark:inset-shadow-gray-100 focus-visible:inset-shadow-sm',
            error ? 'border-red-500' : 'border-gray-500'
          )}
        />
        <span className="absolute top-3.5 left-2 text-gray-500 group-focus-within:text-gray-900 dark:group-focus-within:text-gray-100 group-focus-within:scale-110 transition-all duration-300 ease-in-out">
          {icon}
        </span>

        {isPassword && (
          <button
            aria-label="toggle password visibility"
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            type="button"
            className="absolute top-3.5 right-2 text-md text-gray-500 cursor-pointer shadow-md hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-300 ease-in-out focus-visible:outline-0 focus-visible:text-gray-900 dark:focus-visible:text-gray-100 focus-visible:scale-110"
          >
            {isPasswordVisible ? <HiEye /> : <HiEyeOff />}
          </button>
        )}
      </div>

      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </label>
  );
};
