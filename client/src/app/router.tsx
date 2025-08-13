import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Articles } from '../pages/Articles';
import { SingleArticle } from '../pages/SingleArticle';
import { Auth } from '../pages/Auth';
import { AdminPanel } from '../pages/AdminPanel';
import { NotFound } from '../pages/NotFound';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Auth mode="sign-in" />} />
      <Route path="/signup" element={<Auth mode="sign-up" />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/article/:id" element={<SingleArticle />} />
      <Route path="/admin/*" element={<AdminPanel />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
