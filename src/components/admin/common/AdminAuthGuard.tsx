import { Icon } from "@/components/common/Icon";
import { AdminAuthGuardProps } from "@/types/common/ui";

export function AdminAuthGuard({
  isMaster,
  password,
  onPasswordChange,
}: AdminAuthGuardProps) {
  if (!isMaster) {
    return (
      <div className="bg-point-pink text-black p-4 rounded-lg mb-6 flex items-center gap-2 text-base">
        <Icon type="infoSquare" size="24" />
        현재 읽기 전용 모드입니다. 수정하려면 관리자 권한이 필요합니다.
      </div>
    );
  }

  return (
    <section className="bg-bg-light p-6 rounded-lg border border-gray-ddd mb-8">
      <label className="text-base font-medium mb-3 block">관리자 인증</label>
      <input
        type="password"
        placeholder="수정하려면 관리자 비밀번호를 입력하세요."
        className="w-full p-3 border border-gray-ddd rounded-md bg-white outline-none focus:border-gray-555"
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
      />
    </section>
  );
}
