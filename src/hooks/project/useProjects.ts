import useSWR from "swr";
import { useCallback } from "react";
import { Project, UseProjectsOptions } from "@/types/api/project";
import { getProjects } from "@/services/project/client";
import { showToast } from "@/utils/toast";

export function useProjects(options?: UseProjectsOptions) {
  const swrKey = [
    "/api/projects",
    options?.experienceId || "all",
    options?.year || "all",
  ];

  const {
    data: projects,
    isLoading: loading,
    mutate,
  } = useSWR<Project[]>(swrKey, () => getProjects(options), {
    // options로 들어온 fallbackData를 SWR 설정에 주입
    fallbackData: options?.fallbackData,
  });

  const { data: allProjects } = useSWR<Project[]>(
    ["/api/projects", "all", "all"],
    () => getProjects({ experienceId: "all", year: "all" }),
    {
      // 전체 데이터 캐시에도 초기값이 있다면 넣어줌
      fallbackData: options?.fallbackData,
    },
  );

  const deleteProject = useCallback(
    async (id: number) => {
      try {
        const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
        if (res.ok) {
          showToast.success("프로젝트가 삭제되었습니다.");
          mutate();
          return true;
        }
      } catch (error) {
        showToast.error("삭제에 실패했습니다.");
        console.error(error);
      }
      return false;
    },
    [mutate],
  );

  return {
    projects: projects || [],
    allProjects: allProjects || [],
    loading,
    fetchProjects: mutate,
    deleteProject,
  };
}
