import { BASE_API_URL } from '../../../constants/api';
import type { ApiResponse } from '../../../types/api';
import type {
  FetchUsersRequestParams,
  User,
  UserResponseData,
} from '../types/users.types';

export const getAllUsers = async (
  params: FetchUsersRequestParams
): Promise<ApiResponse<UserResponseData>> => {
  try {
    let queryString;

    if (params) {
      const searchParams = new URLSearchParams();

      Object.entries(params).forEach(([key, value]) => {
        if (value === '' || value === undefined || value === null) {
          return;
        }

        if (typeof value === 'boolean') {
          searchParams.append(key, value.toString());
          return;
        }

        searchParams.append(key, String(value));
      });

      queryString = searchParams.toString();
    }

    const res = await fetch(
      `${BASE_API_URL}/user${queryString ? `?${queryString}` : ''}`,
      {
        credentials: 'include',
      }
    );

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : 'Network error occured';
    console.error(errorMessage);
    return { success: false, message: errorMessage };
  }
};

export const deleteUserById = async (
  id: string
): Promise<ApiResponse<User>> => {
  try {
    const res = await fetch(`${BASE_API_URL}/user/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    const data = await res.json();

    return data;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : 'Network error occured';
    console.error(errorMessage);
    return { success: false, message: errorMessage };
  }
};
