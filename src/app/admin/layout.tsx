"use client";

import React, { Suspense, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/layout/AdminSidebar";
import { LoadingState } from "@/components/common/LoadingState";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "loading" && !session) {
      router.replace("/login");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-light">
        <LoadingState message="권한 확인 및 데이터 로딩 중..." />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-bg-light p-5 gap-5 items-start">
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
