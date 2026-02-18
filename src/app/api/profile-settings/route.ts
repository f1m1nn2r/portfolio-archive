import { NextResponse } from "next/server";
import { handleApiError } from "@/lib/error-handler";
import { getProfileFromDb, upsertProfileInDb } from "@/features/admin/profile/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { Session } from "next-auth";
import { ProfileFormData } from "@/features/admin/profile";

export async function GET() {
  try {
    const data = await getProfileFromDb();
    return NextResponse.json(data);
  } catch (err) {
    return handleApiError(err);
  }
}

export async function PATCH(request: Request) {
  try {
    // 서버 세션 확인
    const session = (await getServerSession(authOptions)) as Session | null;

    // 권한 검사: 세션이 없거나, role이 admin이 아니면 입구컷
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "권한이 없습니다. 관리자 계정으로 로그인해 주세요." },
        { status: 403 },
      );
    }

    const body = (await request.json()) as ProfileFormData;
    const data = await upsertProfileInDb(body);

    return NextResponse.json({
      message: "성공적으로 저장되었습니다.",
      data,
    });
  } catch (err) {
    return handleApiError(err);
  }
}
