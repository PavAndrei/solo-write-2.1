import type { Status } from '../../../types/api';
import type { AuthUser } from '../types/auth.types';

export interface AuthState {
  user: AuthUser | null | undefined;
  status: Status;
}
