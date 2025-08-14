import { BASE_API_URL } from '../../../constants/api';
import type { ApiResponse } from '../../../types/api';
import type { AuthUser } from '../types/auth.types';
import type { AuthFormData } from '../validation/authSchemas';

export const signIn = async (
  formData: AuthFormData
): Promise<ApiResponse<AuthUser>> => {
  try {
    const res = await fetch(`${BASE_API_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
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

export const signUp = async (
  formData: FormData
): Promise<ApiResponse<AuthUser>> => {
  try {
    const res = await fetch(`${BASE_API_URL}/auth/signup`, {
      method: 'POST',
      body: formData as FormData,
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
