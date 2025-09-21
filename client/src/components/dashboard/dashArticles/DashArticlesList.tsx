import { useAppSelector } from '../../../app/store/hooks';
import { Status } from '../../../types/api';
import { SpinnerLoading } from '../../ui/SpinnerLoading';
import { DashArticlesItem } from './DashArticlesItem';

export const DashArticlesList = () => {
  const { items, total, status } = useAppSelector(
    (state) => state.articles.list
  );

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
              ? `${total} articles were found:`
              : 'Articles not found'}
          </span>
          <ul className="flex flex-col gap-3">
            {items?.map((article) => (
              <DashArticlesItem
                key={article._id}
                {...article}
                image={article.images[0]}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
