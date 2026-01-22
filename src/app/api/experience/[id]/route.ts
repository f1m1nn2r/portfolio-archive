import { TABLES } from "@/lib/constants/tables";
import { handleApiError } from "@/lib/utils/error-handler";
import { validateUpdateExperience } from "@/lib/validations/experience";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const supabase = await createClient();
    const { id } = await params;

    const { data, error } = await supabase
      .from(TABLES.EXPERIENCE)
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("조회 실패:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.code === "PGRST116" ? 404 : 500 },
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return handleApiError(err);
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const supabase = await createClient();
    const { id } = await params;
    const body = await request.json();

    // 유효성 검증
    const validatedData = validateUpdateExperience(body);

    const { data, error } = await supabase
      .from(TABLES.EXPERIENCE)
      .update(validatedData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("수정 실패:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return handleApiError(err);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const supabase = await createClient();
    const { id } = await params;

    const { error } = await supabase
      .from(TABLES.EXPERIENCE)
      .delete()
      .eq("id", id);

    if (error) {
      console.error("삭제 실패:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { success: true, message: "삭제되었습니다." },
      { status: 200 },
    );
  } catch (err) {
    return handleApiError(err);
  }
}
