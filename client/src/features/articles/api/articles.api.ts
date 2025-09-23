import { BASE_API_URL } from '../../../constants/api';
import type { ApiResponse } from '../../../types/api';
import type {
  AllArticlesResponse,
  Article,
  ArticleLikeResponse,
  FetchArticlesRequestParams,
} from '../types/article.types';

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

export const getAllArticles = async (
  params: Partial<FetchArticlesRequestParams>
): Promise<ApiResponse<AllArticlesResponse>> => {
  try {
    let queryString;

    if (params) {
      const searchParams = new URLSearchParams();

      Object.entries(params).filter(([key, value]) => {
        if (!value) return;
        if (Array.isArray(value) && value.length === 0) return;
        if (key === 'sort' && value === 'desc') return;

        searchParams.append(key, String(value));
      });

      queryString = searchParams.toString();
    }

    const res = await fetch(
      `${BASE_API_URL}/article${queryString ? `?${queryString}` : ''}`
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

export const getOneArticle = async (
  slug: string
): Promise<ApiResponse<Article>> => {
  try {
    const res = await fetch(`${BASE_API_URL}/article/${slug}`);

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

export const toggleArticleLike = async (
  slug: string
): Promise<ApiResponse<ArticleLikeResponse>> => {
  try {
    const res = await fetch(`${BASE_API_URL}/article/${slug}/like`, {
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
