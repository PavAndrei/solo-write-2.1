import { BiSolidLike } from 'react-icons/bi';
import { Button } from '../../../components/ui/Button';
import { timeAgo } from '../../../utils/timeAgo';
import type { FC } from 'react';
import type { Comment } from '../types/comment.types';

export const CommentItem: FC<Comment> = ({
  author,
  text,
  createdAt,
  likes,
}) => {
  return (
    <li className="flex flex-col gap-3 border rounded-sm p-2 border-gray-400">
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
      </div>
    </li>
  );
};
