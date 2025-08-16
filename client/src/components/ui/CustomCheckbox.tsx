import { useRef, type FC } from 'react';
import type { FieldError } from 'react-hook-form';
import { RiCheckboxBlankLine, RiCheckboxLine } from 'react-icons/ri';

interface CustomCheckboxProps {
  name: string;
  label: string;
  error?: FieldError;
  checked?: boolean;
  onChange: (checked: boolean) => void;
}

export const CustomCheckbox: FC<CustomCheckboxProps> = ({
  label,
  error,
  checked = false,
  onChange,
  name,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  console.log(checked);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="hidden"
          ref={inputRef}
        />
        <button
          className="cursor-pointer flex gap-1.5 items-center text-xl"
          type="button"
          onClick={() => inputRef.current?.click()}
        >
          {checked ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
          <span className="text-lg font-medium -translate-y-0.5">{label}</span>
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};
