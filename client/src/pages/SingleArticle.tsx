import { useNavigate, useParams } from 'react-router-dom';
import { Container } from '../components/layout/Container';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/store/hooks';
import {
  fetchArticleLike,
  fetchOneArticle,
} from '../features/articles/slices/asyncActions';
import { Status } from '../types/api';
import { SpinnerLoading } from '../components/ui/SpinnerLoading';
import { Slider } from '../components/ui/sliders/SLider';
import { Button } from '../components/ui/Button';
import { BiSolidLike } from 'react-icons/bi';
import { HiEye } from 'react-icons/hi';
import { alertModal } from '../features/modal/slices/modalSlice';
import { CustomSelect } from '../components/ui/CustomSelect';
import { FaFilter } from 'react-icons/fa';
import { CustomTextarea } from '../components/ui/CustomTextarea';
import { MdComment } from 'react-icons/md';

export const SingleArticle = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { item, status } = useAppSelector((state) => state.articles.current);
  const { user } = useAppSelector((state) => state.auth);

  const [sort, setSort] = useState<string[]>(['newest', 'Newest first']);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (slug) {
      dispatch(fetchOneArticle(slug));
    }
  }, []);

  if (status === Status.LOADING || status === Status.IDLE) {
    return (
      <div className="h-screen">
        <SpinnerLoading />
      </div>
    );
  }

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

  const isLikedByCurrentUser = user && item?.likedBy?.includes(user._id);

  return (
    <div className="h-full py-10">
      <Container>
        {item && (
          <>
            <section className="flex flex-col gap-5">
              <article
                className="article"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
              <Slider slides={item.images} />
              <span className="h-px w-full bg-gray-300 dark:bg-gray-700 my-4" />

              <div className="flex flex-col gap-3">
                <div className="flex gap-1.5 items-baseline text-gray-500">
                  <Button
                    onClick={() => toggleLike(!!user?._id, item.slug)}
                    ariaLabel="likes"
                    className={isLikedByCurrentUser ? 'text-red-600' : ''}
                  >
                    <BiSolidLike />
                  </Button>
                  <span>
                    {item.likesCount}{' '}
                    {item.likesCount === 1 ? 'person ' : 'people '}liked this
                    article
                  </span>
                </div>

                <div className="flex gap-1.5 items-center font-medium text-gray-500">
                  <div className="min-w-12 flex justify-center items-center">
                    <HiEye className="text-2xl" />
                  </div>
                  {item.viewsCount}
                  {item.viewsCount === 1 ? ' person ' : ' people '}read this
                  article
                </div>
              </div>
            </section>
            <span className="h-px w-full bg-gray-300 dark:bg-gray-700 my-4" />
            <section className="py-4 flex flex-col gap-4">
              <CustomTextarea
                label="Comment"
                placeholder="Write your comment here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                name="description"
                icon={<MdComment />}
                showCounter
                maxLength={350}
                rows={3}
              />
              <Button
                ariaLabel="send comment"
                className="w-1/12"
                disabled={!comment}
              >
                Post
              </Button>
              <CustomSelect
                label="Sort comments"
                options={[
                  { value: 'newest', label: 'Newest first' },
                  { value: 'oldest', label: 'Oldest first' },
                  { value: 'popular', label: 'Most popular' },
                ]}
                selected={sort}
                onChange={setSort}
                isMulti={false}
                placeholder="Select sorting"
                icon={<FaFilter />}
                className="max-w-1/5"
                maxSelection={1}
                minSelection={1}
              />
            </section>
          </>
        )}
      </Container>
    </div>
  );
};
