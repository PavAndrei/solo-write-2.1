import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './app/router';
import { Layout } from './components/layout/Layout';
import { Header } from './components/layout/Header';
import { Main } from './components/layout/Main';
import { Footer } from './components/layout/Footer';
import { AuthProvider } from './app/providers/AuthProvider';
import { ThemeProvider } from './app/providers/ThemeProvider';
import ModalRoot from './features/modal/components/modals/ModalRoot';

export const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Layout>
          <Header />
          <AuthProvider>
            <Main>
              <AppRouter />
              <ModalRoot />
            </Main>
          </AuthProvider>
          <Footer />
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
};
