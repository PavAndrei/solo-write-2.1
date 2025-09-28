import { MdComment } from 'react-icons/md';
import { Button } from '../../../components/ui/Button';
import { CustomSelect } from '../../../components/ui/CustomSelect';
import { CustomTextarea } from '../../../components/ui/CustomTextarea';
import { ArticleCommentList } from './CommentList';
import { SpinnerLoading } from '../../../components/ui/SpinnerLoading';
import { Status } from '../../../types/api';
import type { CreateCommentPayload } from '../types/comment.types';
import { useState, type FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { createCommentAsync } from '../slices/asyncAction';
import { FaFilter } from 'react-icons/fa';

interface CommentSectionProps {
  articleId: string;
}

export const CommentSection: FC<CommentSectionProps> = ({ articleId }) => {
  const dispatch = useAppDispatch();

  const [sort, setSort] = useState<string[]>(['newest', 'Newest first']);
  const [comment, setComment] = useState('');

  const { items: comments, status: commentsStatus } = useAppSelector(
    (state) => state.comments.current
  );

  const postComment = async (payload: CreateCommentPayload) => {
    await dispatch(createCommentAsync(payload));
    setComment('');
  };

  if (commentsStatus === Status.LOADING) {
    return <SpinnerLoading />;
  }

  if (commentsStatus === Status.ERROR) {
    return <span>Something went wrong...</span>;
  }

  return (
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
        onClick={() => postComment({ text: comment, articleId })}
      >
        Post
      </Button>

      {comments.length >= 1 && (
        <>
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
          <ArticleCommentList commentList={comments} />
        </>
      )}
      {!comments && <span>No comments has been found yet...</span>}
    </section>
  );
};
