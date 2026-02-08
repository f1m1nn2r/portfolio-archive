import { useAppSWR } from "../common/useAppSWR";
import { getBacklogs } from "@/services/backlog/client";
import { Backlog, UseBacklogProps } from "@/types/admin";
import { useMemo, useCallback, useState } from "react";
import { SWR_MUTATE_OPTIONS } from "@/lib/constants/swr";
import { BacklogResponse } from "@/types/api/backlog";

export function useBacklog({ initialData, onSuccess }: UseBacklogProps = {}) {
  const [isActionLoading, setIsActionLoading] = useState(false);

  const {
    data,
    isLoading: isFetchLoading,
    mutate,
    createItem,
    updateItem,
    deleteManyItems,
  } = useAppSWR<BacklogResponse, Partial<Backlog>, Partial<Backlog>>(
    "/api/backlog",
    getBacklogs,
    {
      fallbackData: initialData,
      onSuccess: () => onSuccess?.(),
    },
  );

  const backlogData = useMemo(() => data?.items || [], [data]);
  const stats = useMemo(
    () => data?.stats || { total: 0, completed: 0, completionRate: 0 },
    [data],
  );

  const addBacklog = useCallback(async () => {
    if (!data) return;
    try {
      setIsActionLoading(true);
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
    } finally {
      setIsActionLoading(false);
    }
  }, [data, backlogData.length, createItem]);

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

  const deleteBacklogs = useCallback(
    async (ids: string[]) => {
      if (!data || ids.length === 0) return;

      const optimisticData: BacklogResponse = {
        ...data,
        items: backlogData.filter((item) => !ids.includes(String(item.id))),
      };

      try {
        setIsActionLoading(true);
        await mutate(async () => {
          await deleteManyItems(ids);
          return optimisticData;
        }, SWR_MUTATE_OPTIONS(optimisticData));
      } finally {
        setIsActionLoading(false);
      }
    },
    [data, backlogData, mutate, deleteManyItems],
  );

  return {
    backlogData,
    loading: isFetchLoading || isActionLoading,
    stats,
    addBacklog,
    updateBacklogField,
    deleteBacklogs,
  };
}
