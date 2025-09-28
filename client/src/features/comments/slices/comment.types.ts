import type { Status } from '../../../types/api';
import type { CommentList } from '../types/comment.types';

export interface CommentState {
  current: {
    items: CommentList;
    status: Status;
  };
  list: {
    items: CommentList;
    status: Status;
    total: number | null;
    count: number | null;
  };
  create: {
    status: Status;
  };
  delete: {
    status: Status;
  };
}
