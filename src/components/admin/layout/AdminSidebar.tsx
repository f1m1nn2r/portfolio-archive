"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { usePathname } from "next/navigation";
import { MenuItem } from "@/types/icon";
import { useAdmin } from "@/providers/AdminProvider";

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
  const { isMaster } = useAdmin();

  return (
    <aside className="w-full lg:sticky lg:top-5 lg:flex lg:h-[calc(100vh-60px)] lg:w-64 lg:flex-shrink-0 lg:flex-col">
      <div>
        <div
          className="
           bg-white p-2.5 rounded-lg border border-gray-ddd
          "
        >
          <Link href="/">
            <div className="flex w-fit items-center gap-2.5 rounded-lg">
              <div className="flex h-10 w-10 items-center justify-center gap-1.5 rounded-sm bg-black sm:h-11 sm:w-11">
                <div className="h-2.5 w-2.5 rounded-full bg-white"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-white"></div>
              </div>
              <span className="text-sm font-bold sm:text-base">Portfolio</span>
            </div>
          </Link>
        </div>

        <nav
          className="
          flex-1 
          mt-4 pt-4
          lg:mt-5 lg:pt-5
          relative
          after:content-[''] 
          after:absolute after:top-0 after:left-0 
          after:w-full after:h-[1px] 
          after:bg-gray-ddd"
        >
          <ul className="flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-2 lg:overflow-visible lg:pb-0">
            {menuItems.map((item) => {
              const isActive =
                item.href === "/admin/posts"
                  ? pathname === item.href
                  : pathname.startsWith(item.href);

                return (
                <li key={item.name} className="shrink-0">
                  <Link
                    href={item.href}
                    className={`flex items-center gap-2.5 rounded-lg p-2 transition-colors group lg:gap-3 lg:p-2.5 ${
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
                      className={`text-sm whitespace-nowrap lg:text-base ${
                        isActive ? "font-medium text-black" : "font-regular"
                      }`}
                    >
                      {item.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      {/* 하단 권한 표시 영역 추가 */}
      <div className="mt-4 rounded-lg border border-gray-ddd bg-white p-2.5 lg:mt-auto">
        <div className="flex w-fit items-center gap-2.5 rounded-lg">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black">
            <span className="text-[13px] font-semibold text-white">
              {isMaster ? "A" : "O"}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-[#1a1a1a]">
              {isMaster ? "Admin" : "Observer"}
            </span>
            <span className="font-bold text-base">
              {isMaster ? "관리자" : "옵저버"}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
