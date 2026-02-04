import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { TABLES } from "@/lib/constants/tables";
import { handleApiError } from "@/lib/error-handler";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { Session } from "next-auth";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(TABLES.EPICS)
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    return handleApiError(error);
  }
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const session = (await getServerSession(authOptions)) as Session | null;

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "권한이 없습니다." }, { status: 403 });
    }

    const supabase = await createClient();
    const body = await request.json();

    const { data, error } = await supabase
      .from(TABLES.EPICS)
      .insert({
        label: body.label,
        color: body.color,
      })
      .select()
      .single();

    if (error) return handleApiError(error);
    return NextResponse.json(data);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const session = (await getServerSession(authOptions)) as Session | null;

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "권한이 없습니다." }, { status: 403 });
    }

    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID가 필요합니다." }, { status: 400 });
    }

    const { error } = await supabase.from(TABLES.EPICS).delete().eq("id", id);

    if (error) return handleApiError(error);
    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
