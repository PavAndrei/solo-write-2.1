import type { FC } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  handlePageClick: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = ({
  totalPages,
  currentPage,
  handleNextPage,
  handlePreviousPage,
  handlePageClick,
}) => {
  if (totalPages === 1) {
    return;
  }

  return (
    <div className="flex pt-5 items-center gap-2 w-full justify-center">
      <button
        className="p-2 border rounded-md not-disabled:cursor-pointer min-h-8 not-disabled:active:scale-95 disabled:opacity-45 not-disabled:hover:bg-gray-200 not-disabled:dark:hover:bg-gray-600 transition-colors ease-in-out duration-300"
        type="button"
        onClick={handlePreviousPage}
        disabled={currentPage === 0}
      >
        <FaArrowLeft />
      </button>
      <div className="flex gap-1.5">
        {[...Array(totalPages)].map((_, index) => {
          return (
            <button
              className="border rounded-md py-1 px-3 not-disabled:cursor-pointer not-disabled:active:scale-95 disabled:opacity-45 dark:disabled:bg-gray-700 not-disabled:hover:bg-gray-200 not-disabled:dark:hover:bg-gray-600 transition-colors ease-in-out duration-300"
              onClick={() => handlePageClick(index)}
              disabled={currentPage === index}
              key={index}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
      <button
        className="p-2 border rounded-md not-disabled:cursor-pointer min-h-8 not-disabled:active:scale-95 disabled:opacity-45 not-disabled:hover:bg-gray-200 not-disabled:dark:hover:bg-gray-600 transition-colors ease-in-out duration-300"
        onClick={handleNextPage}
        disabled={currentPage === totalPages - 1}
      >
        <FaArrowRight />
      </button>
    </div>
  );
};
