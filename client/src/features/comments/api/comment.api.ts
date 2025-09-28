import { BASE_API_URL } from '../../../constants/api';
import type { ApiResponse } from '../../../types/api';
import type {
  Comment,
  CommentList,
  CreateCommentPayload,
  DeletedCommentData,
} from '../types/comment.types';

export const createComment = async (
  payload: CreateCommentPayload
): Promise<ApiResponse<Comment>> => {
  try {
    const res = await fetch(`${BASE_API_URL}/comment/create`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(payload),
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

export const getCommentsByArticle = async (
  id: string
): Promise<ApiResponse<CommentList>> => {
  try {
    if (!id) {
      throw new Error('Id is not provided');
    }

    const res = await fetch(`${BASE_API_URL}/comment/${id}`);
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

export const deleteComment = async (
  id: string
): Promise<ApiResponse<DeletedCommentData>> => {
  try {
    if (!id) {
      throw new Error('Id is not provided');
    }

    const res = await fetch(`${BASE_API_URL}/comment/${id}`, {
      method: 'DELETE',
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
