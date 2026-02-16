import { PostsResponse } from "../model/post.api";
import { Post } from "../model/post.admin";

export const getPostsApi = async (url: string): Promise<PostsResponse> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("데이터 페치 실패");
  const result = await res.json();

  return {
    success: result.success ?? true,
    posts: result.data || [],
    totalCount: result.totalCount || 0,
    recentCount: result.recentCount || 0,
  };
};

// 단일 조회
export const getPostByIdApi = async (id: string): Promise<Post | null> => {
  const res = await fetch(`/api/posts/${id}`);
  if (!res.ok) return null;
  const result = await res.json();
  return result.data;
};

// 생성
export const createPostApi = async (
  payload: Partial<Post>,
): Promise<Post | null> => {
  const res = await fetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) return null;
  const result = await res.json();
  return result.data;
};

// 수정
export const updatePostApi = async (
  id: string,
  payload: Partial<Post>,
): Promise<boolean> => {
  const res = await fetch(`/api/posts/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.ok;
};

// 단일 삭제 (필요시)
export const deletePostApi = async (id: string): Promise<boolean> => {
  const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
  return res.ok;
};
