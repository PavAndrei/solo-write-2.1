import type { Status } from '../../../types/api';
import type { UserResponseData } from '../types/users.types';

export interface UsersState {
  data: UserResponseData | null | undefined;
  status: Status;
  //   isAuthChecked: boolean;
}
