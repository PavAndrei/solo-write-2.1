import type { FC } from 'react';
import { useAppSelector } from '../../app/store/hooks';
import { Navigate, Outlet } from 'react-router-dom';
import { SpinnerLoading } from '../ui/SpinnerLoading';

export const ProtectedRoute: FC = () => {
  const { user, isAuthChecked } = useAppSelector((state) => state.auth);

  if (!isAuthChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SpinnerLoading />
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/signin" />;
};
