import { BASE_API_URL } from '../../../constants/api';
import type { ApiResponse } from '../../../types/api';
import type {
  FetchUsersRequestParams,
  UserResponseData,
} from '../types/users.types';

export const getAllUsers = async (
  params: FetchUsersRequestParams
): Promise<ApiResponse<UserResponseData>> => {
  try {
    console.log(params);

    // const {
    //   email,
    //   hasAvatar,
    //   limit,
    //   sort,
    //   startIndex,
    //   username,
    //   verified,
    //   role,
    // } = params;

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

    const queryString = searchParams.toString();
    console.log(queryString);

    const res = await fetch(`${BASE_API_URL}/user?${queryString}`, {
      credentials: 'include',
    });

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
