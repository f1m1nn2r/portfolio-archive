import { TABLES } from "@/lib/constants/tables";
import { Post } from "@/types/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatDate } from "@/lib/date";

export async function createPost(body: Partial<Post>): Promise<Post> {
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

export async function getPosts(categoryId?: string | null): Promise<{
  posts: any[]; // 가공된 데이터 타입에 맞게 수정 가능
  totalCount: number;
  recentCount: number;
}> {
  const supabase = createAdminClient();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let query = supabase.from(TABLES.POSTS).select(
    `
      *,
      category:categories!inner(
        id,
        name,
        parent_id,
        parent:parent_id(name)
      )
    `,
    { count: "exact" },
  );

  // categoryId가 있을 경우 필터 추가
  if (categoryId) {
    query = query.or(`id.eq.${categoryId}, parent_id.eq.${categoryId}`, {
      foreignTable: "categories",
    });
  }

  const { data, error, count } = await query.order("created_at", {
    ascending: false,
  });

  if (error) throw error;

  // 오늘 작성된 게시글 개수 (전체 기준 유지 혹은 필터 기준 선택 가능)
  const { count: recentCount } = await supabase
    .from(TABLES.POSTS)
    .select("*", { count: "exact", head: true })
    .gte("created_at", today.toISOString());

  // 서버 측 데이터 가공 (프론트 부담 덜어주기)
  const formattedPosts = (data || []).map((post: any, index: number) => {
    const categoryData = post.category;
    return {
      id: post.id,
      no: index + 1,
      title: post.title,
      content: post.content,
      categoryId: categoryData?.id,
      parentCategoryId: categoryData?.parent_id,
      category: categoryData?.parent
        ? `${categoryData.parent.name} > ${categoryData.name}`
        : categoryData?.name || "미지정",
      date: formatDate(post.created_at),
    };
  });

  return {
    posts: formattedPosts,
    totalCount: count || 0,
    recentCount: recentCount || 0,
  };
}

export async function getPostById(id: string): Promise<Post> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from(TABLES.POSTS)
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function updatePost(
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

export async function deletePost(id: string): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase.from(TABLES.POSTS).delete().eq("id", id);

  if (error) throw error;
}
