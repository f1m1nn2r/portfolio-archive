import Link from "next/link";
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
          if (!url) {
            return null;
          }

          return (
            <Link
              key={link.label}
              href={url}
              {...(link.external && {
                target: "_blank",
                rel: "noopener noreferrer",
              })}
              className="flex items-center gap-2 text-base hover:opacity-70 transition-opacity"
            >
              <span>▶</span> {link.label}
            </Link>
          );
        })}
      </div>

      {/* 문서 링크 */}
      <nav className="flex flex-col gap-3">
        {DOCUMENT_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            {...(link.external && {
              target: "_blank",
              rel: "noopener noreferrer",
            })}
            className="flex items-center gap-2 text-base hover:opacity-70 transition-opacity"
          >
            {link.icon} {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
