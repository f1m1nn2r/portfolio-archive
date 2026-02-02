import { TABLES } from "@/lib/constants/tables";
import { Category } from "@/types/admin";
import { CategoryResponse } from "@/types/api/category";
import { createAdminClient } from "@/utils/supabase/admin";

export async function getCategoriesWithStats(): Promise<CategoryResponse> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from(TABLES.CATEGORIES)
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) throw error;

    const items = data as Category[];

    // 통계 계산
    const totalCount = items.length;
    const parentCount = items.filter((c) => c.depth === 0).length;
    const childCount = items.filter((c) => c.depth === 1).length;

    return {
      success: true,
      data: items,
      summary: {
        totalCount,
        parentCount,
        childCount,
      },
    };
  } catch (err) {
    console.error("카테고리 조회 에러:", err);
    throw err;
  }
}

export async function createCategory(body: any): Promise<Category> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from(TABLES.CATEGORIES)
    .insert([
      {
        name: body.name,
        depth: body.depth || 0,
        parent_id: body.parent_id || null,
        sort_order: body.sort_order || 0,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateCategory(id: string, name: string): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from(TABLES.CATEGORIES)
    .update({ name })
    .eq("id", id);

  if (error) throw error;
}

export async function deleteCategory(id: string): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from(TABLES.CATEGORIES)
    .delete()
    .eq("id", id);

  if (error) throw error;
}
