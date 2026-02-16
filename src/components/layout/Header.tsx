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
    "px-6 py-1.5 rounded-full text-base font-medium transition-all border border-black";

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
    <header className="max-w-7xl w-full bg-white pt-25 mx-auto">
      <div className="flex justify-between items-center mx-5 border-b border-black pb-5">
        {/* 왼쪽 로고 */}
        <div className="flex gap-2">
          <div className="w-4 h-4 bg-black rounded-full" />
          <div className="w-4 h-4 bg-black rounded-full" />
        </div>

        {/* 중앙 네비게이션 */}
        <nav className="flex gap-3">
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
