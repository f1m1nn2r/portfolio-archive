import { UsePaginationOptions } from "@/types/common/ui";
import { useState, useMemo, useEffect } from "react";

export function usePagination<T>(
  data: T[],
  options: UsePaginationOptions = {},
) {
  const { itemsPerPage = 10, initialPage = 1 } = options;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = useMemo(() => {
    return Math.ceil(data.length / itemsPerPage) || 1;
  }, [data.length, itemsPerPage]);

  // 데이터가 변경되어 현재 페이지가 범위를 벗어날 경우 1페이지로 리셋
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    currentData, // 현재 페이지에 해당하는 데이터
    totalItems: data.length,
  };
}
