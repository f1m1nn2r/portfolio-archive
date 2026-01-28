import { Icon } from "@/components/common/Icon";
import { Backlog } from "@/types/admin/backlog";
import { AdminTableColumn } from "@/types/admin/table";
import { AdminEditableCell } from "@/components/admin/table/AdminEditableCell";

export const BacklogColumns = (
  updateField: <K extends keyof Backlog>(
    id: string,
    field: K,
    value: Backlog[K],
  ) => void,
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
    renderCell: (item) => item.no,
  },
  {
    label: "화면",
    width: "w-[150px]",
    renderCell: (item) => (
      <AdminEditableCell
        value={item.screen}
        onSave={(val) => updateField(item.id, "screen", val)}
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
        className="flex justify-center cursor-pointer hover:opacity-70 mx-auto"
        aria-label={`구현 상태 토글: ${item.is_done ? "완료" : "미완료"}`}
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
        className="flex justify-center cursor-pointer hover:opacity-70 mx-auto"
        aria-label={`디자인 상태 토글: ${item.is_designed ? "완료" : "미완료"}`}
      >
        <Icon
          type={item.is_designed ? "checkboxChecked" : "checkbox"}
          size={24}
        />
      </button>
    ),
  },
];
