import type { Status } from '../../../types/api';
import type { Article } from '../types/article.types';

export interface ArticleState {
  list: {
    items: Article[];
    status: Status;
  };
  current: {
    item: Article | null;
    status: Status;
  };
  create: {
    status: Status;
  };
  edit: {
    status: Status;
  };
  delete: {
    status: Status;
  };
}
