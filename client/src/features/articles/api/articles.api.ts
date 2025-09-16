import { BASE_API_URL } from '../../../constants/api';
import type { ApiResponse } from '../../../types/api';
import type { AllArticlesResponse, Article } from '../types/article.types';

export const createArticle = async (
  formData: FormData
): Promise<ApiResponse<Article>> => {
  try {
    const res = await fetch(`${BASE_API_URL}/article/create`, {
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

export const getAllArticles = async (): Promise<
  ApiResponse<AllArticlesResponse>
> => {
  try {
    const res = await fetch(`${BASE_API_URL}/article`);

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
