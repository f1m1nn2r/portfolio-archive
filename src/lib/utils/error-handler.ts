import { NextResponse } from "next/server";

export function handleApiError(error: unknown) {
  console.error("API 에러:", error);
  return NextResponse.json(
    { error: error instanceof Error ? error.message : "알 수 없는 에러" },
    { status: 500 },
  );
}
