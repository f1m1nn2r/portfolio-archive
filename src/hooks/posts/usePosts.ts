import { useAppSWR } from "@/hooks/common/useAppSWR";
import { getPostsApi } from "@/services/post/client";
import { useCallback, useMemo, useState } from "react";
import { PostsResponse } from "@/types/api/post";
import { MESSAGES } from "@/lib/constants/messages";
import { showToast } from "@/lib/toast";
import { useSearchParams } from "next/navigation";
import { FormattedPost } from "@/types/admin";

export const usePosts = () => {
  const searchParams = useSearchParams();
  const categoryFilterId = searchParams.get("categoryId");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const apiUrl = categoryFilterId
    ? `/api/posts?categoryId=${categoryFilterId}`
    : "/api/posts";

  const { data, isLoading, error, mutate, deleteManyItems } =
    useAppSWR<PostsResponse>(apiUrl, getPostsApi);

  const posts = useMemo<FormattedPost[]>(() => {
    return (data?.posts || []) as FormattedPost[];
  }, [data?.posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post: any) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [posts, searchQuery]);

  const handleConfirmDelete = async () => {
    const success = await deleteManyItems(selectedIds, "/api/posts");

    if (success) {
      setSelectedIds([]);
      setIsDeleteModalOpen(false);
    }
  };

  const openDeleteModal = useCallback(() => {
    if (selectedIds.length === 0) {
      showToast.error(MESSAGES.VALIDATION.SELECT_REQUIRED);
      return;
    }
    setIsDeleteModalOpen(true);
  }, [selectedIds]);

  const handleToggleSelect = (id: string | number) => {
    const targetId = String(id);
    setSelectedIds((prev) =>
      prev.includes(targetId)
        ? prev.filter((i) => i !== targetId)
        : [...prev, targetId],
    );
  };

  const handleToggleSelectAll = () => {
    const allIds = filteredPosts.map((p) => String(p.id));
    setSelectedIds((prev) => (prev.length === allIds.length ? [] : allIds));
  };

  return {
    posts: filteredPosts,
    summary: {
      total: data?.totalCount || 0,
      recent: data?.recentCount || 0,
    },
    loading: isLoading,
    error,
    setSelectedIds,
    searchQuery,
    selectedIds,
    isDeleteModalOpen,

    setSearchQuery,
    setIsDeleteModalOpen,
    handleToggleSelect,
    handleToggleSelectAll,
    handleConfirmDelete,
    openDeleteModal,
    mutate,
  };
};
