import { BASE_API_URL } from '../../../constants/api';
import type { ApiResponse } from '../../../types/api';
import type {
  AuthUser,
  GoogleAuthPayload,
  SignInFormData,
} from '../types/auth.types';

export const signIn = async (
  formData: SignInFormData
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

    const data = (await res.json()) as ApiResponse<AuthUser>;

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
      body: formData,
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

export const getMe = async (): Promise<ApiResponse<AuthUser>> => {
  try {
    const res = await fetch(`${BASE_API_URL}/auth/me`, {
      credentials: 'include',
    });

    const data = await res.json();

    if (!data.success) {
      console.log(data.message);
    }

    return data;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : 'Network error occured';
    console.error(errorMessage);
    return { success: false, message: errorMessage };
  }
};

export const signOut = async (): Promise<ApiResponse<null>> => {
  try {
    const res = await fetch(`${BASE_API_URL}/auth/signout`, {
      method: 'POST',
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

export const getGoogleUserCredentials = async (token: string) => {
  try {
    const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!data) {
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

export const googleAuth = async (
  payload: GoogleAuthPayload
): Promise<ApiResponse<AuthUser>> => {
  try {
    const res = await fetch(`${BASE_API_URL}/auth/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ payload }),
    });

    const data = (await res.json()) as ApiResponse<AuthUser>;

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
