import { useState, useCallback } from "react";

interface UseSelectionHandlerProps<T> {
  data: T[];
  getId: (item: T) => string | number;
  onDelete?: (ids: (string | number)[]) => void;
}

export function useSelectionHandler<T>({
  data,
  getId,
  onDelete,
}: UseSelectionHandlerProps<T>) {
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]); // ⭐ 수정

  // 개별 선택 토글
  const toggleSelect = useCallback((id: string | number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id],
    );
  }, []);

  // 전체 선택/해제
  const toggleSelectAll = useCallback(() => {
    setSelectedIds((prev) =>
      prev.length === data.length ? [] : data.map(getId),
    );
  }, [data, getId]);

  // 선택 초기화
  const clearSelection = useCallback(() => {
    setSelectedIds([]);
  }, []);

  // 선택 항목 삭제
  const deleteSelected = useCallback(() => {
    if (onDelete) {
      onDelete(selectedIds);
      clearSelection();
    }
  }, [selectedIds, onDelete, clearSelection]);

  return {
    selectedIds,
    toggleSelect,
    toggleSelectAll,
    clearSelection,
    deleteSelected,
    hasSelection: selectedIds.length > 0,
    selectionCount: selectedIds.length,
    isAllSelected: selectedIds.length === data.length && data.length > 0,
  };
}
