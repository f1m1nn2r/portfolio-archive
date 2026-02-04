"use client";

import React, { createContext, useContext } from "react";

interface AdminContextType {
  isMaster: boolean;
}

const AdminContext = createContext<AdminContextType>({ isMaster: false });

export const AdminProvider = ({
  children,
  isMaster,
}: {
  children: React.ReactNode;
  isMaster: boolean;
}) => {
  return (
    <AdminContext.Provider value={{ isMaster }}>
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
