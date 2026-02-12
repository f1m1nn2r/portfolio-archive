import { TABLES } from "@/lib/constants/tables";
import { createClient } from "@/lib/supabase/server";
import { Project } from "@/types/api/project";

interface ProjectFilters {
  experienceId?: string;
  year?: string;
}

export async function getProjectsFromDb(
  filters?: ProjectFilters,
): Promise<Project[]> {
  const supabase = await createClient();

  let query = supabase
    .from(TABLES.PROJECTS)
    .select("*")
    .order("created_at", { ascending: false });

  if (filters?.experienceId && filters.experienceId !== "all") {
    query = query.eq("experience_id", filters.experienceId);
  }

  if (filters?.year && filters.year !== "all") {
    query = query.eq("year", filters.year);
  }

  const { data, error } = await query;

  if (error) {
    console.error("DB Project 조회 실패:", error);
    throw new Error("데이터베이스에서 프로젝트 목록을 불러오지 못했습니다.");
  }

  return data || [];
}
