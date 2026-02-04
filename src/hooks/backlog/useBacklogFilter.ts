import { useState, useMemo } from "react";
import { usePagination } from "@/hooks/common/usePagination";
import { Backlog } from "@/types/admin";
import { MESSAGES } from "@/lib/constants/messages";

const FILTER_LABEL_MAP: Record<string, string> = {
  latest: MESSAGES.BACKLOG.FILTERS.LATEST,
  uncompleted: MESSAGES.BACKLOG.FILTERS.UNCOMPLETED,
  screen: MESSAGES.BACKLOG.FILTERS.SCREEN,
};

export function useBacklogFilter(
  backlogData: Backlog[],
  itemsPerPage: number = 20,
) {
  const [filterType, setFilterType] = useState("latest");

  const filterOptions = useMemo(
    () => [
      { key: "latest", label: MESSAGES.BACKLOG.FILTERS.LATEST },
      { key: "uncompleted", label: MESSAGES.BACKLOG.FILTERS.UNCOMPLETED },
      { key: "screen", label: MESSAGES.BACKLOG.FILTERS.SCREEN },
    ],
    [],
  );

  // 전체 데이터 정렬 및 필터링
  const filteredAndSortedData = useMemo(() => {
    const result = [...backlogData];

    // 최신순 기본 정렬
    result.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );

    if (filterType === "uncompleted") {
      result.sort((a, b) => (a.is_done === b.is_done ? 0 : a.is_done ? 1 : -1));
    } else if (filterType === "screen") {
      result.sort((a, b) => (a.screen || "").localeCompare(b.screen || ""));
    }

    return result;
  }, [backlogData, filterType]);

  // 페이지네이션 로직 위임
  const { currentPage, setCurrentPage, totalPages, currentData, totalItems } =
    usePagination(filteredAndSortedData, { itemsPerPage });

  // 핸들러
  const handleFilterChange = (type: string) => {
    setFilterType(type);
    setCurrentPage(1);
  };

  return {
    page: currentPage,
    setPage: setCurrentPage,
    totalPages,
    totalCount: totalItems,
    filteredData: currentData,
    filterType,
    currentFilterLabel: FILTER_LABEL_MAP[filterType],
    handleFilterChange,
    filterOptions,
  };
}
