export interface Experience {
  id: string;
  companyName: string; // 회사명
  role: string; // 직책/역할
  description: string; // 주요 업무 요약 (textarea)
  startDate: string; // YYYY-MM
  endDate?: string; // YYYY-MM (없으면 현재 재직 중으로 확인)
  skills: string[]; // 사용 기술 스택 (태그 배열)
  projects?: Project[]; // 해당 회사에서의 상세 작업물
}

export interface Project {
  id: string;
  experienceId: string; // 소속 회사 ID
  title: string; // 프로젝트 명
  content: string; // 상세 설명 (에디터 사용)
  techStack: string[]; // 해당 프로젝트에 쓴 기술
  year: string; // 작업 연도 (2024 등)
  thumbnailUrl?: string; // 카드 그리드용 이미지
  link?: string; // 결과물 URL
}
