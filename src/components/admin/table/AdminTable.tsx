import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icon } from "@/components/common/Icon";
import { Button } from "@/components/common/Button";
import { AdminTableProps } from "@/types/admin";

export function AdminTable<T>({
  columns,
  data,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  showAddColumn = true,
  getItemId,
  rowClassName,
  onAdd,
}: AdminTableProps<T> & { onAdd?: () => void }) {
  return (
    <div className="bg-white rounded-lg border border-gray-ddd">
      <div className="overflow-x-auto">
        <Table className="min-w-[860px] table-fixed">
          <TableHeader className="bg-bg-light">
            <TableRow>
              {columns.map((col, index) => (
                <TableHead
                  key={index}
                  className={`
                  border-r border-gray-ddd last:border-r-0
                  text-base font-medium py-3.5
                  ${col.center ? "text-center" : ""}
                  ${col.width || ""}
                `}
                >
                  {col.renderHeader ? (
                    col.renderHeader()
                  ) : col.label === "checkbox" ? (
                    <div
                      className="flex justify-center cursor-pointer"
                      onClick={onToggleSelectAll}
                    >
                      <Icon
                        type={
                          selectedIds.length === data.length && data.length > 0
                            ? "checkboxChecked"
                            : "checkbox"
                        }
                        size={24}
                      />
                    </div>
                  ) : (
                    col.label
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-40 text-center text-gray-555 text-base"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Icon type="bookContent" size={40} />
                    <p>데이터가 없습니다.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data.map((item, rowIndex) => {
                const itemId = getItemId(item);
                const isSelected = selectedIds.includes(itemId);

                return (
                  <TableRow
                    key={String(itemId)}
                    className={
                      rowClassName
                        ? rowClassName(item, isSelected)
                        : `text-base hover:bg-gray-50 transition-colors ${isSelected ? "bg-gray-50" : ""}`
                    }
                  >
                    {columns.map((col, colIndex) => (
                      <TableCell
                        key={colIndex}
                        className={`border-r border-gray-ddd last:border-r-0 ${col.center ? "text-center" : ""} ${col.width || ""} py-3.5`}
                      >
                        {col.renderCell ? (
                          col.renderCell(item, rowIndex)
                        ) : col.label === "checkbox" ? (
                          <div
                            className="flex justify-center cursor-pointer"
                            onClick={() => onToggleSelect?.(itemId)}
                          >
                            <Icon
                              type={isSelected ? "checkboxChecked" : "checkbox"}
                              size={24}
                            />
                          </div>
                        ) : (
                          col.key && String((item as any)[col.key])
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        {showAddColumn && (
          <div className="p-4.5 px-2.5 border-t border-gray-ddd">
            <Button
              className="bg-transparent p-0 text-gray-999 text-base hover:text-gray-600 hover:bg-transparent font-regular"
              onClick={(e) => {
                e.stopPropagation();
                onAdd?.();
              }}
            >
              <Icon type="plus" size="16" />
              Add Column
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
