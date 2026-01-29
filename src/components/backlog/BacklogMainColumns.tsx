import { Backlog, Epic } from "@/types/admin/backlog";
import { AdminTableColumn } from "@/types/admin/table";
import { Badge } from "@/components/common/Badge";
import { Icon } from "@/components/common/Icon";
import { cn } from "@/lib/utils";

export const BacklogMainColumns = (
  allEpics: readonly Epic[],
  currentPage: number,
  isMaster?: boolean,
): AdminTableColumn<Backlog>[] => [
  {
    label: "NO",
    width: "w-16",
    center: true,
    renderCell: (_, index) => {
      const itemsPerPage = 20;
      return <span>{(currentPage - 1) * itemsPerPage + index + 1}</span>;
    },
  },
  {
    label: "화면",
    width: "w-[150px]",
    renderCell: (item) => (
      <span className={cn("font-medium", !isMaster && "pointer-events-none")}>
        {item.screen}
      </span>
    ),
  },
  {
    label: "Epic",
    width: "w-[180px]",
    renderCell: (item) => (
      <div
        className={cn(
          "flex flex-wrap gap-1",
          !isMaster && "pointer-events-none",
        )}
      >
        {item.epic_ids?.map((id) => {
          const epic = allEpics.find((e) => e.id === id);
          return epic ? (
            <Badge key={id} backgroundColor={epic.color}>
              {epic.label}
            </Badge>
          ) : null;
        })}
      </div>
    ),
  },
  {
    label: "기능",
    width: "w-[250px]",
    renderCell: (item) => (
      <span
        className={cn("truncate block", !isMaster && "pointer-events-none")}
      >
        {item.feature}
      </span>
    ),
  },
  {
    label: "설명",
    width: "w-[350px]",
    renderCell: (item) => (
      <span
        className={cn(
          "whitespace-normal break-all",
          !isMaster && "pointer-events-none",
        )}
        title={item.description}
      >
        {item.description || "-"}
      </span>
    ),
  },
  {
    label: "상태",
    center: true,
    width: "w-[100px]",
    renderCell: (item) => (
      <div
        className={cn("flex justify-center", !isMaster && "pointer-events-none")}
      >
        <Icon type={item.is_done ? "checkboxChecked" : "checkbox"} size={24} />
      </div>
    ),
  },
];
