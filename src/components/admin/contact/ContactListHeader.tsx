import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { Dropdown } from "@/components/common/Dropdown";
import { ContactListHeaderProps } from "@/types/ui/contact";

export function ContactListHeader({
  selectedCount,
  totalCount,
  isMaster,
  filterMenuItems,
  onMarkAsRead,
  onOpenDeleteModal,
}: ContactListHeaderProps) {
  return (
    <div className="flex items-center justify-between px-10 py-5 border-b border-gray-ddd bg-bg-light/30">
      <div className="flex items-center gap-4">
        <Dropdown
          trigger={
            <div className="flex items-center cursor-pointer">
              <Icon
                type={
                  selectedCount === totalCount && totalCount > 0
                    ? "checkboxChecked"
                    : "checkbox"
                }
                size={24}
              />
              <Icon type="chevronDown" size={20} />
            </div>
          }
          items={filterMenuItems}
        />
        <p className="text-base text-gray-555 font-medium">
          {selectedCount > 0 ? `${selectedCount}개 선택됨` : "항목 선택"}
        </p>
      </div>

      <div className="flex gap-2 relative z-10">
        <Button
          variant="secondary"
          size="md"
          onClick={onMarkAsRead}
          disabled={!isMaster || selectedCount === 0}
          className={!isMaster ? "opacity-50 cursor-not-allowed" : ""}
        >
          <Icon type="envelopeOpen" size={20} /> 읽음 표시
        </Button>
        {isMaster && (
          <Button
            variant="danger"
            size="md"
            onClick={onOpenDeleteModal}
            disabled={selectedCount === 0}
          >
            <Icon type="trash" size={16} /> 삭제
          </Button>
        )}
      </div>
    </div>
  );
}
