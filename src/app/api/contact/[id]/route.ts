import { TABLES } from "@/lib/constants/tables";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const supabase = createAdminClient();
    const body = await request.json();

    const { error } = await supabase
      .from(TABLES.CONTACTS)
      .update(body)
      .eq("id", id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "수정 실패" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params; // URL에서 ID 추출
    const supabase = createAdminClient();

    const { error } = await supabase
      .from(TABLES.CONTACTS)
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("단일 삭제 에러:", error);
    return NextResponse.json({ error: "삭제 실패" }, { status: 500 });
  }
}
