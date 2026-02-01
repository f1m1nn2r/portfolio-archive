import { useState, useCallback, useMemo } from "react";
import { useBacklog } from "@/hooks/backlog/useBacklog";
import { useSelectionHandler } from "@/hooks/common/useSelectionHandler";
import { useSummaryData } from "@/hooks/common/useSummaryData";
import { BacklogColumns } from "@/components/admin/backlog/BacklogColumns";
import { useEpics } from "@/hooks/backlog/useEpics";

export function useBacklogPage(isMaster?: boolean) {
  const [page, setPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [filterType, setFilterType] = useState("latest");
  const itemsPerPage = 20;

  const {
    backlogData,
    loading,
    stats,
    addBacklog,
    updateBacklogField,
    deleteBacklogs,
  } = useBacklog();

  const { epics, addEpic, removeEpic } = useEpics();

  const filteredAndSortedData = useMemo(() => {
    const result = [...backlogData];

    // 기본적으로는 항상 '최신순' 정렬을 유지 (순서가 섞이지 않게)
    result.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );

    switch (filterType) {
      case "uncompleted": // 미구현 항목을 최상단으로 끌어올림
        result.sort((a, b) => {
          if (a.is_done === b.is_done) return 0; // 구현 상태가 같으면 위에서 정한 최신순 유지
          return a.is_done ? 1 : -1; // 미구현(false)이 앞으로(-1), 완료(true)가 뒤로(1)
        });
        break;

      case "screen": // 화면별(Epic 혹은 screen 컬럼) 정렬
        result.sort((a, b) => (a.screen || "").localeCompare(b.screen || ""));
        break;

      default:
        // 기본값은 위에서 이미 최신순으로 정렬했으므로 추가 로직 필요 없음
        break;
    }
    return result;
  }, [backlogData, filterType]);

  const selection = useSelectionHandler({
    data: filteredAndSortedData,
    getId: (item) => String(item.id),
    onDelete: deleteBacklogs,
  });

  const filterLabelMap: Record<string, string> = {
    latest: "기본(최신순)",
    uncompleted: "미구현 우선",
    screen: "화면별",
  };

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

  const totalPages =
    Math.ceil(filteredAndSortedData.length / itemsPerPage) || 1;

  const currentData = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredAndSortedData.slice(start, start + itemsPerPage);
  }, [filteredAndSortedData, page]);

  const handlers = {
    handlePageChange: setPage,
    handleFilterChange: (type: string) => {
      setFilterType(type);
      setPage(1);
    },
    currentFilterLabel: filterLabelMap[filterType],

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
    totalCount: filteredAndSortedData.length,
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
