import {
  CreateExperienceDto,
  Experience,
  UpdateExperienceDto,
} from "@/types/api/experience";
import { http } from "@/services/http/client";

export async function getExperiences(): Promise<Experience[]> {
  try {
    return await http.get<Experience[]>("/api/experience", {
      cache: "no-store",
      unwrapData: true,
    });
  } catch (error) {
    console.error("경력 정보 조회 실패:", error);
    return [];
  }
}

export async function createExperienceApi(
  data: CreateExperienceDto,
): Promise<Experience> {
  return http.post<Experience>("/api/experience", {
    body: data,
    unwrapData: true,
  });
}

export async function updateExperienceApi(
  id: number,
  data: UpdateExperienceDto,
): Promise<Experience> {
  return http.patch<Experience>(`/api/experience/${id}`, {
    body: data,
    unwrapData: true,
  });
}

export async function deleteExperienceApi(id: number): Promise<void> {
  await http.delete(`/api/experience/${id}`);
}
