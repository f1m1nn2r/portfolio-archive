import useSWR from "swr";
import { useCallback } from "react";
import { Project } from "@/types/api/project";
import { getProjects } from "@/services";

export function useProjects(filters?: {
  experienceId?: string;
  year?: string;
}) {
  // SWR 키 설정 (필터 값이 바뀌면 SWR이 자동으로 데이터를 다시 불러옴)
  const swrKey = [
    "/api/projects",
    filters?.experienceId || "all",
    filters?.year || "all",
  ];

  // 현재 필터링된 프로젝트 목록 데이터
  const {
    data: projects,
    isLoading: loading,
    mutate,
  } = useSWR<Project[]>(swrKey, () => getProjects(filters));

  // 전체 프로젝트 데이터 (연도 필터 리스트 추출용)
  // 항상 'all' 필터인 고정 키를 사용하여 전체 데이터를 따로 캐싱합니다.
  const { data: allProjects } = useSWR<Project[]>(
    ["/api/projects", "all", "all"],
    () => getProjects({ experienceId: "all", year: "all" }),
  );

  // 삭제 로직 (기존 로직 유지 + mutate 추가)
  const deleteProject = useCallback(
    async (id: number) => {
      if (!confirm("정말 삭제하시겠습니까?")) return false;

      try {
        const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });

        if (res.ok) {
          alert("삭제되었습니다.");
          // 삭제 후 SWR에게 데이터가 바뀌었음을 알림
          mutate();
          return true;
        }
      } catch (error) {
        console.error("삭제 실패:", error);
        alert("삭제에 실패했습니다.");
      }
      return false;
    },
    [mutate],
  );

  return {
    projects: projects || [],
    allProjects: allProjects || [],
    loading,
    fetchProjects: mutate, // 새로고침이 필요할 때 호출
    deleteProject,
  };
}
