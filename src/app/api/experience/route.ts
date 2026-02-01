import { handleApiError } from "@/lib/utils/error-handler";
import {
  createExperience,
  getExperiencesFromDb,
} from "@/services/experience/server";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET() {
  try {
    const experiences = await getExperiencesFromDb();
    return NextResponse.json({ success: true, data: experiences });
  } catch (err) {
    return handleApiError(err);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newExperience = await createExperience(body);

    return NextResponse.json(
      { success: true, data: newExperience },
      { status: 201 },
    );
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { success: false, error: err.issues[0].message },
        { status: 400 },
      );
    }
    return handleApiError(err);
  }
}
