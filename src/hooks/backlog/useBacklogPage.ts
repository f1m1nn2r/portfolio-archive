import { useState, useCallback, useMemo } from "react";
import { useBacklog } from "@/hooks/backlog/useBacklog";
import { useSelectionHandler } from "@/hooks/common/useSelectionHandler";
import { useSummaryData } from "@/hooks/common/useSummaryData";
import { BacklogColumns } from "@/components/admin/backlog/BacklogColumns";
import { useEpics } from "@/hooks/backlog/useEpics";

export function useBacklogPage(adminPassword: string, isMaster?: boolean) {
  const [page, setPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const itemsPerPage = 20;

  const {
    backlogData,
    loading,
    stats,
    addBacklog,
    updateBacklogField,
    deleteBacklogs,
  } = useBacklog(adminPassword);

  const { epics, addEpic, removeEpic } = useEpics();

  const selection = useSelectionHandler({
    data: backlogData,
    getId: (item) => String(item.id),
    onDelete: deleteBacklogs,
  });

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

  const columns = useMemo(
    () => BacklogColumns(updateBacklogField, page, epics, isMaster),
    [updateBacklogField, page, epics, isMaster],
  );

  const totalPages = Math.ceil(backlogData.length / itemsPerPage) || 1;

  const currentData = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return backlogData.slice(start, start + itemsPerPage);
  }, [backlogData, page]);

  const handlers = {
    handlePageChange: setPage,
    openDeleteModal: () => setIsDeleteModalOpen(true),
    closeDeleteModal: () => setIsDeleteModalOpen(false),

    confirmDelete: useCallback(async () => {
      const success = await selection.deleteSelected();
      if (success === true) setIsDeleteModalOpen(false);
    }, [selection]),

    addEpic: (label: string, password: string) => addEpic(label, password),
    removeEpic: (id: string, password: string) => removeEpic(id, password),
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
    updateBacklogField,
  };
}
