import { Backlog } from "@/types/backlog";

export const MOCK_BACKLOG: Backlog[] = [
  {
    id: "backlog-1",
    no: 1,
    screen: "메인 페이지",
    subPage: "경력 영역",
    epicId: "경력 관리",
    feature: "관리자 페이지에서 경력 작성 시 메인 페이지에 노출",
    description: "설명 없음",
    isDone: true,
    isDesigned: false,
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "backlog-2",
    no: 2,
    screen: "로그인 페이지",
    subPage: "폼 영역",
    epicId: "유저 관리",
    feature: "구글 소셜 로그인 연동",
    description: "OAuth 2.0 사용",
    isDone: false,
    isDesigned: true,
    createdAt: "2024-01-16T14:30:00Z",
  },
];

export const MOCK_EPICS = [
  { id: "1", label: "경력 관리", color: "#DBF0D6" },
  { id: "2", label: "Epic 태그가 들어갑니다.", color: "#C7E0E9" },
] as const;
