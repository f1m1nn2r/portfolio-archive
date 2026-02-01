import { Project } from "@/types/api/project";
import { API_BASE_URL } from "@/services";

export async function getProjects(filters?: {
  experienceId?: string;
  year?: string;
}): Promise<Project[]> {
  try {
    const params = new URLSearchParams();

    if (filters?.experienceId && filters.experienceId !== "all")
      params.set("experience_id", filters.experienceId);
    if (filters?.year && filters.year !== "all")
      params.set("year", filters.year);

    const res = await fetch(`${API_BASE_URL}/api/projects?${params}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`프로젝트 로드 실패: ${res.status}`);

    const json = await res.json();
    return json.success && Array.isArray(json.data) ? json.data : [];
  } catch (error) {
    console.error("프로젝트 조회 실패:", error);
    return [];
  }
}
