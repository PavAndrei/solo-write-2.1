import type { Status } from '../../../types/api';
import type { Article } from '../types/article.types';

export interface ArticleState {
  list: {
    items: Article[] | null | undefined;
    popularItems: Article[] | null | undefined;
    total: number | undefined;
    status: Status;
  };
  current: {
    item: Article | null | undefined;
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
