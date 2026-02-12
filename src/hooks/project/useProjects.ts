import { useCallback } from "react";
import { Project, UseProjectsOptions } from "@/types/api/project";
import { getProjects } from "@/services/project/client";
import { useAppSWR } from "@/hooks/common/useAppSWR";

export function useProjects(options?: UseProjectsOptions) {
  // SWR용 키 (필터링/베이스 키 분리)
  const filterKey = `/api/projects?experienceId=${options?.experienceId || "all"}&year=${options?.year || "all"}`;
  const baseKey = "/api/projects";

  const {
    data: projects,
    isLoading: isProjectsLoading,
    isValidating: isProjectsValidating,
    mutate: mutateFilter,
  } = useAppSWR<Project[]>(
    filterKey,
    () => getProjects(options),
    {
      fallbackData: options?.fallbackData,
      keepPreviousData: true,
    },
  );

  const { saveItem, deleteItem } = useAppSWR<Project[]>(baseKey, () =>
    getProjects({ experienceId: "all", year: "all" }),
  );

  // 전체 데이터 관리 (요약 정보 및 필터링 옵션 추출용)
  const {
    data: allProjects,
    isLoading: isAllProjectsLoading,
    mutate: mutateAll,
  } = useAppSWR<Project[]>(
    "/api/projects",
    () => getProjects({ experienceId: "all", year: "all" }),
    { fallbackData: options?.fallbackData },
  );

  const saveProject = useCallback(
    async (mode: "add" | "edit", id: number | undefined, data: any) => {
      const result = await saveItem(id, data);
      if (result) {
        mutateFilter();
        return true;
      }
      return false;
    },
    [saveItem, mutateFilter],
  );

  const handleDeleteProject = useCallback(
    async (id: number) => {
      const success = await deleteItem(id);
      if (success) {
        mutateFilter();
        mutateAll();
      }
      return success;
    },
    [deleteItem, mutateFilter, mutateAll],
  );

  return {
    projects: projects || [],
    allProjects: allProjects || [],
    loading:
      isProjectsLoading ||
      isAllProjectsLoading ||
      (isProjectsValidating && typeof projects === "undefined"),
    saveProject,
    deleteProject: handleDeleteProject,
  };
}
