"use client";

import React, { createContext, useContext, useMemo } from "react";
import { useSession } from "next-auth/react";

interface AdminContextType {
  isMaster: boolean;
  isObserver: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: session } = useSession();

  const value = useMemo(
    () => ({
      isMaster: session?.user?.role === "admin",
      isObserver: session?.user?.role === "observer",
    }),
    [session?.user?.role],
  );

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
