import { Icon } from "@/components/common/Icon";
import { useAdmin } from "@/providers/AdminProvider";

export function AdminAuthGuard() {
  const { isMaster } = useAdmin();

  // 관리자(Admin)일 때
  if (isMaster) {
    return (
      <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-8 flex items-center gap-2 text-base border border-green-200">
        <Icon type="userCircle" size={24} />
        관리자 계정으로 로그인 되었습니다.
      </div>
    );
  }

  // 관리자가 아닐 때 (옵저버 또는 비로그인)
  return (
    <div className="bg-point-pink text-black p-4 rounded-lg mb-8 flex items-center gap-2 text-base">
      <Icon type="infoSquare" size={24} />
      현재 읽기 전용 모드입니다. 수정하려면 관리자 계정으로 로그인이 필요합니다.
    </div>
  );
}
