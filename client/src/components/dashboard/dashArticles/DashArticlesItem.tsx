import type { FC } from 'react';
import { MdDeleteForever, MdEditSquare, MdArticle } from 'react-icons/md';
import { Button } from '../../ui/Button';
import { trimString } from '../../../utils/trimString';
import { formatDate } from '../../../utils/formatDate';
import { BiSolidLike } from 'react-icons/bi';
import { HiEye } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

interface DashArticlesItemProps {
  title: string;
  image: string;
  createdAt: string;
  description: string;
  author: string;
  likesCount: number;
  viewsCount: number;
  categories: string[];
  slug: string;
}

export const DashArticlesItem: FC<DashArticlesItemProps> = ({
  title,
  image,
  createdAt,
  description,
  author,
  likesCount,
  viewsCount,
  categories,
  slug,
}) => {
  const navigate = useNavigate();

  return (
    <li className="border py-3 pr-1.5 pl-20 rounded-md relative">
      <div className="w-full flex flex-col gap-5">
        <div className="flex justify-between items-center gap-2">
          <div className="absolute top-4 left-3 rounded-md flex items-center justify-center max-h-10 max-w-15 my-auto">
            {image ? (
              <img
                src={image}
                className="w-full h-full rounded-md border"
                alt={trimString(title, 30)}
              />
            ) : (
              <MdArticle />
            )}
          </div>

          <div className="flex flex-col gap-1">
            <div className="font-medium text-lg flex flex-col mb-4">
              <span> {trimString(title, 50)}</span>
              <span className="font-light text-sm">
                {formatDate(createdAt)}
              </span>
            </div>
            <div className="font-light text-sm text-gray-700 dark:text-gray-300 line-clamp-3 mb-2">
              {description}
            </div>
            <div className="flex gap-1.5 items-center italic text-sm">
              <span className="opacity-80">- written by</span>
              <span className="opacity-100">{author}</span>
            </div>
          </div>
        </div>

        <ul className="flex gap-1.5 flex-wrap">
          {categories?.map((category, i) => (
            <li
              className="py-1 px-1.5 border rounded-2xl bg-gray-300 dark:bg-gray-500 text-gray-700 dark:text-gray-300 text-sm"
              key={i}
            >
              {category}
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-1 text-sm">
          <div className="flex items-center gap-1.5">
            <HiEye />
            <span>people read it {viewsCount} times</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BiSolidLike />
            <span>
              {likesCount} {likesCount === 1 ? 'person' : 'people'} like it
            </span>
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            ariaLabel="read full text"
            type="button"
            onClick={() => navigate(`/article/${slug}`)}
          >
            Read Full Text
          </Button>
          <div className="flex ml-auto mr-0 gap-4">
            <Button type="button" ariaLabel="edit this user" size="sm">
              <span>Edit</span>
              <MdEditSquare />
            </Button>
            <Button type="button" ariaLabel="delete this user" size="sm">
              <span>Delete</span>
              <MdDeleteForever className="text-red-600" />
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
};
