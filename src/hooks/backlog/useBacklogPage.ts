import { useState, useCallback, useMemo } from "react";
import { useBacklog } from "@/hooks/backlog/useBacklog";
import { useSelectionHandler } from "@/hooks/common/useSelectionHandler";
import { useSummaryData } from "@/hooks/common/useSummaryData";
import { BacklogColumns } from "@/components/admin/backlog/BacklogColumns";
import { useEpics } from "@/hooks/backlog/useEpics";

export function useBacklogPage() {
  const [page, setPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const itemsPerPage = 20; // 페이지당 보여줄 개수

  // 1. 기본 데이터 훅 호출
  const {
    backlogData,
    loading,
    stats,
    addBacklog,
    updateBacklogField,
    deleteBacklogs,
  } = useBacklog();

  const { epics, addEpic, removeEpic } = useEpics();

  // 2. 선택 핸들러 로직
  const selection = useSelectionHandler({
    data: backlogData,
    getId: (item) => String(item.id),
    onDelete: async (ids) => {
      await deleteBacklogs(ids);
    },
  });

  // 3. 요약 데이터 로직
  const summaryItems = useSummaryData([
    {
      icon: "barChartAlt2",
      bgColor: "bg-bg-purple",
      label: "총 백로그 개수",
      getValue: () => `${stats.total}개`,
    },
    {
      icon: "listUl",
      bgColor: "bg-bg-blue",
      label: "구현 완료 상태",
      getValue: () => `${stats.completionRate}%`,
    },
    {
      icon: "x",
      bgColor: "bg-[#F3FDEE]",
      label: "미구현 작업",
      getValue: () => {
        const pendingCount = backlogData.filter((item) => !item.is_done).length;
        return `${pendingCount}개`;
      },
    },
  ]);

  // 4. 테이블 컬럼 정의
  const columns = useMemo(
    () => BacklogColumns(updateBacklogField, page, epics),
    [updateBacklogField, epics, page],
  );

  // 5. 페이지네이션 계산 로직
  const totalPages = Math.ceil(backlogData.length / itemsPerPage) || 1;

  const currentData = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return backlogData.slice(start, start + itemsPerPage);
  }, [backlogData, page]);

  // 6. 핸들러 모음
  const handlers = {
    handlePageChange: setPage,
    openDeleteModal: () => setIsDeleteModalOpen(true),
    closeDeleteModal: () => setIsDeleteModalOpen(false),
    confirmDelete: useCallback(async () => {
      const success = await selection.deleteSelected();
      if (success === true) setIsDeleteModalOpen(false);
    }, [selection]),
    addEpic: (label: string) => addEpic(label),
    removeEpic: (id: string) => removeEpic(id),
  };

  return {
    backlogData: currentData,
    totalCount: backlogData.length,
    loading,
    page,
    totalPages,
    columns,
    summaryItems,
    selection,
    deleteModal: {
      isOpen: isDeleteModalOpen,
    },
    epics,
    handlers,
    addBacklog,
  };
}
