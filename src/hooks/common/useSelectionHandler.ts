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
      try {
        await onDelete(selectedIds);
        clearSelection();
        return true;
      } catch (error) {
        console.error("삭제 중 오류 발생:", error);
        return false;
      }
    }
    return false; // 선택된 게 없거나 onDelete가 없을 때
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
