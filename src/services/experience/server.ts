import { TABLES } from "@/lib/constants/tables";
import { validateCreateExperience } from "@/lib/validations/experience";
import { Experience } from "@/types/api/experience";
import { createClient } from "@/utils/supabase/server";

export async function getExperiencesFromDb(): Promise<Experience[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(TABLES.EXPERIENCE)
    .select("*")
    .order("start_date", { ascending: false });

  if (error) {
    console.error("DB Experience 조회 실패:", error);
    throw new Error(
      "데이터베이스에 경력(Experience) 목록을 불러오지 못했습니다.",
    );
  }

  return data || [];
}

export async function createExperience(body: unknown): Promise<Experience> {
  // Zod가 자동으로 유효성 검사 + 타입 변환
  const validatedData = validateCreateExperience(body);

  const supabase = await createClient();
  const { data, error } = await supabase
    .from(TABLES.EXPERIENCE)
    .insert(validatedData)
    .select()
    .single();

  if (error) {
    console.error("DB Experience 생성 실패:", error);
    throw new Error(
      "데이터베이스에서 경력(Experience) 목록을 불러오지 못했습니다.",
    );
  }

  return data;
}
