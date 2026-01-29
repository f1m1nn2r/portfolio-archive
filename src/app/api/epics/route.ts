import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { TABLES } from "@/lib/constants/tables";
import { handleApiError } from "@/lib/utils/error-handler";

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
  const headersList = request.headers;
  const adminPassword = headersList.get("x-admin-password");

  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

  if (error) {
    return handleApiError(error);
  }

  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const headersList = request.headers;
  const adminPassword = headersList.get("x-admin-password");

  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID가 필요합니다." }, { status: 400 });
  }

  const { error } = await supabase.from(TABLES.EPICS).delete().eq("id", id);

  if (error) {
    return handleApiError(error);
  }
  return NextResponse.json({ success: true });
}
