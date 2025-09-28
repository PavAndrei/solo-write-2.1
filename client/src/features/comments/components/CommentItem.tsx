import { BiSolidLike } from 'react-icons/bi';
import { Button } from '../../../components/ui/Button';
import { timeAgo } from '../../../utils/timeAgo';
import type { FC } from 'react';
import type { Comment } from '../types/comment.types';
import { MdDelete } from 'react-icons/md';
import { useAppDispatch } from '../../../app/store/hooks';
import { deleteCommentAsync } from '../slices/asyncAction';
import { alertModal, confirmModal } from '../../modal/slices/modalSlice';

export const CommentItem: FC<Comment> = ({
  _id,
  author,
  text,
  createdAt,
  likes,
}) => {
  const dispatch = useAppDispatch();

  const deleteCommentById = async (id: string) => {
    const confirm = await dispatch(
      confirmModal({
        title: 'Deleting the comment',
        message: `Are you sure to delete this comment?`,
      })
    );

    let res;
    if (confirm) {
      res = await dispatch(deleteCommentAsync(id));
    }

    if (res) {
      console.log('success');
      await dispatch(
        alertModal({
          title: 'Success',
          message: `The comment has been deleted.`,
        })
      );
    }
  };

  return (
    <li className="flex flex-col gap-3 border rounded-sm p-2 border-gray-400 relative">
      <div className="flex items-center gap-5">
        <div className="w-12 h-12 rounded-full border-2">
          <img
            className="w-full h-full object-cover rounded-full"
            src={author.userAvatar}
            alt={author.username}
          />
        </div>

        <div className="flex flex-col justify-between">
          <p className="font-semibold text-lg">{author.username}</p>
          <p>{text}</p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-sm opacity-60">
          {'published ' + timeAgo(createdAt)}
        </div>
        <Button size="sm" ariaLabel="likes" className="text-sm">
          <BiSolidLike />
          <span>{likes}</span>
        </Button>

        <Button
          className="absolute top-2.5 right-2"
          ariaLabel="delete"
          type="button"
          onClick={() => deleteCommentById(_id)}
        >
          <MdDelete />
        </Button>
      </div>
    </li>
  );
};
