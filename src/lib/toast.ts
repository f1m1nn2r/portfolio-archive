import { toast } from "sonner";

export const showToast = {
  // 기본 알림
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message || "문제가 발생했습니다."),
  info: (message: string) => toast(message),

  // 관리자 CRUD 전용
  save: (mode: "add" | "edit") =>
    toast.success(
      mode === "add" ? "성공적으로 추가되었습니다." : "수정이 완료되었습니다.",
    ),

  delete: () => toast.success("삭제되었습니다."),

  // 약속(Promise) 기반 토스트
  promise: (
    promise: Promise<any>,
    {
      loading,
      success,
      error,
    }: { loading: string; success: string; error: string },
  ) => {
    return toast.promise(promise, {
      loading,
      success,
      error,
    });
  },
};
