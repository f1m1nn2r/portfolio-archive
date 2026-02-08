import { ContactEmailTemplate } from "@/components/admin/email/ContactEmailTemplate";
import { TABLES } from "@/lib/constants/tables";
import { createAdminClient } from "@/lib/supabase/admin";
import { contactSchema } from "@/lib/validations/contact";
import { NextResponse } from "next/server";
import { Resend } from "resend";

// Resend 인스턴스 생성 (API 키 사용)
const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from(TABLES.CONTACTS)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "조회 실패" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createAdminClient();
    const body = await request.json();

    const validation = contactSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    // 검증된 데이터 사용
    const { from, nameCompany, message } = body;

    // Supabase DB에 저장 (관리자 페이지용)
    const { data, error: dbError } = await supabase
      .from(TABLES.CONTACTS)
      .insert([
        {
          sender: from,
          name_company: nameCompany,
          content: message,
          is_read: false,
          is_starred: false,
        },
      ])
      .select();

    if (dbError) throw dbError;

    // Resend로 내 메일함에 알림 보내기
    // 주의: 도메인 설정 전에는 'onboarding@resend.dev'만 발신자로 쓸 수 있습니다.
    const { error: mailError } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "f1minn2r@naver.com",
      subject: `[신규 문의] ${from}님으로부터 메시지가 도착했습니다.`,
      react: ContactEmailTemplate({ from, nameCompany, message }),
    });

    if (mailError) {
      console.error("Resend Mail Error:", mailError);
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: unknown) {
    console.error("API Route Full Error:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "알 수 없는 에러가 발생했습니다.";

    console.error("API Route Error:", errorMessage);

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const supabase = createAdminClient();
    const body = await request.json();
    const { ids, ...updateData } = body;

    // ids가 배열로 들어오면 다중 수정 (예: markAsRead)
    if (Array.isArray(ids)) {
      const { error } = await supabase
        .from(TABLES.CONTACTS)
        .update(updateData)
        .in("id", ids);

      if (error) throw error;
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "수정 실패" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = createAdminClient();

    const body = await request.json();
    const { ids } = body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: "삭제할 ID가 필요합니다." },
        { status: 400 },
      );
    }

    const { error } = await supabase
      .from(TABLES.CONTACTS)
      .delete()
      .in("id", ids);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("삭제 에러:", error);
    return NextResponse.json({ error: "삭제 실패" }, { status: 500 });
  }
}
