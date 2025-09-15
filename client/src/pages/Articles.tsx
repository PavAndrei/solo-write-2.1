import { useEffect } from 'react';
import { Container } from '../components/layout/Container';
import { PageTitle } from '../components/ui/PageTitle';
import { BASE_API_URL } from '../constants/api';

export const Articles = () => {
  useEffect(() => {
    const fetchArticles = async () => {
      const res = await fetch(`${BASE_API_URL}/article`);
      const data = await res.json();
      console.log(data);
    };
    fetchArticles();
  }, []);

  return (
    <section className="h-full py-10">
      <Container>
        <PageTitle hasSubtitle="Find your favorites">
          Articles Collection
        </PageTitle>
      </Container>
    </section>
  );
};
