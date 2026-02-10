import { NextResponse } from "next/server";
import { handleApiError } from "@/lib/error-handler";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { Session } from "next-auth";
import { deletePost, getPostById, updatePost } from "@/services/post/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const post = await getPostById(params.id);

    if (!post) {
      return NextResponse.json(
        { success: false, error: "게시글을 찾을 수 없습니다." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: post,
    });
  } catch (err) {
    return handleApiError(err);
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = (await getServerSession(authOptions)) as Session | null;

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "권한이 없습니다." }, { status: 403 });
    }

    const body = await req.json();
    const data = await updatePost(params.id, body);
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

    // URL에서 id 파라미터 가져오기
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID가 제공되지 않았습니다." },
        { status: 400 },
      );
    }

    await deletePost(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return handleApiError(err);
  }
}
