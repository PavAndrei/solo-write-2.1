import type { FC } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

interface SliderButtonLeftProps {
  disabled: boolean;
}

export const SliderButtonLeft: FC<SliderButtonLeftProps> = ({
  disabled = false,
}) => {
  return (
    <button
      type="button"
      aria-label="right"
      disabled={disabled}
      className="bg-gray-100 my-auto rounded-full w-10 h-10 flex items-center justify-center cursor-pointer custom-prev-btn active:scale-90 disabled:opacity-25 hover:opacity-85 transition duration-200 ease-in-out"
    >
      <FaArrowLeft className="text-gray-900 text-2xl" />
    </button>
  );
};
