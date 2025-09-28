import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { fetchAllComments } from '../../features/comments/slices/asyncAction';
import { Status } from '../../types/api';
import { SpinnerLoading } from '../ui/SpinnerLoading';
// import { DashCommentsItem } from './DashCommentsItem';
import { CommentItem } from '../../features/comments/components/CommentItem';

export const DashCommentsList = () => {
  const dispatch = useAppDispatch();
  const { count, items, status, total } = useAppSelector(
    (state) => state.comments.list
  );

  useEffect(() => {
    dispatch(fetchAllComments());
  }, [dispatch]);

  if (status === Status.LOADING) {
    return (
      <div className="w-2/3">
        <SpinnerLoading />
      </div>
    );
  }

  if (status === Status.ERROR) {
    return <div className="w-2/3">Something went wrong...</div>;
  }

  return (
    <div className="w-2/3 min-h-full flex flex-col">
      {status === Status.IDLE ? null : (
        <>
          <span className="mb-2 block font-medium text-lg">
            {total && total > 0
              ? `${total} comments were found:`
              : 'Comments not found'}
          </span>
          <span className="mb-2 block font-medium text-lg">
            {count && count > 0
              ? `${count} comments were found:`
              : 'Comments not found'}
          </span>
          <ul className="flex flex-col gap-3">
            {items.map((comment) => (
              <CommentItem key={comment._id} {...comment} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
