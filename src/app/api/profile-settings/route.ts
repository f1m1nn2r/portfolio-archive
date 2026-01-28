import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { TABLES } from "@/lib/constants/tables";
import { handleApiError } from "@/lib/utils/error-handler";
import { DEFAULT_PROFILE, ProfileSettings } from "@/types/api/profile";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from(TABLES.PROFILE_SETTINGS)
      .select("*")
      .maybeSingle();

    if (error) {
      console.error("조회 실패:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json<ProfileSettings>(data || DEFAULT_PROFILE);
  } catch (err) {
    return handleApiError(err);
  }
}

export async function PATCH(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    const { data, error } = await supabase
      .from(TABLES.PROFILE_SETTINGS)
      .upsert({ id: 1, ...body }, { onConflict: "id" })
      .select()
      .single();

    if (error) {
      console.error("업데이트 실패:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      message: "성공적으로 저장되었습니다.",
      data,
    });
  } catch (err) {
    return handleApiError(err);
  }
}
