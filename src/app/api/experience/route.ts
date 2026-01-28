import { TABLES } from "@/lib/constants/tables";
import { handleApiError } from "@/lib/utils/error-handler";
import { validateCreateExperience } from "@/lib/validations/experience";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from(TABLES.EXPERIENCE)
      .select("*")
      .order("start_date", { ascending: false });

    if (error) {
      console.error("조회 실패:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, data: data || [] });
  } catch (err) {
    return handleApiError(err);
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    // Zod가 자동으로 유효성 검사 + 타입 변환
    const validatedData = validateCreateExperience(body);

    const { data, error } = await supabase
      .from(TABLES.EXPERIENCE)
      .insert(validatedData)
      .select()
      .single();

    if (error) {
      console.error("생성 실패:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (err) {
    // Zod 에러 처리
    if (err instanceof ZodError) {
      return NextResponse.json(
        { success: false, error: err.issues[0].message },
        { status: 400 },
      );
    }
    return handleApiError(err);
  }
}
