import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { Session } from "next-auth";
import { handleApiError } from "@/lib/utils/error-handler";
import {
  createCategory,
  getCategoriesWithStats,
} from "@/services/category/server";

export async function GET() {
  try {
    const result = await getCategoriesWithStats();
    return NextResponse.json(result);
  } catch (err) {
    return handleApiError(err);
  }
}

export async function POST(request: Request) {
  try {
    const session = (await getServerSession(authOptions)) as Session | null;

    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "권한이 없습니다." },
        { status: 403 },
      );
    }

    const body = await request.json();
    const data = await createCategory(body);

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return handleApiError(err);
  }
}
