import { DeleteModalProps } from "@/types/common/ui";
import { Button } from "@/components/common/Button";
import { Icon } from "./Icon";

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = "정말 삭제하시겠어요?",
  description = "삭제 후에는 다시 되돌릴 수 없습니다.",
  isLoading = false,
}: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-[600px] rounded-2xl bg-white py-15 shadow-xl">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 cursor-pointer"
        >
          <Icon type="x" size={30} />
        </button>

        {/* 콘텐츠 영역 */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white text-red-400 absolute -top-8 shadow-sm">
            <Icon type="trash" size={36} />
          </div>

          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <p className="mb-6 text-base leading-relaxed">{description}</p>

          {/* 버튼 영역 */}
          <div className="flex justify-center w-full gap-3">
            <Button
              onClick={onClose}
              variant="ghost"
              size="lg"
              className="px-8"
            >
              취소
            </Button>
            <Button
              onClick={onConfirm}
              disabled={isLoading}
              variant="danger"
              size="lg"
              className="px-8"
            >
              {isLoading ? "삭제 중..." : "삭제"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
