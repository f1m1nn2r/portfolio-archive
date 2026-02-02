import { useMemo, useState } from "react";
import { deleteWritingApi } from "@/services/post/client";
import { showToast } from "@/utils/toast";
import { FormattedPost } from "@/types/admin";

export const usePostManagement = (
  posts: FormattedPost[],
  mutate: () => void,
) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
    const allIds = posts.map((p) => String(p.id));
    setSelectedIds((prev) => (prev.length === allIds.length ? [] : allIds));
  };

  // 삭제 실행 로직
  const handleConfirmDelete = async () => {
    try {
      await Promise.all(selectedIds.map((id) => deleteWritingApi(id)));
      showToast.success("삭제되었습니다.");
      mutate(); // SWR 데이터 갱신
    } catch (err) {
      showToast.error("삭제 중 오류가 발생했습니다.");
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const openDeleteModal = () => {
    if (selectedIds.length === 0) {
      showToast.error("삭제할 항목을 선택해주세요.");
      return;
    }
    setIsDeleteModalOpen(true);
  };

  // 검색 필터링 로직
  const filteredPosts = useMemo(() => {
    return posts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [posts, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    selectedIds,
    handleToggleSelect,
    handleToggleSelectAll,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleConfirmDelete,
    openDeleteModal,
    filteredPosts,
  };
};
