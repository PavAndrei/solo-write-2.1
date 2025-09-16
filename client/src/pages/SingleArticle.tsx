import { useParams } from 'react-router-dom';
import { Container } from '../components/layout/Container';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/store/hooks';
import { fetchOneArticle } from '../features/articles/slices/asyncActions';
import { Status } from '../types/api';
import { SpinnerLoading } from '../components/ui/SpinnerLoading';

export const SingleArticle = () => {
  const { slug } = useParams();

  const dispatch = useAppDispatch();
  const { item, status } = useAppSelector((state) => state.articles.current);

  useEffect(() => {
    if (slug) {
      dispatch(fetchOneArticle(slug));
    }
  }, []);

  if (status === Status.LOADING || status === Status.IDLE) {
    return (
      <div className="h-screen">
        <SpinnerLoading />
      </div>
    );
  }

  return (
    <section className="h-full py-10">
      <Container>
        {item && (
          <>
            <article
              className="article"
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
          </>
        )}
      </Container>
    </section>
  );
};
