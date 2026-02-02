import useSWR from "swr";
import { useCallback, useMemo } from "react";
import {
  getBacklogs,
  deleteBacklogsApi,
  createBacklogApi,
  updateBacklogApi,
} from "@/services/backlog/client";
import { showToast } from "@/utils/toast";
import { Backlog, BacklogResponse } from "@/types/admin";

export function useBacklog() {
  const { data, isLoading, mutate } = useSWR<BacklogResponse>(
    "/api/backlog",
    getBacklogs,
  );

  const backlogData = useMemo(() => data?.items || [], [data]);
  const stats = useMemo(
    () => data?.stats || { total: 0, completed: 0, completionRate: 0 },
    [data],
  );

  // 공통 mutate 옵션 설정
  const mutateOptions = (optimisticData: BacklogResponse) => ({
    optimisticData,
    rollbackOnError: true,
    revalidate: true,
  });

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

    const optimisticData: BacklogResponse = {
      ...data,
      items: [
        ...backlogData,
        { ...newEntry, id: `temp-${Date.now()}` } as Backlog,
      ],
    };

    try {
      await mutate(async () => {
        await createBacklogApi(newEntry);
        return getBacklogs();
      }, mutateOptions(optimisticData));
    } catch (error) {
      showToast.error("추가 중 오류가 발생했습니다.");
    }
  }, [data, backlogData, mutate]);

  // 필드 업데이트
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

      try {
        await mutate(async () => {
          await updateBacklogApi(id, { [field]: value });
          return getBacklogs();
        }, mutateOptions(optimisticData));
      } catch (error) {
        showToast.error("수정에 실패하였습니다.");
      }
    },
    [data, backlogData, mutate],
  );

  // 삭제
  const deleteBacklogs = useCallback(
    async (ids: string[]) => {
      if (!data) return;

      const optimisticData: BacklogResponse = {
        ...data,
        items: backlogData.filter((item) => !ids.includes(String(item.id))),
      };

      try {
        await mutate(async () => {
          await deleteBacklogsApi(ids);
          return getBacklogs();
        }, mutateOptions(optimisticData));
        showToast.success("삭제되었습니다.");
      } catch (error) {
        showToast.error("삭제에 실패하였습니다.");
      }
    },
    [data, backlogData, mutate],
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
