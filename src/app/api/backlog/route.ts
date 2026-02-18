import { NextResponse } from "next/server";
import { handleApiError } from "@/lib/error-handler";
import {
  createBacklog,
  deleteBacklogs,
  getBacklogsWithStats,
} from "@/features/admin/backlog/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { Session } from "next-auth";

export async function GET() {
  try {
    const backlogData = await getBacklogsWithStats();
    return NextResponse.json(backlogData);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const session = (await getServerSession(authOptions)) as Session | null;

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "권한이 없습니다." }, { status: 403 });
    }

    const body = await request.json();
    const newBacklog = await createBacklog(body);

    return NextResponse.json(newBacklog, { status: 201 });
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

    const { ids } = await request.json();
    await deleteBacklogs(ids);

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: Request) {
  try {
    const session = (await getServerSession(
      authOptions as any,
    )) as Session | null;

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "권한이 없습니다." }, { status: 403 });
    }

    // const body = await request.json();
    // body에서 id와 수정할 내용을 분리하여 처리
    // const updated = await updateBacklog(body.id, body.data);

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
