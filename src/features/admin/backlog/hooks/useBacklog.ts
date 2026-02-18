import { useAppSWR } from "@/hooks/common/useAppSWR";
import {
  createBacklogApi,
  deleteBacklogsApi,
  getBacklogs,
  updateBacklogApi,
} from "../api/client";
import { Backlog, UseBacklogProps } from "../model/backlog.admin";
import { useMemo, useCallback, useState } from "react";
import { SWR_MUTATE_OPTIONS } from "@/lib/constants/swr";
import { BacklogResponse } from "../model/backlog.api";
import { showToast } from "@/lib/toast";

export function useBacklog({ initialData, onSuccess }: UseBacklogProps = {}) {
  const [isActionLoading, setIsActionLoading] = useState(false);

  const { data, isLoading: isFetchLoading, mutate } = useAppSWR<BacklogResponse>(
    "/api/backlog",
    getBacklogs,
    {
      fallbackData: initialData,
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

      await createBacklogApi(newEntry);
      await mutate();
      onSuccess?.();
      showToast.save("add");
    } finally {
      setIsActionLoading(false);
    }
  }, [data, backlogData.length, mutate, onSuccess]);

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
        await updateBacklogApi(id, { [field]: value });
        onSuccess?.();
        return optimisticData;
      }, SWR_MUTATE_OPTIONS(optimisticData));
    },
    [data, backlogData, mutate, onSuccess],
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
          await deleteBacklogsApi(ids);
          onSuccess?.();
          return optimisticData;
        }, SWR_MUTATE_OPTIONS(optimisticData));
        showToast.delete();
      } finally {
        setIsActionLoading(false);
      }
    },
    [data, backlogData, mutate, onSuccess],
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
