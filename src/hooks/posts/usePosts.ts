import { useAppSWR } from "@/hooks/common/useAppSWR";
import { getPostsApi } from "@/services/post/client";
import { useCallback, useMemo, useState } from "react";
import { FormattedPost } from "@/types/admin";
import { PostsResponse } from "@/types/api/post";
import { MESSAGES } from "@/lib/constants/messages";
import { showToast } from "@/lib/toast";

export const usePosts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // SWR 호출
  const { data, isLoading, error, mutate, deleteManyItems } =
    useAppSWR<PostsResponse>("/api/writing", getPostsApi);

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

  // 검색 필터링 로직 (가공된 데이터를 기준으로 필터링)
  const filteredPosts = useMemo(() => {
    return formattedPosts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [formattedPosts, searchQuery]);

  // 삭제 로직
  const handleConfirmDelete = async () => {
    const success = await deleteManyItems(selectedIds);
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

  // 선택 로직
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
