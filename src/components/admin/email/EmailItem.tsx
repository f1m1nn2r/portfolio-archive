import { Icon } from "@/components/common/Icon";
import { ContactMessage } from "@/types/admin/contact";

export function EmailItem({
  email,
  isSelected,
  onToggleSelect,
  onToggleStar,
}: {
  email: ContactMessage;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onToggleStar: (id: string) => void;
}) {
  return (
    <div
      className={`flex gap-7.5 p-10 hover:bg-gray-50 transition-colors ${
        !email.isRead ? "bg-white font-semibold" : "bg-white"
      }`}
    >
      <div className="flex items-start gap-2">
        <button
          onClick={() => onToggleSelect(email.id)}
          className="cursor-pointer hover:opacity-70"
          aria-label={isSelected ? "선택 해제" : "선택"}
        >
          <Icon type={isSelected ? "checkboxChecked" : "checkbox"} size={24} />
        </button>
        <button
          onClick={() => onToggleStar(email.id)}
          className="cursor-pointer pt-0.5 hover:opacity-70"
          aria-label={email.isStarred ? "즐겨찾기 해제" : "즐겨찾기"}
        >
          <Icon
            type="star"
            size={20}
            className={email.isStarred ? "text-yellow-400" : "text-black"}
          />
        </button>
      </div>

      <div className="flex-1 flex items-start gap-7.5">
        <div className="-mt-0.5 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg font-medium">{email.senderName}</span>
            <span className="text-sm text-gray-555">{email.senderEmail}</span>
          </div>
          <p className="text-base line-clamp-2 text-gray-700">
            {email.message}
          </p>
        </div>
        <span className="text-base text-gray-555 whitespace-nowrap">
          {new Date(email.receivedAt).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </span>
      </div>
    </div>
  );
}
