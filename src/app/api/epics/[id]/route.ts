import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { TABLES } from "@/lib/constants/tables";
import { handleApiError } from "@/lib/error-handler";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "권한이 없습니다." }, { status: 403 });
    }

    const supabase = await createClient();
    const { id } = params;

    const { error } = await supabase.from(TABLES.EPICS).delete().eq("id", id);

    if (error) return handleApiError(error);
    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
