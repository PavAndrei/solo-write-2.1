import type { FC } from 'react';
import { FaArrowRight } from 'react-icons/fa';

interface SliderButtonRightProps {
  disabled: boolean;
}

export const SliderButtonRight: FC<SliderButtonRightProps> = ({
  disabled = false,
}) => {
  return (
    <button
      type="button"
      aria-label="right"
      disabled={disabled}
      className="bg-gray-100 my-auto rounded-full w-10 h-10 flex items-center justify-center cursor-pointer custom-next-btn active:scale-90 disabled:opacity-25 hover:opacity-85 transition duration-200 ease-in-out"
    >
      <FaArrowRight className="text-gray-900 text-2xl" />
    </button>
  );
};
