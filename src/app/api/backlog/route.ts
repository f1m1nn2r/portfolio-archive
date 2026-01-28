import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { TABLES } from "@/lib/constants/tables";
import { handleApiError } from "@/lib/utils/error-handler";
import { Backlog } from "@/types/admin";

export async function GET() {
  const supabase = await createClient();
  const { data: items, error } = await supabase
    .from(TABLES.BACKLOG)
    .select("*")
    .order("order", { ascending: true });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  const backlogs = (items as Backlog[]) || [];

  // 서버에서 통계 미리 계산
  const total = backlogs.length;
  const completed = backlogs.filter((item) => item.is_done).length;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return NextResponse.json({
    items,
    stats: {
      total,
      completed,
      completionRate,
    },
  });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const body = await request.json();

  console.log("요청 데이터:", body);

  const { data, error } = await supabase
    .from(TABLES.BACKLOG)
    .insert([
      {
        screen: body.screen || "",
        sub_page: body.sub_page || "",
        // epic: body.epic || null,
        feature: body.feature || "",
        description: body.description || "",
        is_done: body.is_done ?? false,
        is_designed: body.is_designed ?? false,
        priority: body.priority || "medium",
        order: body.order ?? 0,
        // created_at: new Date().toISOString(),
      },
    ])
    .select();

  if (error) {
    return handleApiError(error);
  }
  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const supabase = await createClient();
  try {
    const { ids } = await request.json();

    if (!ids || !Array.isArray(ids)) {
      return NextResponse.json(
        { error: "유효하지 않은 ID 목록입니다." },
        { status: 400 },
      );
    }

    const { error } = await supabase
      .from(TABLES.BACKLOG)
      .delete()
      .in("id", ids);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // SWR의 mutate가 성공으로 인식하도록 200 OK와 함께 결과를 반환
    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
