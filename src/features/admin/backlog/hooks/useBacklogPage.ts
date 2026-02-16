import { useCallback, useMemo } from "react";
import { useBacklog } from "./useBacklog";
import { useSelectionHandler } from "@/hooks/common/useSelectionHandler";
import { useSummaryData } from "@/hooks/common/useSummaryData";
import { BacklogColumns } from "../ui/BacklogColumns";
import { useEpics } from "./useEpics";
import { useBacklogFilter } from "./useBacklogFilter";
import { Backlog } from "../model/backlog.admin";
import { useModal } from "@/hooks/common/useModal";

export function useBacklogPage(isMaster?: boolean) {
  // 데이터 및 기본 상태 관리 훅
  const {
    backlogData,
    loading,
    stats,
    addBacklog,
    updateBacklogField,
    deleteBacklogs,
  } = useBacklog();

  const { epics } = useEpics();
  const deleteModal = useModal();

  // 필터 및 페이지네이션 로직 위임
  const filter = useBacklogFilter(backlogData, 20);

  // 요약 데이터 계산
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

  // 테이블 컬럼 정의
  const columns = useMemo(
    () => BacklogColumns(updateBacklogField, filter.page, epics, isMaster),
    [updateBacklogField, filter.page, epics, isMaster],
  );

  // 선택 핸들러
  const selection = useSelectionHandler({
    data: filter.filteredData,
    getId: (item: Backlog) => String(item.id),
    onDelete: deleteBacklogs,
  });

  // UI 핸들러 모음
  const handlers = {
    handlePageChange: filter.setPage,
    handleFilterChange: filter.handleFilterChange,
    currentFilterLabel: filter.currentFilterLabel,
    filterOptions: filter.filterOptions,

    openDeleteModal: deleteModal.open,
    closeDeleteModal: deleteModal.close,

    confirmDelete: useCallback(async () => {
      const success = await selection.deleteSelected();
      if (success === true) deleteModal.close();
    }, [selection]),
  };

  return {
    backlogData: filter.filteredData,
    totalCount: filter.totalCount,
    loading,
    page: filter.page,
    totalPages: filter.totalPages,
    columns,
    summaryItems,
    selection,
    deleteModal: {
      isOpen: deleteModal.isOpen,
    },
    epics,
    handlers,
    addBacklog,
    updateBacklogField,
  };
}
