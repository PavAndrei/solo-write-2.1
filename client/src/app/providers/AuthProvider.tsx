import { useEffect, type FC, type ReactNode } from 'react';
import { useAppDispatch } from '../store/hooks';
import { checkAuthUser } from '../../features/auth/slices/asyncActions';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthUser());
  }, [dispatch]);

  return <>{children}</>;
};
