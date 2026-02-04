"use client";

import React, { Suspense } from "react";
import { AdminSidebar } from "@/components/admin/layout/AdminSidebar";
import { useAdminMode } from "@/hooks/common/useAdminMode";
import { LoadingState } from "@/components/common/LoadingState";
import { AdminProvider } from "@/providers/AdminProvider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isMaster, status, session } = useAdminMode();

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-light">
        <LoadingState message="권한 확인 및 데이터 로딩 중..." />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-light p-5">
        <div className="text-center bg-white p-10 rounded-lg shadow-sm border border-gray-ddd">
          <p className="text-lg font-medium text-gray-700 mb-4">
            로그인이 필요한 페이지입니다.
          </p>
          <a href="/auth/login" className="text-blue-500 underline">
            로그인하러 가기
          </a>
        </div>
      </div>
    );
  }

  return (
    <AdminProvider isMaster={isMaster}>
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
    </AdminProvider>
  );
}
