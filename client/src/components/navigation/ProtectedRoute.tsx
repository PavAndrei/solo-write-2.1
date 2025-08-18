import type { FC } from 'react';
import { useAppSelector } from '../../app/store/hooks';
import { Navigate, Outlet } from 'react-router-dom';
import { SpinnerLoading } from '../ui/SpinnerLoading';

export const ProtectedRoute: FC = () => {
  const { user, isAuthChecked } = useAppSelector((state) => state.auth);

  if (!isAuthChecked) {
    return <SpinnerLoading />;
  }

  return user ? <Outlet /> : <Navigate to="/signin" />;
};
