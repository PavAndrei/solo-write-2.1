import clsx from 'clsx';
import { type FC, type ReactNode, useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaTimes } from 'react-icons/fa';

export interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label: string;
  name?: string;
  options: SelectOption[];
  selected: string[];
  onChange: (value: string[]) => void;
  error?: string;
  icon?: ReactNode;
  minSelection?: number;
  maxSelection?: number;
  placeholder?: string;
  isMulti?: boolean;
  className?: string;
}

export const CustomSelect: FC<CustomSelectProps> = ({
  label,
  isMulti,
  // name,
  options,
  selected,
  onChange,
  error,
  icon,
  minSelection = 0,
  maxSelection = 5,
  placeholder = 'Choose options',
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (optionValue: string) => {
    let newSelected: string[];

    if (isMulti) {
      newSelected = selected.includes(optionValue)
        ? selected.filter((v) => v !== optionValue)
        : selected.length < maxSelection
        ? [...selected, optionValue]
        : selected;
    } else {
      newSelected = [optionValue]; // только одно значение
      setIsOpen(false); // закрываем селект после выбора
    }

    onChange(newSelected);
  };

  const removeOption = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSelected = selected.filter((v) => v !== optionValue);
    onChange(newSelected);
  };

  const handleSelectClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (optionValue: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleOption(optionValue);
  };

  const selectedOptions = options.filter((opt) => selected.includes(opt.value));
  const availableOptions = options.filter(
    (opt) => !selected.includes(opt.value)
  );

  return (
    <div className="flex flex-col gap-1.5 relative" ref={selectRef}>
      <span className="font-medium text-lg">{label}</span>

      <div className="relative group">
        <div
          ref={selectRef}
          className={clsx(
            'border rounded pl-8 pr-10 py-2 w-full transition-all ease-in-out duration-200 shadow-md hover:shadow-gray-300 dark:hover:shadow-gray-500 focus:border-gray-900 dark:focus:border-gray-100 focus:shadow-gray-300 dark:focus:shadow-gray-500',
            'min-h-[44px] flex items-center flex-wrap gap-1 cursor-pointer',
            error ? 'border-red-500' : 'border-gray-500',
            isOpen && 'border-gray-900 dark:border-gray-100',
            className
          )}
          onClick={handleSelectClick}
          tabIndex={0}
        >
          {icon && (
            <span className="absolute top-3.5 left-2.5 text-gray-500 group-focus-within:text-gray-900 dark:group-focus-within:text-gray-100 transition-all duration-300 ease-in-out">
              {icon}
            </span>
          )}

          {selectedOptions.length > 0 ? (
            <div className="flex flex-wrap gap-1 ml-4">
              {selectedOptions.map((option) => (
                <span
                  key={option.value}
                  className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm flex items-center gap-1"
                >
                  {option.label}
                  {isMulti && (
                    <button
                      type="button"
                      onClick={(e) => removeOption(option.value, e)}
                      className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                    >
                      <FaTimes size={12} />
                    </button>
                  )}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-gray-500 ml-0.5">{placeholder}</span>
          )}

          <FaChevronDown
            className={clsx(
              'absolute top-3.5 right-2 text-gray-500 transition-transform duration-200',
              isOpen && 'transform rotate-180'
            )}
          />
        </div>

        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded mt-1 shadow-lg z-50 max-h-60 overflow-y-auto"
          >
            {availableOptions.length > 0 ? (
              availableOptions.map((option) => (
                <div
                  key={option.value}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  onClick={(e) => handleOptionClick(option.value, e)}
                >
                  {option.label}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500 text-sm">
                Maximum {maxSelection} options selected
              </div>
            )}
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <p className="text-sm text-gray-500 dark:text-gray-400">
        Choose from {minSelection} to {maxSelection} options
      </p>
    </div>
  );
};
