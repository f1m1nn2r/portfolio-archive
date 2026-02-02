import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { Session } from "next-auth";
import { handleApiError } from "@/lib/utils/error-handler";
import { deleteCategory, updateCategory } from "@/services/category/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = (await getServerSession(authOptions)) as Session | null;
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "권한이 없습니다." },
        { status: 403 },
      );
    }

    const { id } = await params;
    const body = await request.json();

    await updateCategory(id, body.name);

    return NextResponse.json({ success: true });
  } catch (err) {
    return handleApiError(err);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = (await getServerSession(authOptions)) as Session | null;
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "권한이 없습니다." },
        { status: 403 },
      );
    }

    const { id } = await params;

    await deleteCategory(id);

    return NextResponse.json({
      success: true,
      message: "카테고리가 삭제되었습니다.",
    });
  } catch (err) {
    return handleApiError(err);
  }
}
