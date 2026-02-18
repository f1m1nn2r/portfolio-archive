import { PostsResponse } from "../model/post.api";
import { FormattedPost, Post } from "../model/post.admin";
import { http } from "@/services/http/client";

export const getPostsApi = async (url: string): Promise<PostsResponse> => {
  const result = await http.get<{
    success?: boolean;
    data?: FormattedPost[];
    totalCount?: number;
    recentCount?: number;
  }>(url);

  return {
    success: result.success ?? true,
    posts: result.data || [],
    totalCount: result.totalCount || 0,
    recentCount: result.recentCount || 0,
  };
};

// 단일 조회
export const getPostByIdApi = async (id: string): Promise<Post | null> => {
  try {
    return await http.get<Post>(`/api/posts/${id}`, { unwrapData: true });
  } catch {
    return null;
  }
};

// 생성
export const createPostApi = async (
  payload: Partial<Post>,
): Promise<Post | null> => {
  try {
    return await http.post<Post>("/api/posts", {
      body: payload,
      unwrapData: true,
    });
  } catch {
    return null;
  }
};

// 수정
export const updatePostApi = async (
  id: string,
  payload: Partial<Post>,
): Promise<boolean> => {
  try {
    await http.patch(`/api/posts/${id}`, {
      body: payload,
    });
    return true;
  } catch {
    return false;
  }
};

// 단일 삭제 (필요시)
export const deletePostApi = async (id: string): Promise<boolean> => {
  try {
    await http.delete(`/api/posts/${id}`);
    return true;
  } catch {
    return false;
  }
};

export const deleteManyPostsApi = async (ids: string[]): Promise<boolean> => {
  try {
    await http.delete("/api/posts", {
      body: { ids },
    });
    return true;
  } catch {
    return false;
  }
};
