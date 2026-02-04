import Link from "next/link";

type FooterLinkProps = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
};

export default function FooterLink({
  href,
  children,
  external = false,
}: FooterLinkProps) {
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
