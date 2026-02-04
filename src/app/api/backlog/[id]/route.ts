import { TABLES } from "@/lib/constants/tables";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { Session } from "next-auth";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = (await getServerSession(authOptions)) as Session | null;

    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "권한이 없습니다. 관리자 로그인이 필요합니다." },
        { status: 403 },
      );
    }

    const supabase = await createClient();
    const { id } = await params;
    const body = await request.json();

    // 2. DB 업데이트 수행
    const { data, error } = await supabase
      .from(TABLES.BACKLOG)
      .update(body)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("백로그 수정 에러:", err);
    return NextResponse.json({ error: "서버 내부 에러" }, { status: 500 });
  }
}
