import useSWR from "swr";
import { getPostsApi } from "@/services/post/client";
import { useState, useMemo } from "react";
import { FormattedPost } from "@/types/admin";

export const usePosts = () => {
  // SWR 호출
  const { data, error, isLoading, mutate } = useSWR(
    "/api/writing",
    getPostsApi,
  );

  // 가공된 데이터 생성
  const formattedPosts = useMemo<FormattedPost[]>(() => {
    if (!data?.posts) return [];

    return data.posts.map((post: any, index: number) => {
      const categoryData = post.category;
      return {
        id: post.id,
        no: index + 1,
        title: post.title,
        category: categoryData?.parent
          ? `${categoryData.parent.name} > ${categoryData.name}`
          : categoryData?.name || "미지정",
        date: new Date(post.created_at).toLocaleDateString(),
      };
    });
  }, [data?.posts]);

  return {
    posts: formattedPosts,
    summary: {
      total: data?.totalCount || 0,
      recent: data?.recentCount || 0,
    },
    loading: isLoading,
    error,
    mutate, // 데이터 새로고침이 필요할 때 사용 (삭제 후 등)
  };
};
