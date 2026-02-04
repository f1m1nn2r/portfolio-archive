import { ContactEmailTemplate } from "@/components/admin/email/ContactEmailTemplate";
import { TABLES } from "@/lib/constants/tables";
import { createAdminClient } from "@/lib/supabase/admin";
import { contactSchema } from "@/lib/validations/contact";
import { NextResponse } from "next/server";
import { Resend } from "resend";

// Resend 인스턴스 생성 (API 키 사용)
const resend = new Resend(process.env.RESEND_API_KEY);

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
    const { senderEmail, senderName, message } = body;

    // Supabase DB에 저장 (관리자 페이지용)
    const { data, error: dbError } = await supabase
      .from(TABLES.CONTACTS)
      .insert([
        {
          sender: senderEmail,
          name_company: senderName,
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
      subject: `[신규 문의] ${senderName}님으로부터 메시지가 도착했습니다.`,
      react: ContactEmailTemplate({ senderName, senderEmail, message }),
    });

    if (mailError) {
      console.error("Resend Mail Error:", mailError);
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: unknown) {
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
