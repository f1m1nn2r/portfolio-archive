import { TABLES } from "@/lib/constants/tables";
import { Backlog, BacklogResponse } from "@/types/admin";
import { createAdminClient } from "@/utils/supabase/admin";

export async function getBacklogs(): Promise<Backlog[]> {
  try {
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from(TABLES.BACKLOG)
      .select("*")
      .order("order", { ascending: true });

    if (error) throw error;

    return (data as Backlog[]) || [];
  } catch (err) {
    console.error("조회 에러:", err);
    return [];
  }
}

export async function getBacklogsWithStats(): Promise<BacklogResponse> {
  const items = await getBacklogs();

  const total = items.length;
  const completed = items.filter((item) => item.is_done).length;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    items,
    stats: {
      total,
      completed,
      completionRate,
    },
  };
}

export async function createBacklog(body: any): Promise<Backlog> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from(TABLES.BACKLOG)
    .insert([
      {
        screen: body.screen || "",
        sub_page: body.sub_page || "",
        feature: body.feature || "",
        description: body.description || "",
        is_done: body.is_done ?? false,
        is_designed: body.is_designed ?? false,
        priority: body.priority || "medium",
        order: body.order ?? 0,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteBacklogs(ids: string[]): Promise<void> {
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    throw new Error("유효하지 않은 ID 목록입니다.");
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from(TABLES.BACKLOG).delete().in("id", ids);

  if (error) {
    console.error("DB Backlog 삭제 실패:", error);
    throw new Error("Failed to delete backlogs from the database.");
  }
}
