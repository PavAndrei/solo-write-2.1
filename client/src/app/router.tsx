import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Articles } from '../pages/Articles';
import { SingleArticle } from '../pages/SingleArticle';
import { Auth } from '../pages/Auth';
import { Dashboard } from '../pages/Dashboard';
import { NotFound } from '../pages/NotFound';
import { Editor } from '../pages/Editor';
import { ProtectedRoute } from '../components/navigation/ProtectedRoute';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Auth mode="sign-in" />} />
      <Route path="/signup" element={<Auth mode="sign-up" />} />
      <Route path="/editor" element={<Editor />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/article/:slug" element={<SingleArticle />} />
      <Route path="*" element={<NotFound />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};
