"use client";

import { Button } from "@/components/common/Button";
import { AdminActionBar } from "@/components/admin/layout/AdminActionBar";
import { AdminTableSection } from "@/components/admin/table/AdminTableSection";
import { AdminTable } from "@/components/admin/table/AdminTable";
import { Dropdown } from "@/components/common/Dropdown";
import { SchemaItem, SchemaTableProps } from "@/types/admin";

export function SchemaTable({
  tableName,
  data,
  columns,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onDeleteTable,
  onDeleteSelected,
  filterItems,
}: SchemaTableProps) {
  const hasSelectedInTable = selectedIds.some((id) =>
    data.some((d) => d.id === String(id)),
  );

  return (
    <AdminTableSection
      title={`${tableName} 테이블 관리`}
      showDeleteButton
      onDelete={() => onDeleteTable(tableName)}
      actionButtons={
        <AdminActionBar>
          <Button
            variant="secondary"
            icon="trash"
            disabled={!hasSelectedInTable}
            onClick={() => onDeleteSelected(tableName, data)}
          >
            선택 항목 삭제
          </Button>
          <Dropdown
            trigger={
              <Button variant="secondary" icon="chevronDown">
                필터
              </Button>
            }
            items={filterItems}
          />
        </AdminActionBar>
      }
    >
      <AdminTable<SchemaItem>
        columns={columns}
        data={data}
        selectedIds={selectedIds}
        onToggleSelect={onToggleSelect}
        onToggleSelectAll={onToggleSelectAll}
        getItemId={(item) => item.id}
      />
    </AdminTableSection>
  );
}
