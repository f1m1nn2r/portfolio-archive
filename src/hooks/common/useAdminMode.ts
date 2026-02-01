import { useSession } from "next-auth/react";

export function useAdminMode() {
  const { data: session, status } = useSession();

  // 로그인한 유저의 role이 admin일 때
  const isMaster = session?.user?.role === "admin";

  // 로그인한 유저의 role이 observer일 때
  const isObserver = session?.user?.role === "observer";

  return {
    isMaster,
    isObserver,
    status, // 세션 로딩 상태 (authenticated, loading, unauthenticated)
    user: session?.user,
    session,
    // 기존 코드와의 호환성을 위해 남겨두되, 이제 사용하지는 않음
    adminPassword: "",
    setAdminPassword: () => {},
  };
}
