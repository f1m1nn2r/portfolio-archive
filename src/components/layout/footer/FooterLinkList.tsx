import FooterLink from "./FooterLink";
import { MAIN_LINKS, DOCUMENT_LINKS } from "./constants";

type Profile = {
  resume_url?: string;
  pdf_url?: string;
  github_url?: string;
};

type FooterLinkListProps = {
  profile: Profile;
};

export default function FooterLinkList({ profile }: FooterLinkListProps) {
  return (
    <div className="flex flex-col gap-10">
      {/* 주요 링크 */}
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

      {/* 문서 링크 */}
      <nav className="flex flex-col gap-3">
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
  );
}
