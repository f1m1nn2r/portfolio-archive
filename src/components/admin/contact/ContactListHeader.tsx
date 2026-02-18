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
    <div className="flex flex-col gap-3 border-b border-gray-ddd bg-bg-light/30 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-5">
      <div className="flex items-center gap-3 sm:gap-4">
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

      <div className="relative z-10 flex w-full flex-wrap gap-2 lg:w-auto lg:justify-end">
        <Button
          variant="secondary"
          size="md"
          onClick={onMarkAsRead}
          disabled={!isMaster || selectedCount === 0}
          className={`${!isMaster ? "opacity-50 cursor-not-allowed" : ""} w-full sm:w-auto`}
        >
          <Icon type="envelopeOpen" size={20} /> 읽음 표시
        </Button>
        {isMaster && (
          <Button
            variant="danger"
            size="md"
            onClick={onOpenDeleteModal}
            disabled={selectedCount === 0}
            className="w-full sm:w-auto"
          >
            <Icon type="trash" size={16} /> 삭제
          </Button>
        )}
      </div>
    </div>
  );
}
