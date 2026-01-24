export const MOCK_EXPERIENCE = [
  {
    id: 1,
    company: "주식회사 아이스크림에듀",
    team: "전략기획팀/사원",
    period: "2023.09 - 2025.10",
    duration: "N개월",
    status: "종료",
    description: [
      "JSP 기반 자사 서비스 시스템 안정화 및 성능 최적화",
      "홈페이지 리뉴얼, 랜딩페이지, 제휴사 페이지 등 다양한 웹사이트 구축",
      "웹 퍼블리싱 및 UI/UX 개선 프로젝트 수행",
    ],
    skills: ["PHP", "jQuery", "JavaScript", "HTML", "SCSS"],
  },
  {
    id: 2,
    company: "주식회사 위즈클라쓰",
    team: "개발파트/사원",
    period: "2023.06 - 2023.09",
    duration: "N개월",
    status: "종료",
    description: [
      "React, Vue.js 프레임워크 기반 프론트엔드 개발 참여",
      "기존 프로젝트 유지보수 및 코드 리팩토링 경험",
      "컴포넌트 기반 개발 방법론 학습",
    ],
    skills: ["React", "View", "SCSS"],
  },
  {
    id: 3,
    company: "주식회사 파이브센스",
    team: "개발파트/사원",
    period: "2022.02 - 2023.04",
    duration: "N개월",
    status: "종료",
    description: [
      "그누보드 기반 웹사이트 개발 및 커스터마이징",
      "PHP 백엔드 구조 설계에 따른 UI 개발",
      "프로젝트 납품부터 운영까지 전 과정 관리",
      "인프라 구축: 도메인 연결, SSL 인증서 설치, 서버 운영",
      "고객 대응 및 기술지원: CS 업무 및 유지보수 지원",
    ],
    skills: ["PHP", "SCSS"],
  },
];

export interface Project {
  id: string;
  title: string;
  period: string;
  description: string[];
}
export const MOCK_PROJECTS: Project[] = [
  {
    id: "1",
    title: "프로젝트명",
    period: "2000.00-2000.00",
    description: [
      "프로젝트 설명이 3줄 들어갑니다.",
      "프로젝트 설명이 3줄 들어갑니다.",
      "프로젝트 설명이 3줄 들어갑니다.",
    ],
  },
  {
    id: "2",
    title: "프로젝트명",
    period: "2000.00-2000.00",
    description: [
      "프로젝트 설명이 3줄 들어갑니다.",
      "프로젝트 설명이 3줄 들어갑니다.",
      "프로젝트 설명이 3줄 들어갑니다.",
    ],
  },
  {
    id: "3",
    title: "프로젝트명",
    period: "2000.00-2000.00",
    description: [
      "프로젝트 설명이 3줄 들어갑니다.",
      "프로젝트 설명이 3줄 들어갑니다.",
      "프로젝트 설명이 3줄 들어갑니다.",
    ],
  },
  {
    id: "4",
    title: "프로젝트명",
    period: "2000.00-2000.00",
    description: [
      "프로젝트 설명이 3줄 들어갑니다.",
      "프로젝트 설명이 3줄 들어갑니다.",
      "프로젝트 설명이 3줄 들어갑니다.",
    ],
  },
];
