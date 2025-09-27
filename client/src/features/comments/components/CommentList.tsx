import type { FC } from 'react';
import { CommentItem } from './CommentItem';
import type { CommentList } from '../types/comment.types';

interface CommentListProps {
  commentList: CommentList;
}

export const ArticleCommentList: FC<CommentListProps> = ({ commentList }) => {
  return (
    <ul>
      {commentList.map((comment) => (
        <CommentItem key={comment._id} {...comment} />
      ))}
    </ul>
  );
};
