import type { Status } from '../../../types/api';
import type { CommentList } from '../types/comment.types';

export interface CommentState {
  current: {
    items: CommentList;
    status: Status;
  };
  create: {
    status: Status;
  };
  delete: {
    status: Status;
  };
}
