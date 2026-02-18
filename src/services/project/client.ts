import { Project } from "@/types/api/project";
import { http } from "@/services/http/client";

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

    const data = await http.get<Project[]>(`/api/projects?${params}`, {
      cache: "no-store",
      unwrapData: true,
    });
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("프로젝트 조회 실패:", error);
    return [];
  }
}

export async function createProjectApi(
  payload: Partial<Project>,
): Promise<Project> {
  return http.post<Project>("/api/projects", {
    body: payload,
    unwrapData: true,
  });
}

export async function updateProjectApi(
  id: number,
  payload: Partial<Project>,
): Promise<Project> {
  return http.patch<Project>(`/api/projects/${id}`, {
    body: payload,
    unwrapData: true,
  });
}

export async function deleteProjectApi(id: number): Promise<void> {
  await http.delete(`/api/projects/${id}`);
}
