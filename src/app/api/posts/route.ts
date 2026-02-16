import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { handleApiError } from "@/lib/error-handler";
import { Session } from "next-auth";
import { createPost, deletePost, getPosts } from "@/features/admin/posts/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");

    const { posts, totalCount, recentCount } = await getPosts(categoryId);

    return NextResponse.json({
      success: true,
      data: posts,
      totalCount,
      recentCount,
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
    const data = await createPost(body);

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return handleApiError(err);
  }
}

export async function DELETE(req: Request) {
  try {
    const session = (await getServerSession(authOptions)) as Session | null;
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "권한이 없습니다." }, { status: 403 });
    }

    const { ids } = await req.json();

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: "삭제할 ID가 없습니다." },
        { status: 400 },
      );
    }

    await Promise.all(ids.map((id) => deletePost(id)));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Delete Error:", err);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
