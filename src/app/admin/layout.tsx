"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { usePathname } from "next/navigation";
import { MenuItem } from "@/types/icon";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    { name: "Backlog", icon: "clipboard", href: "/admin/backlog" },
    { name: "Experience", icon: "briefcase", href: "/admin/experience" },
    { name: "Email", icon: "envelope", href: "/admin/email" },
    { name: "Writing", icon: "editAlt", href: "/admin/writing" },
  ];

  return (
    <div className="flex min-h-screen bg-bg-light p-5 gap-2.5">
      <aside className="w-64 flex flex-col">
        <div
          className="
             bg-white p-2.5 rounded-lg border border-gray-ddd  
            "
        >
          <div className="rounded-lg flex items-center gap-2.5 w-fit">
            <div className="bg-black w-11 h-11 flex items-center justify-center gap-1.5 rounded-sm">
              <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
              <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
            </div>
            <span className="font-bold text-base">Portfolio</span>
          </div>
        </div>

        <nav
          className="
            flex-1 
            mt-5 pt-5
            relative
            after:content-[''] 
            after:absolute after:top-0 after:left-0 
            after:w-full after:h-[1px] 
            after:bg-gray-ddd"
        >
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 p-2.5 rounded-lg transition-colors group ${
                      isActive
                        ? "bg-white border border-gray-ddd text-black font-medium"
                        : "hover:bg-bg-light/50"
                    }`}
                  >
                    <span
                      className={`text-lg transition-opacity ${
                        isActive
                          ? "opacity-100"
                          : "opacity-70 group-hover:opacity-100"
                      }`}
                    >
                      <Icon type={item.icon} size="16" />
                    </span>
                    <span
                      className={
                        isActive ? "font-medium text-black" : "font-regular"
                      }
                    >
                      {item.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
