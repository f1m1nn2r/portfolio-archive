import { UseContactFilterProps } from "@/types/admin/contact";
import { useState, useMemo } from "react";
import { usePagination } from "@/hooks/common/usePagination";

export function useContactFilter<T extends Record<string, any>>({
  data,
  searchKeys,
  selectionHandlers,
  itemsPerPage = 5,
}: UseContactFilterProps<T> & { itemsPerPage?: number }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;

    const lowerQuery = searchQuery.toLowerCase();

    return data.filter((item) =>
      searchKeys.some((key) => {
        const value = item[key];
        return (
          typeof value === "string" && value.toLowerCase().includes(lowerQuery)
        );
      }),
    );
  }, [data, searchQuery, searchKeys]);

  const { currentData, totalPages, currentPage, setCurrentPage } =
    usePagination(filteredData, { itemsPerPage });

  const filterMenuItems = useMemo(() => {
    const { toggleSelect, toggleSelectAll, clearSelection } = selectionHandlers;

    return [
      { label: "전체 선택", onClick: () => toggleSelectAll() },
      { label: "선택 해제", onClick: () => clearSelection() },
      {
        label: "읽은 메시지 선택",
        onClick: () => {
          clearSelection();
          data
            .filter((e) => e.is_read === true)
            .forEach((e) => toggleSelect(e.id));
        },
      },
      {
        label: "읽지 않은 메시지 선택",
        onClick: () => {
          clearSelection();
          data
            .filter((e) => e.is_read === false)
            .forEach((e) => toggleSelect(e.id));
        },
      },
    ];
  }, [data, selectionHandlers]);

  return {
    searchQuery,
    setSearchQuery,
    filteredData,
    currentData,
    totalPages,
    currentPage,
    setCurrentPage,
    filterMenuItems,
  };
}
