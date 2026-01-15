export interface Backlog {
  id: string;
  no: number; // 리스트 순번
  screen: string; // 화면 (ex. 메인 페이지)
  subPage: string; // 세부 페이지 (ex. 경력 영역)
  epicId: string; // 연관 Epic ID
  feature: string; // 기능 명칭
  description: string; // 기능 설명
  isDone: boolean; // 구현 여부
  isDesigned: boolean; // 디자인 여부
  createdAt: string;
}

export interface Epic {
  id: string;
  name: string; // 에픽 명칭 (ex. 경력 관리)
  color: string; // 태그 색상 (랜덤 또는 지정)
}
