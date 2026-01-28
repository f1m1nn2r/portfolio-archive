import { createClient } from "@/utils/supabase/server";
import { Backlog } from "@/types/admin";
import { TABLES } from "@/lib/constants/tables";

export async function getBacklogsFromDb(): Promise<Backlog[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from(TABLES.BACKLOG)
      .select("*")
      .order("order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("DB 백로그 조회 실패:", error);
    return [];
  }
}
