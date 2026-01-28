import { useState, useCallback } from "react";

export function useSelectionData<T extends { id: string | number }>(
  initialData: T[],
) {
  const [data, setData] = useState<T[]>(initialData);

  // 상태 토글
  const toggleField = useCallback(
    <K extends keyof T>(id: string | number, field: K) => {
      setData((prev) =>
        prev.map((item) =>
          item.id === String(id)
            ? { ...item, [field]: !item[field] as T[K] }
            : item,
        ),
      );
    },
    [],
  );

  // 항목 삭제
  const deleteItems = useCallback((ids: (string | number)[]) => {
    setData((prev) => prev.filter((item) => !ids.includes(item.id)));
  }, []);

  // 항목 추가
  const addItem = useCallback((item: T) => {
    setData((prev) => [...prev, item]);
  }, []);

  // 항목 수정
  const updateItem = useCallback((id: string | number, updates: Partial<T>) => {
    setData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    );
  }, []);

  return {
    data,
    setData,
    toggleField,
    deleteItems,
    addItem,
    updateItem,
  };
}
