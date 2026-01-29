"use client";

import React, { Suspense } from "react"; 
import { AdminSidebar } from "@/components/admin/layout/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex min-h-screen bg-bg-light p-5 gap-2.5 items-start">
      <Suspense fallback={<div>Loading navigation...</div>}>
        <AdminSidebar />
      </Suspense>

      <main className="flex-1 overflow-y-auto">
        <Suspense fallback={<div>Loading admin content...</div>}>
          {children}
        </Suspense>
      </main>
    </div>
  );
}
