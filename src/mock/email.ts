import { ContactMessage } from "@/types/admin/contact";

export const MOCK_EMAILS: ContactMessage[] = [
  {
    id: "1",
    sender: "홍길동",
    name_company: "example@company.co.kr",
    content:
      "프로젝트 관련 문의드립니다. 포트폴리오를 확인했는데 정말 인상적이었습니다.",
    is_read: false,
    is_starred: false,
    created_at: "2026-01-13T23:04:00Z",
  },
];
