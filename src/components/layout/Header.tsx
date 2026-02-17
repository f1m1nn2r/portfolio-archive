"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = {
  href: string;
  label: string;
  variant?: "default" | "special";
};

const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Main" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
  { href: "/etc", label: "Etc", variant: "special" },
];

function NavLink({
  href,
  label,
  isActive,
  variant = "default",
}: {
  href: string;
  label: string;
  isActive: boolean;
  variant?: "default" | "special";
}) {
  const baseStyles =
    "px-3 py-1.5 sm:px-6 rounded-full text-sm sm:text-base font-medium transition-all border border-black";

  const variantStyles = {
    default: isActive
      ? "bg-black text-white"
      : "hover:bg-black hover:text-white",
    special: "bg-[#76936d] text-black",
  };

  return (
    <Link href={href} className={`${baseStyles} ${variantStyles[variant]}`}>
      {label}
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="mx-auto w-full max-w-7xl bg-white pt-10 sm:pt-16 lg:pt-25">
      <div className="mx-4 flex flex-col items-start gap-5 border-b border-black pb-5 sm:mx-5 md:flex-row md:items-center md:justify-between md:gap-4">
        {/* 왼쪽 로고 */}
        <div className="flex gap-2">
          <div className="w-4 h-4 bg-black rounded-full" />
          <div className="w-4 h-4 bg-black rounded-full" />
        </div>

        {/* 중앙 네비게이션 */}
        <nav className="flex w-full flex-wrap gap-2 sm:gap-3 md:w-auto md:justify-end">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              isActive={pathname === link.href}
              variant={link.variant}
            />
          ))}
        </nav>

        {/* TODO 방문자 수 -> 추후 구현 예정 
      <div className="text-base">
        today <span className="font-semibold">N</span>
      </div>
      */}
      </div>
    </header>
  );
}
