import { useAppSWR } from "../common/useAppSWR";
import { getBacklogs } from "@/services/backlog/client";
import { Backlog, BacklogResponse } from "@/types/admin";
import { useMemo, useCallback } from "react";
import { SWR_MUTATE_OPTIONS } from "@/lib/constants/swr";

export function useBacklog() {
  const { data, isLoading, mutate, createItem, updateItem, deleteManyItems } =
    useAppSWR<BacklogResponse, Partial<Backlog>, Partial<Backlog>>(
      "/api/backlog",
      getBacklogs,
    );

  const backlogData = useMemo(() => data?.items || [], [data]);
  const stats = useMemo(
    () => data?.stats || { total: 0, completed: 0, completionRate: 0 },
    [data],
  );

  // 행 추가
  const addBacklog = useCallback(async () => {
    if (!data) return;
    const newEntry: Partial<Backlog> = {
      screen: "",
      sub_page: "",
      feature: "",
      description: "",
      is_done: false,
      is_designed: false,
      priority: "medium",
      order: backlogData.length,
    };
    await createItem(newEntry);
  }, [data, backlogData.length, createItem]);

  // 필드 업데이트 (낙관적 업데이트 적용)
  const updateBacklogField = useCallback(
    async <K extends keyof Backlog>(
      id: string,
      field: K,
      value: Backlog[K],
    ) => {
      if (!data) return;

      const optimisticData: BacklogResponse = {
        ...data,
        items: backlogData.map((item) =>
          item.id === id ? { ...item, [field]: value } : item,
        ),
      };

      await mutate(async () => {
        await updateItem(id, { [field]: value }, { showToast: false });
        return optimisticData;
      }, SWR_MUTATE_OPTIONS(optimisticData));
    },
    [data, backlogData, mutate, updateItem],
  );

  // 다중 삭제 (낙관적 업데이트 적용)
  const deleteBacklogs = useCallback(
    async (ids: string[]) => {
      if (!data) return;

      const optimisticData: BacklogResponse = {
        ...data,
        items: backlogData.filter((item) => !ids.includes(String(item.id))),
      };

      await mutate(async () => {
        await deleteManyItems(ids);
        return optimisticData;
      }, SWR_MUTATE_OPTIONS(optimisticData));
    },
    [data, backlogData, mutate, deleteManyItems],
  );

  return {
    backlogData,
    loading: isLoading,
    stats,
    addBacklog,
    updateBacklogField,
    deleteBacklogs,
  };
}
