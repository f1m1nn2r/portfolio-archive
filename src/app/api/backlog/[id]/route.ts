import { TABLES } from "@/lib/constants/tables";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const headersList = request.headers;
  const adminPassword = headersList.get("x-admin-password");

  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createClient();

  const { id } = await params;

  const body = await request.json();

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
}
