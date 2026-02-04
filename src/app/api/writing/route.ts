import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { createWriting, getWriting } from "@/services/writing/server";
import { handleApiError } from "@/lib/error-handler";
import { Session } from "next-auth";

export async function GET() {
  try {
    const { posts, totalCount, recentCount } = await getWriting();

    return NextResponse.json({
      success: true,
      data: posts, // 기존과 동일하게 데이터 전송
      totalCount, // 전체 개수 추가
      recentCount, // 오늘 개수 추가
    });
  } catch (err) {
    return handleApiError(err);
  }
}

export async function POST(request: Request) {
  try {
    const session = (await getServerSession(authOptions)) as Session | null;
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "권한이 없습니다. 관리자 계정으로 로그인해 주세요." },
        { status: 403 },
      );
    }

    const body = await request.json();
    const data = await createWriting(body);

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return handleApiError(err);
  }
}
