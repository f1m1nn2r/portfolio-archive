import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAppSWR } from "@/hooks/common/useAppSWR";
import { deleteManyPostsApi, getPostsApi } from "../api/client";
import { PostsResponse } from "../model/post.api";
import { FormattedPost } from "../model/post.admin";
import { showToast } from "@/lib/toast";

export type EtcPost = FormattedPost & { content: string };

export function useEtcPosts() {
  const searchParams = useSearchParams();
  const categoryFilterId = searchParams.get("categoryId");

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const apiUrl = categoryFilterId
    ? `/api/posts?categoryId=${categoryFilterId}`
    : "/api/posts";

  const { data, isLoading, error, mutate } = useAppSWR<PostsResponse>(
    apiUrl,
    getPostsApi,
  );

  const posts = useMemo<EtcPost[]>(
    () => ((data?.posts || []) as EtcPost[]),
    [data?.posts],
  );

  const handleConfirmDelete = async () => {
    const success = await deleteManyPostsApi(selectedIds);

    if (success) {
      mutate();
      setSelectedIds([]);
      setIsDeleteModalOpen(false);
      showToast.delete();
    }
  };

  return {
    posts,
    loading: isLoading,
    error,
    selectedIds,
    setSelectedIds,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleConfirmDelete,
  };
}
