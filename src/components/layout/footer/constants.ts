type MainLink = {
  label: string;
  useProfileUrl: "resume_url" | "pdf_url" | "github_url";
  external?: boolean;
};

type DocumentLink = {
  icon: string;
  label: string;
  href: string;
  external: boolean;
};

export const MAIN_LINKS: MainLink[] = [
  { label: "이력서", useProfileUrl: "resume_url", external: true },
  // { label: "포트폴리오 PDF", useProfileUrl: "pdf_url", external: true },
  { label: "깃허브", useProfileUrl: "github_url", external: true },
];

export const DOCUMENT_LINKS: DocumentLink[] = [
  {
    icon: "📄",
    label: "와이어 프레임",
    href: "https://www.figma.com/design/JG4gfkkbaCxxnanJaEfLti/2026-%EC%9D%B4%EB%A0%A5%EC%84%9C--%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4?node-id=0-1&t=UxVLKsCl0Rhyn89e-1",
    external: true,
  },
  { icon: "📄", label: "백로그", href: "/backlog", external: false },
  {
    icon: "📄",
    label: "개인 대시보드",
    href: "/admin/profile-settings",
    external: false,
  },
];
