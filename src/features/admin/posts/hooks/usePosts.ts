import { useAppSWR } from "@/hooks/common/useAppSWR";
import { getPostsApi } from "../api/client";
import { useCallback, useMemo, useState } from "react";
import { PostsResponse } from "../model/post.api";
import { MESSAGES } from "@/lib/constants/messages";
import { showToast } from "@/lib/toast";
import { useSearchParams } from "next/navigation";
import { FormattedPost } from "../model/post.admin";
import { useSearchFilter } from "@/hooks/common/useSearchFilter";

type PostFilterType = "category" | "latest" | "oldest";

export const usePosts = () => {
  const searchParams = useSearchParams();
  const categoryFilterId = searchParams.get("categoryId");

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [filterType, setFilterType] = useState<PostFilterType>("latest");

  const apiUrl = categoryFilterId
    ? `/api/posts?categoryId=${categoryFilterId}`
    : "/api/posts";

  const { data, isLoading, error, mutate, deleteManyItems } =
    useAppSWR<PostsResponse>(apiUrl, getPostsApi);

  const posts = useMemo<FormattedPost[]>(() => {
    return (data?.posts || []) as FormattedPost[];
  }, [data?.posts]);

  const { searchQuery, setSearchQuery, filteredData: filteredPosts } =
    useSearchFilter(posts, { searchKeys: ["title"] });

  const sortedFilteredPosts = useMemo(() => {
    const next = [...filteredPosts];

    if (filterType === "oldest") {
      return next.sort((a, b) => b.no - a.no);
    }

    if (filterType === "category") {
      return next.sort((a, b) => {
        const categoryOrder = a.category.localeCompare(b.category, "ko");
        if (categoryOrder !== 0) return categoryOrder;

        return a.no - b.no;
      });
    }

    return next.sort((a, b) => a.no - b.no);
  }, [filteredPosts, filterType]);

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
    posts: sortedFilteredPosts,
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
    filterType,

    setSearchQuery,
    setIsDeleteModalOpen,
    setFilterType,
    handleToggleSelect,
    handleToggleSelectAll,
    handleConfirmDelete,
    openDeleteModal,
    mutate,
  };
};
