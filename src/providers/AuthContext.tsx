"use client";

import { SessionProvider } from "next-auth/react";
import { AdminProvider } from "@/providers/AdminProvider";

export default function AuthContext({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AdminProvider>{children}</AdminProvider>
    </SessionProvider>
  );
}
