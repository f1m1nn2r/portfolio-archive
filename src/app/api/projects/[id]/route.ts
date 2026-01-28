import { TABLES } from "@/lib/constants/tables";
import { handleApiError } from "@/lib/utils/error-handler";
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
      .from(TABLES.PROJECTS)
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
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

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const supabase = await createClient();
    const { id } = await params;
    const body = await request.json();

    const { data, error } = await supabase
      .from(TABLES.PROJECTS)
      .update(body)
      .eq("id", id)
      .select()
      .single();

    if (error) {
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
      .from(TABLES.PROJECTS)
      .delete()
      .eq("id", id);

    if (error) {
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
