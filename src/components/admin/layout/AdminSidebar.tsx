"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { usePathname, useSearchParams } from "next/navigation";
import { MenuItem } from "@/types/icon";

const menuItems: MenuItem[] = [
  {
    name: "Profile Settings",
    icon: "userCircle",
    href: "/admin/profile-settings",
  },
  { name: "Backlog", icon: "clipboard", href: "/admin/backlog" },
  { name: "Experience", icon: "briefcase", href: "/admin/experience" },
  { name: "Contacts", icon: "envelope", href: "/admin/contacts" },
  // { name: "DB Schema", icon: "data", href: "/admin/schema" },
  { name: "Categories", icon: "category", href: "/admin/categories" },
  { name: "Post Editor", icon: "editAlt", href: "/admin/posts/editor" },
  { name: "Posts", icon: "listUl", href: "/admin/posts" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <aside className="w-64 flex flex-col sticky top-5">
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
            const isActive =
              item.href === "/admin/posts"
                ? pathname === item.href
                : pathname.startsWith(item.href);

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
  );
}
