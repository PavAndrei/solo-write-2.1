import { useNavigate, useParams } from 'react-router-dom';
import { Container } from '../components/layout/Container';
import { useEffect } from 'react';
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
import { fetchArticleComments } from '../features/comments/slices/asyncAction';
import { CommentSection } from '../features/comments/components/CommentsSection';

export const SingleArticle = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { item, status: articleStatus } = useAppSelector(
    (state) => state.articles.current
  );

  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (slug) {
      dispatch(fetchOneArticle(slug));
    }
  }, []);

  useEffect(() => {
    if (item?._id && articleStatus === Status.SUCCESS) {
      const getComments = async () => {
        await dispatch(fetchArticleComments(item._id));
      };

      getComments();
    }
  }, [articleStatus, item, dispatch]);

  if (articleStatus === Status.LOADING || articleStatus === Status.IDLE) {
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

            <CommentSection articleId={item?._id} />
          </>
        )}
      </Container>
    </div>
  );
};
