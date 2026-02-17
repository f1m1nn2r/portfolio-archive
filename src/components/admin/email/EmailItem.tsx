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
      className={`flex flex-col gap-4 p-4 transition-colors sm:gap-6 sm:p-6 lg:flex-row lg:gap-7.5 lg:p-10 hover:bg-gray-50 ${
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

      <div className="flex flex-1 flex-col gap-2 sm:gap-3 lg:flex-row lg:items-start lg:gap-7.5">
        <div className="-mt-0.5 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <span className="text-base font-medium sm:text-lg">{email.sender}</span>
            <span className="text-xs text-gray-555 sm:text-sm">{email.name_company}</span>
          </div>
          <p className="line-clamp-2 text-sm text-gray-700 sm:text-base">
            {email.content}
          </p>
        </div>
        <span className="whitespace-nowrap text-sm text-gray-555 sm:text-base">
          {formatDate(email.created_at)}
        </span>
      </div>
    </div>
  );
}
