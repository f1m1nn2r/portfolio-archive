import { UseContactFilterProps } from "@/types/admin/contact";
import { useMemo } from "react";
import { usePagination } from "@/hooks/common/usePagination";
import { useSearchFilter } from "@/hooks/common/useSearchFilter";

export function useContactFilter<T extends Record<string, any>>({
  data,
  searchKeys,
  selectionHandlers,
  itemsPerPage = 5,
}: UseContactFilterProps<T> & { itemsPerPage?: number }) {
  const { searchQuery, setSearchQuery, filteredData } = useSearchFilter(data, {
    searchKeys,
  });

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
