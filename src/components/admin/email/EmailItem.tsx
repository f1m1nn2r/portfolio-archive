import { Icon } from "@/components/common/Icon";
import { formatDate } from "@/lib/date";
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
        !email.is_read ? "bg-white font-semibold" : "bg-white"
      }`}
    >
      <div className="flex items-start gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSelect(email.id);
          }}
          className="cursor-pointer hover:opacity-70"
          aria-label={isSelected ? "선택 해제" : "선택"}
        >
          <Icon type={isSelected ? "checkboxChecked" : "checkbox"} size={24} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleStar(email.id);
          }}
          className="cursor-pointer pt-0.5 hover:opacity-70"
          aria-label={email.is_starred ? "즐겨찾기 해제" : "즐겨찾기"}
        >
          <Icon
            type="star"
            size={20}
            className={email.is_starred ? "text-yellow-400" : "text-black"}
          />
        </button>
      </div>

      <div className="flex-1 flex items-start gap-7.5">
        <div className="-mt-0.5 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg font-medium">{email.sender}</span>
            <span className="text-sm text-gray-555">{email.name_company}</span>
          </div>
          <p className="text-base line-clamp-2 text-gray-700">
            {email.content}
          </p>
        </div>
        <span className="text-base text-gray-555 whitespace-nowrap">
          {formatDate(email.created_at)}
        </span>
      </div>
    </div>
  );
}
