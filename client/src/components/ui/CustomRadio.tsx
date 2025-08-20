import { useRef, type FC } from 'react';
import { IoIosRadioButtonOn, IoIosRadioButtonOff } from 'react-icons/io';

interface RadioButton {
  value: string;
  label: string;
}

interface CustomRadioProps {
  name: string;
  buttons: RadioButton[];
  value?: string;
  onChange: (value: string) => void;
}

export const CustomRadio: FC<CustomRadioProps> = ({
  buttons,
  name,
  value,
  onChange,
}) => {
  const radioRef = useRef<HTMLInputElement | null>(null);

  return (
    <div>
      {buttons.map((btn) => (
        <label
          key={btn.value}
          className="flex items-center gap-1.5 cursor-pointer text-gray-600 focus-within:font-bold"
        >
          <input
            type="radio"
            name={name}
            value={btn.value}
            checked={value === btn.value}
            onChange={() => onChange(btn.value)}
            ref={radioRef}
            className="sr-only"
            role="radio"
          />
          {value === btn.value ? (
            <IoIosRadioButtonOn className="text-gray-900 dark:text-gray-100" />
          ) : (
            <IoIosRadioButtonOff />
          )}
          <span
            className={
              value === btn.value ? 'text-gray-900 dark:text-gray-100' : ''
            }
          >
            {btn.label}
          </span>
        </label>
      ))}
    </div>
  );
};
