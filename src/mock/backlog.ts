import { Backlog } from "@/features/admin/backlog/model/backlog.admin";

export const MOCK_BACKLOG: Backlog[] = [
  {
    id: "backlog-1",
    no: 1,
    screen: "메인 페이지",
    sub_page: "경력 영역", // subPage -> sub_page
    feature: "관리자 페이지에서 경력 작성 시 메인 페이지에 노출",
    description: "설명 없음",
    is_done: true, // isDone -> is_done
    is_designed: false, // isDesigned -> is_designed
    priority: "medium", // 필수 속성 추가
    order: 1, // 필수 속성 추가
    created_at: "2024-01-15T10:00:00Z", // createdAt -> created_at
    epic_ids: ["1"], // epicId(string) -> epic_ids(string[])
  },
  {
    id: "backlog-2",
    no: 2,
    screen: "로그인 페이지",
    sub_page: "폼 영역",
    feature: "구글 소셜 로그인 연동",
    description: "OAuth 2.0 사용",
    is_done: false,
    is_designed: true,
    priority: "high",
    order: 2,
    created_at: "2024-01-16T14:30:00Z",
    epic_ids: ["2"],
  },
];

export const MOCK_EPICS = [
  { id: "1", label: "경력 관리", color: "#DBF0D6" },
  { id: "2", label: "Epic 태그가 들어갑니다.", color: "#C7E0E9" },
] as const;
