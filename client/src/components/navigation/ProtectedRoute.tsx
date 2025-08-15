import type { FC } from 'react';
import { useAppSelector } from '../../app/store/hooks';
import { Navigate, Outlet } from 'react-router-dom';
import { SpinnerLoading } from '../ui/SpinnerLoading';

export const ProtectedRoute: FC = () => {
  const { user, status } = useAppSelector((state) => state.auth);

  if (status === 'loading') {
    return <SpinnerLoading />;
  }

  if (status === 'success') {
    return user ? <Outlet /> : <Navigate to="/signin" />;
  }
};
