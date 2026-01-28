import { EmailMessage } from "@/types/admin/contact";

export const MOCK_EMAILS: EmailMessage[] = [
  {
    id: "1",
    senderName: "홍길동",
    senderEmail: "example@company.co.kr",
    message:
      "프로젝트 관련 문의드립니다. 포트폴리오를 확인했는데 정말 인상적이었습니다.",
    isRead: false,
    isStarred: false,
    receivedAt: "2026-01-13T23:04:00Z",
  },
  {
    id: "2",
    senderName: "김철수",
    senderEmail: "chulsoo@example.com",
    message: "면접 일정 안내드립니다. 다음 주 월요일 오전 10시에 가능하신가요?",
    isRead: true,
    isStarred: true,
    receivedAt: "2026-01-12T15:30:00Z",
  },
  {
    id: "3",
    senderName: "이영희",
    senderEmail: "younghee@company.kr",
    message: "협업 제안 건으로 연락드립니다. 시간 되실 때 회신 부탁드립니다.",
    isRead: true,
    isStarred: false,
    receivedAt: "2026-01-11T09:20:00Z",
  },
  {
    id: "4",
    senderName: "박민수",
    senderEmail: "minsu@tech.io",
    message: "기술 스택 관련해서 몇 가지 질문이 있습니다. 답변 부탁드립니다.",
    isRead: true,
    isStarred: false,
    receivedAt: "2026-01-10T14:15:00Z",
  },
  {
    id: "5",
    senderName: "최지연",
    senderEmail: "jiyeon@startup.com",
    message: "포트폴리오 프로젝트 중 DAN-CADE에 대해 자세히 알고 싶습니다.",
    isRead: false,
    isStarred: true,
    receivedAt: "2026-01-09T16:45:00Z",
  },
];
