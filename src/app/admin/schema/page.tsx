"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { AdminPageLayout } from "@/components/admin/layout/AdminPageLayout";
import { AdminSummaryGrid } from "@/components/admin/layout/AdminSummaryGrid";
import { AdminActionBar } from "@/components/admin/layout/AdminActionBar";
import { SchemaItem } from "@/types/admin";
import { SCHEMA_DATA } from "@/mock/schema";
import { SchemaTable } from "@/components/admin/schema/SchemaTable";
import { useSelectionData } from "@/hooks/common/useSelectionData";
import { useSelectionHandler } from "@/hooks/common/useSelectionHandler";
import { AdminTableColumn } from "@/types/admin/table";
import { useSummaryData } from "@/hooks/common/useSummaryData";
import { LoadingState } from "@/components/common/LoadingState";

const SCHEMA_COLUMNS: AdminTableColumn<SchemaItem>[] = [
  { label: "checkbox", width: "w-15", center: true },
  { label: "컬럼명", width: "w-1/8", key: "name" },
  { label: "타입", width: "w-1/6", key: "type" },
  { label: "제약 조건", width: "w-1/6", key: "constraint" },
  { label: "설명", key: "desc" },
];

const TABLE_NAMES: Record<string, string> = {
  backlog: "backlog",
  experience: "experience",
  emails: "emails",
  schema: "db_schema_management",
};

export default function DBSchemaPage() {
  const [loading, setLoading] = useState(true);

  const allSchemaData = useMemo(
    () => Object.values(SCHEMA_DATA).flat() as SchemaItem[],
    [],
  );

  const { data: schemaData, deleteItems } = useSelectionData(allSchemaData);

  const { selectedIds, toggleSelect, toggleSelectAll } = useSelectionHandler({
    data: schemaData,
    getId: (item) => item.id,
    onDelete: deleteItems,
  });

  const summaryItems = useSummaryData([
    {
      icon: "table",
      bgColor: "bg-bg-purple",
      label: "총 테이블 개수",
      getValue: () => `${Object.keys(SCHEMA_DATA).length}개`,
    },
    {
      icon: "listUl",
      bgColor: "bg-bg-blue",
      label: "총 컬럼 개수",
      getValue: () => `${schemaData.length}개`,
    },
  ]);

  // 필터 아이템
  const filterItems = [
    { label: "전체", onClick: () => console.log("전체 보기") },
    { label: "PK만 보기", onClick: () => console.log("PK만 보기") },
  ];

  // 테이블별 선택 항목 삭제 핸들러
  const handleDeleteSelected = (tableName: string, data: SchemaItem[]) => {
    const tableIds = data.map((d) => d.id);
    const selectedInTable = selectedIds.filter((id) =>
      tableIds.includes(String(id)),
    );
    console.log(`${tableName} 테이블에서 삭제:`, selectedInTable);
    deleteItems(selectedInTable);
  };

  // 테이블 삭제 핸들러
  const handleDeleteTable = (tableName: string) => {
    console.log(`${tableName} 테이블 전체 삭제`);
    // 해당 테이블의 모든 항목 삭제
    const tableData = SCHEMA_DATA[
      tableName as keyof typeof SCHEMA_DATA
    ] as SchemaItem[];
    const tableIds = tableData.map((item) => item.id);
    deleteItems(tableIds);
  };

  return (
    <AdminPageLayout title="DB Schema">
      {/* 상단 요약 영역 */}
      <AdminSummaryGrid items={summaryItems} />

      {/* 컨트롤 버튼 영역 */}
      <AdminActionBar>
        <Button variant="secondary" className="border-gray-ddd">
          <Icon type="plus" size={16} /> 새 테이블 추가
        </Button>
      </AdminActionBar>

      {/* 테이블 영역 */}
      <div className="space-y-12">
        {Object.entries(SCHEMA_DATA).map(([tableKey, tableData]) => (
          <SchemaTable
            key={tableKey}
            tableName={TABLE_NAMES[tableKey] || tableKey}
            data={tableData as SchemaItem[]}
            columns={SCHEMA_COLUMNS}
            selectedIds={selectedIds}
            // 빌드 에러 수정을 위하여 우선 수정
            onToggleSelect={(id) => toggleSelect(String(id))}
            onToggleSelectAll={toggleSelectAll}
            onDeleteTable={handleDeleteTable}
            onDeleteSelected={handleDeleteSelected}
            filterItems={filterItems}
          />
        ))}
      </div>
    </AdminPageLayout>
  );
}
