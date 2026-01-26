import { useState, useCallback } from "react";

interface UseSelectionHandlerProps<T, ID extends string | number> {
  data: T[];
  getId: (item: T) => ID;
  onDelete?: (ids: ID[]) => void | Promise<void>; // Promise 대응 추가
}

export function useSelectionHandler<T, ID extends string | number>({
  data,
  getId,
  onDelete,
}: UseSelectionHandlerProps<T, ID>) {
  const [selectedIds, setSelectedIds] = useState<ID[]>([]);

  const toggleSelect = useCallback((id: ID) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id],
    );
  }, []);

  const toggleSelectAll = useCallback(() => {
    setSelectedIds((prev) =>
      prev.length === data.length ? [] : data.map(getId),
    );
  }, [data, getId]);

  const clearSelection = useCallback(() => {
    setSelectedIds([]);
  }, []);

  const deleteSelected = useCallback(async () => {
    if (onDelete && selectedIds.length > 0) {
      await onDelete(selectedIds); // 삭제 로직 실행
      clearSelection(); // 선택 비우기
    }
  }, [selectedIds, onDelete, clearSelection]);

  return {
    selectedIds,
    toggleSelect,
    toggleSelectAll,
    clearSelection,
    deleteSelected,
    selectionCount: selectedIds.length,
    isAllSelected: selectedIds.length === data.length && data.length > 0,
  };
}
