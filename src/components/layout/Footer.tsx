import Link from "next/link";

async function getProfileSettings() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/profile-settings`,
    {
      cache: "no-store",
    },
  );
  return res.json();
}

type MainLink = {
  label: string;
  useProfileUrl: "resume_url" | "pdf_url" | "github_url";
  external?: boolean;
};

const MAIN_LINKS: MainLink[] = [
  { label: "이력서", useProfileUrl: "resume_url" },
  { label: "포트폴리오 PDF", useProfileUrl: "pdf_url" },
  { label: "깃허브", useProfileUrl: "github_url", external: true },
];

const DOCUMENT_LINKS = [
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
    external: true,
  },
] as const;

function FooterLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className="flex items-center gap-2 text-base hover:opacity-70 transition-opacity"
    >
      {children}
    </Link>
  );
}

export default async function Footer() {
  const profile = await getProfileSettings();

  return (
    <footer className="w-full bg-black text-white py-20 px-10 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        {/* 왼쪽 섹션 */}
        <div className="flex flex-col gap-10">
          {/* 연락처 및 주요 링크 */}
          <div className="flex flex-col gap-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter break-all">
              {profile.email}
            </h2>
            {/* 연락처는... 생각해보니 너무 내 개인 정보라...
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
              {profile.phone}
            </h2> */}
            <div className="flex gap-6 mt-2">
              {MAIN_LINKS.map((link) => {
                const url = profile[link.useProfileUrl];

                return (
                  <FooterLink
                    key={link.label}
                    href={url || "#"}
                    external={link.external}
                  >
                    <span>▶</span> {link.label}
                  </FooterLink>
                );
              })}
            </div>
          </div>

          {/* 문서 링크 */}
          <nav className="w-full flex flex-col justify-end gap-3">
            {DOCUMENT_LINKS.map((link) => (
              <FooterLink
                key={link.label}
                href={link.href}
                external={link.external}
              >
                {link.icon} {link.label}
              </FooterLink>
            ))}
          </nav>
        </div>

        {/* 오른쪽 이메일 섹션 */}
        {/* <div className="flex items-start">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter break-all">
            {profile.email}
          </h2>
        </div> */}
      </div>
    </footer>
  );
}
