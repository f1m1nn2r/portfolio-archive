import { Icon } from "@/components/common/Icon";
import { Backlog, Epic } from "@/types/admin/backlog";
import { AdminTableColumn } from "@/types/admin/table";
import { AdminEditableCell } from "@/components/admin/table/AdminEditableCell";
import { BacklogEpicMultiSelectCell } from "./BacklogEpicMultiSelectCell";
import { cn } from "@/lib/utils";

export const BacklogColumns = (
  updateField: <K extends keyof Backlog>(
    id: string,
    field: K,
    value: Backlog[K],
  ) => void,
  currentPage: number,
  allEpics: readonly Epic[],
  isMaster?: boolean,
): AdminTableColumn<Backlog>[] => [
  {
    label: "checkbox",
    width: "w-15",
    center: true,
  },
  {
    label: "NO",
    width: "w-15",
    center: true,
    renderCell: (_, index) => {
      const itemsPerPage = 20; // 한 페이지당 개수
      const calculatedNo = (currentPage - 1) * itemsPerPage + index + 1;
      return <span>{calculatedNo}</span>;
    },
  },
  {
    label: "화면",
    width: "w-[150px]",
    renderCell: (item) => (
      <AdminEditableCell
        value={item.screen}
        onSave={(val) => updateField(item.id, "screen", val)}
        isEditable={isMaster}
      />
    ),
  },
  {
    label: "세부 페이지",
    width: "w-[120px]",
    renderCell: (item) => (
      <AdminEditableCell
        value={item.sub_page}
        onSave={(val) => updateField(item.id, "sub_page", val)}
        isEditable={isMaster}
      />
    ),
  },
  {
    label: "Epic",
    width: "w-[200px]",
    renderCell: (item) => (
      <BacklogEpicMultiSelectCell
        selectedIds={item.epic_ids || []}
        allEpics={allEpics}
        onToggle={(epicId) => {
          const currentIds = item.epic_ids || [];
          const newIds = currentIds.includes(epicId)
            ? currentIds.filter((id) => id !== epicId)
            : [...currentIds, epicId];

          updateField(item.id, "epic_ids", newIds);
        }}
        isMaster={isMaster}
      />
    ),
  },
  {
    label: "기능",
    width: "w-[390px]",
    renderCell: (item) => (
      <AdminEditableCell
        value={item.feature}
        onSave={(val) => updateField(item.id, "feature", val)}
        isEditable={isMaster}
      />
    ),
  },
  {
    label: "설명",
    width: "w-[370px]",
    renderCell: (item) => (
      <AdminEditableCell
        value={item.description}
        onSave={(val) => updateField(item.id, "description", val)}
        isEditable={isMaster}
      />
    ),
  },
  {
    label: "구현",
    center: true,
    width: "w-[100px]",
    renderCell: (item) => (
      <button
        onClick={() => updateField(item.id, "is_done", !item.is_done)}
        className={cn(
          "flex justify-center mx-auto",
          isMaster && "cursor-pointer hover:opacity-70",
        )}
        aria-label={`구현 상태 토글: ${item.is_done ? "완료" : "미완료"}`}
        disabled={!isMaster}
      >
        <Icon type={item.is_done ? "checkboxChecked" : "checkbox"} size={24} />
      </button>
    ),
  },
  {
    label: "디자인",
    center: true,
    width: "w-[100px]",
    renderCell: (item) => (
      <button
        onClick={() => updateField(item.id, "is_designed", !item.is_designed)}
        className={cn(
          "flex justify-center mx-auto",
          isMaster && "cursor-pointer hover:opacity-70",
        )}
        aria-label={`디자인 상태 토글: ${item.is_designed ? "완료" : "미완료"}`}
        disabled={!isMaster}
      >
        <Icon
          type={item.is_designed ? "checkboxChecked" : "checkbox"}
          size={24}
        />
      </button>
    ),
  },
];
