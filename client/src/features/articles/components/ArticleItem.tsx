import type { FC } from 'react';
import type { Article } from '../types/article.types';
import { formatDate } from '../../../utils/formatDate';
import { Button } from '../../../components/ui/Button';
import { HiEye } from 'react-icons/hi';
import { BiSolidLike } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import clsx from 'clsx';
import { fetchArticleLike } from '../slices/asyncActions';
import { alertModal } from '../../modal/slices/modalSlice';
import { getOptimizedImageUrl } from '../../../utils/optimizeImage';

export const ArticleItem: FC<Article> = ({
  title,
  description,
  categories,
  images,
  author,
  createdAt,
  viewsCount,
  likesCount,
  slug,
  likedBy,
}) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  const toggleLike = async (isAuthentificated: boolean, slug: string) => {
    if (isAuthentificated) {
      await dispatch(fetchArticleLike(slug));
    } else {
      await dispatch(
        alertModal({
          title: 'You can not like the article',
          message:
            'You are not authentificated. Please sign in and repeat again.',
        })
      );
      navigate('/signin');
    }
  };

  const isLikedByCurrentUser = user && likedBy?.includes(user._id);

  return (
    <li className="border p-2 rounded-sm flex flex-col gap-3">
      <div className="overflow-hidden flex flex-col gap-2">
        <div>
          <h4 className="text-xl font-semibold line-clamp-3">{title}</h4>
          <span className="text-xs opacity-70">{formatDate(createdAt)}</span>
        </div>
        <p className="line-clamp-6 text-sm">{description}</p>
        <span className="flex gap-1.5 items-center italic text-sm">
          <span className="opacity-80">written by</span>
          <span className="opacity-100">{author}</span>
        </span>
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
      </div>

      <div className="flex flex-col gap-1.5 mt-auto mb-0">
        <div className="rounded-md max-w-full h-[200px] w-full">
          <img
            className="object-cover w-full h-full rounded-md"
            src={getOptimizedImageUrl(images[0], 30)}
            alt={title}
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            onClick={() => toggleLike(!!user?._id, slug)}
            type="button"
            aria-label="like"
            className={clsx(
              'flex gap-1.5 items-center text-lg cursor-pointer',
              isLikedByCurrentUser
                ? 'text-red-600'
                : 'text-gray-700 dark:text-gray-300'
            )}
          >
            <BiSolidLike />
            {likesCount}
          </button>

          <div className="flex gap-1.5 items-center text-lg text-gray-700 dark:text-gray-300">
            <HiEye />
            {viewsCount}
          </div>
        </div>

        <Button
          ariaLabel="read more"
          type="button"
          onClick={() => navigate(`/article/${slug}`)}
        >
          Read More
        </Button>
      </div>
    </li>
  );
};
