import { useSearchParams } from "next/navigation";
import { useState } from "react";

export function useAdminMode() {
  const searchParams = useSearchParams();
  const isMaster = searchParams.get("mode") === "master";

  const [adminPassword, setAdminPassword] = useState("");

  return {
    isMaster,
    adminPassword,
    setAdminPassword,
  };
}
