import { Icon } from "@/components/common/Icon";
import { Badge } from "@/components/common/Badge";
import { Backlog } from "@/types/admin/backlog";
import { AdminTableColumn } from "@/types/admin/table";

export const BacklogColumns = (
  toggleStatus: (id: string, field: "isDone" | "isDesigned") => void,
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
    renderCell: (item) => <span className="truncate block">{item.screen}</span>,
  },
  {
    label: "세부 페이지",
    width: "w-[120px]",
    renderCell: (item) => (
      <span className="truncate block">{item.subPage}</span>
    ),
  },
  {
    label: "Epic",
    width: "w-[150px]",
    renderCell: (item) => (
      <Badge backgroundColor="#DBF0D6" className="gap-1">
        {item.epicId}
      </Badge>
    ),
  },
  {
    label: "기능",
    width: "w-[390px]",
    renderCell: (item) => (
      <span className="truncate block">{item.feature}</span>
    ),
  },
  {
    label: "설명",
    width: "w-[370px]",
    renderCell: (item) => (
      <span className="truncate block">{item.description}</span>
    ),
  },
  {
    label: "구현",
    center: true,
    width: "w-[100px]",
    renderCell: (item) => (
      <button
        onClick={() => toggleStatus(item.id, "isDone")}
        className="flex justify-center cursor-pointer hover:opacity-70"
        aria-label={`구현 상태 토글: ${item.isDone ? "완료" : "미완료"}`}
      >
        <Icon type={item.isDone ? "checkboxChecked" : "checkbox"} size={24} />
      </button>
    ),
  },
  {
    label: "디자인",
    center: true,
    width: "w-[100px]",
    renderCell: (item) => (
      <button
        onClick={() => toggleStatus(item.id, "isDesigned")}
        className="flex justify-center cursor-pointer hover:opacity-70"
        aria-label={`디자인 상태 토글: ${item.isDesigned ? "완료" : "미완료"}`}
      >
        <Icon
          type={item.isDesigned ? "checkboxChecked" : "checkbox"}
          size={24}
        />
      </button>
    ),
  },
];
