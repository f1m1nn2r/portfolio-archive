import { TABLES } from "@/lib/constants/tables";
import { Post } from "@/types/admin";
import { createAdminClient } from "@/lib/supabase/admin";

export async function createWriting(body: Partial<Post>): Promise<Post> {
  const supabase = createAdminClient();

  const publishedAt =
    body.status === "published" ? new Date().toISOString() : null;

  const { data, error } = await supabase
    .from(TABLES.POSTS)
    .insert([
      {
        title: body.title,
        content: body.content,
        category_id: body.category_id,
        status: body.status || "draft",
        thumbnail: body.thumbnail || null,
        published_at: publishedAt,
        // updated_at, created_at은 DB에서 자동생성되도록
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("DB Post 생성 에러:", error);
    throw error;
  }
  return data;
}

export async function getWriting(): Promise<{
  posts: Post[];
  totalCount: number;
  recentCount: number;
}> {
  const supabase = createAdminClient();

  // 오늘 0시 기준 시간 설정
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 게시글 목록 + 카테고리 계층 + 전체 개수 한 번에 가져오기
  const { data, error, count } = await supabase
    .from(TABLES.POSTS)
    .select(
      `
      *,
      category:categories(
        name,
        parent:parent_id(name)
      )
    `,
      { count: "exact" },
    ) // 전체 개수(exact) 포함
    .order("created_at", { ascending: false });

  if (error) throw error;

  // 오늘 작성된 게시글 개수만 따로 쿼리
  const { count: recentCount } = await supabase
    .from(TABLES.POSTS)
    .select("*", { count: "exact", head: true }) // head: true로 데이터 없이 숫자만 가져옴
    .gte("created_at", today.toISOString());

  return {
    posts: data || [],
    totalCount: count || 0,
    recentCount: recentCount || 0,
  };
}

export async function getWritingById(id: string): Promise<Post> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from(TABLES.POSTS)
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function updateWriting(
  id: string,
  body: Partial<Post>,
): Promise<Post> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from(TABLES.POSTS)
    .update({
      ...body,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteWriting(id: string): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase.from(TABLES.POSTS).delete().eq("id", id);

  if (error) throw error;
}
