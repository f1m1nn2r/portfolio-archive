import { TABLES } from "@/lib/constants/tables";
import { handleApiError } from "@/lib/error-handler";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const experienceId = searchParams.get("experience_id");
    const year = searchParams.get("year");

    let query = supabase
      .from(TABLES.PROJECTS)
      .select("*")
      .order("created_at", { ascending: false });

    // 필터 적용
    if (experienceId && experienceId !== "all") {
      query = query.eq("experience_id", experienceId);
    }
    if (year) {
      query = query.eq("year", year);
    }

    const { data, error } = await query;

    if (error) {
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

    const insertData = {
      experience_id: body.experience_id,
      title: body.title,
      description: body.description,
      start_date: body.start_date,
      end_date: body.end_date || null,
      category: body.category,
      year: body.year,
      image_url: body.image_url,
      project_url: body.project_url,
    };

    const { data, error } = await supabase
      .from(TABLES.PROJECTS)
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error("Supabase Insert Error:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (err) {
    console.error("Internal Server Error:", err);
    return handleApiError(err);
  }
}
