import useSWR from "swr";
import { useCallback } from "react";
import { Project, UseProjectsOptions } from "@/types/api/project";
import { getProjects } from "@/services/project/client";
import { showToast } from "@/lib/toast";

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
    fallbackData: options?.fallbackData,
  });

  const { data: allProjects, mutate: mutateAll } = useSWR<Project[]>(
    ["/api/projects", "all", "all"],
    () => getProjects({ experienceId: "all", year: "all" }),
    {
      fallbackData: options?.fallbackData,
    },
  );

  const saveProject = useCallback(
    async (mode: "add" | "edit", data: Project) => {
      const url =
        mode === "edit" ? `/api/projects/${data.id}` : "/api/projects";
      const method = mode === "edit" ? "PATCH" : "POST";

      try {
        const res = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!res.ok) {
          const errorResult = await res.json();
          throw new Error(errorResult.error || "저장에 실패했습니다.");
        }

        showToast.save(mode);
        await mutate();
        await mutateAll();
        return true;
      } catch (error) {
        console.error("Project save error:", error);
        showToast.error((error as Error).message);
        return false;
      }
    },
    [mutate, mutateAll],
  );

  const deleteProject = useCallback(
    async (id: number) => {
      try {
        const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("삭제에 실패했습니다.");

        showToast.delete();
        await mutate();
        await mutateAll();
        return true;
      } catch (error) {
        showToast.error((error as Error).message);
        console.error(error);
        return false;
      }
    },
    [mutate, mutateAll],
  );

  return {
    projects: projects || [],
    allProjects: allProjects || [],
    loading,
    fetchProjects: mutate,
    saveProject,
    deleteProject,
  };
}
