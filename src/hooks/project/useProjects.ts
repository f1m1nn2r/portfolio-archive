import { useCallback } from "react";
import { Project, UseProjectsOptions } from "@/types/api/project";
import {
  createProjectApi,
  deleteProjectApi,
  getProjects,
  updateProjectApi,
} from "@/services/project/client";
import { useAppSWR } from "@/hooks/common/useAppSWR";
import { showToast } from "@/lib/toast";

export function useProjects(options?: UseProjectsOptions) {
  // SWR용 키 (필터링/베이스 키 분리)
  const filterKey = `/api/projects?experienceId=${options?.experienceId || "all"}&year=${options?.year || "all"}`;
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
      try {
        if (mode === "edit" && id) {
          await updateProjectApi(id, data);
        } else {
          await createProjectApi(data);
        }
        mutateFilter();
        mutateAll();
        showToast.save(mode === "edit" ? "edit" : "add");
        return true;
      } catch (error) {
        showToast.error(error instanceof Error ? error.message : "저장에 실패했습니다.");
        return false;
      }
    },
    [mutateFilter, mutateAll],
  );

  const handleDeleteProject = useCallback(
    async (id: number) => {
      try {
        await deleteProjectApi(id);
        mutateFilter();
        mutateAll();
        showToast.delete();
        return true;
      } catch (error) {
        showToast.error(error instanceof Error ? error.message : "삭제에 실패했습니다.");
        return false;
      }
    },
    [mutateFilter, mutateAll],
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
