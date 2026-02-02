import { useState, useMemo } from "react";
import { Backlog } from "@/types/admin";

const FILTER_LABEL_MAP: Record<string, string> = {
  latest: "기본(최신순)",
  uncompleted: "미구현 우선",
  screen: "화면별",
};

export function useBacklogFilter(
  backlogData: Backlog[],
  itemsPerPage: number = 20,
) {
  const [page, setPage] = useState(1);
  const [filterType, setFilterType] = useState("latest");

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

  // 페이지네이션 계산
  const totalPages =
    Math.ceil(filteredAndSortedData.length / itemsPerPage) || 1;

  const currentData = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredAndSortedData.slice(start, start + itemsPerPage);
  }, [filteredAndSortedData, page, itemsPerPage]);

  // 핸들러
  const handleFilterChange = (type: string) => {
    setFilterType(type);
    setPage(1);
  };

  return {
    page,
    setPage,
    filterType,
    currentFilterLabel: FILTER_LABEL_MAP[filterType],
    handleFilterChange,
    filteredData: currentData,
    totalCount: filteredAndSortedData.length,
    totalPages,
  };
}
