import type { FC } from 'react';
import type {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegisterReturn,
} from 'react-hook-form';

interface FileInputProps {
  accept: string;
  register: UseFormRegisterReturn;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl>;
}

export const FileInput: FC<FileInputProps> = ({
  accept = 'image/*',
  register,
  error,
}) => {
  return (
    <div>
      <input
        type="file"
        accept={accept}
        {...register}
        className="block border p-2"
      />
      {error && (
        <p className="text-red-500 text-sm">{error.message?.toString()}</p>
      )}
    </div>
  );
};
