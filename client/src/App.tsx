import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './app/router';
import { Layout } from './components/layout/Layout';
import { Header } from './components/layout/Header';
import { Main } from './components/layout/Main';
import { Footer } from './components/layout/Footer';

export const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <Main>
          <AppRouter />
        </Main>
        <Footer />
      </Layout>
    </BrowserRouter>
  );
};
