"use client";

import { useState } from "react";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { AdminPageLayout } from "@/components/admin/layout/AdminPageLayout";
import { AdminSummaryGrid } from "@/components/admin/layout/AdminSummaryGrid";
import { AdminActionBar } from "@/components/admin/layout/AdminActionBar";

import { AdminTableSection } from "@/components/admin/table/AdminTableSection";
import { Dropdown } from "@/components/common/Dropdown";
import { AdminSummaryItem } from "@/types/admin";
import { SCHEMA_DATA } from "@/mock/schema";
import { AdminTable } from "@/components/admin/table/AdminTable";

export default function DBSchemaPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // ------------------ 요약 아이템 계산
  const summaryItems: AdminSummaryItem[] = [
    {
      title: "총 테이블 개수",
      value: `${Object.keys(SCHEMA_DATA).length}개`,
      icon: "table",
      bgColor: "bg-bg-purple",
    },
    {
      title: "총 컬럼 개수",
      value: `${Object.values(SCHEMA_DATA).flat().length}개`,
      icon: "listUl",
      bgColor: "bg-bg-blue",
    },
  ];

  // ------------------ 테이블 컬럼 정의
  const SCHEMA_COLUMNS = [
    { label: "checkbox", width: "w-15", center: true },
    { label: "컬럼명", width: "w-1/8", key: "name" },
    { label: "타입", width: "w-1/6", key: "type" },
    { label: "제약 조건", width: "w-1/6", key: "constraint" },
    { label: "설명", key: "desc" },
  ];

  // ------------------ 핸들러
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id],
    );
  };

  const filterItems = [
    { label: "전체", onClick: () => {} },
    { label: "PK만 보기", onClick: () => {} },
  ];

  // ------------------ 테이블 렌더링 함수
  const renderSchemaTable = (tableName: string, data: any[]) => (
    <AdminTableSection
      title={`${tableName} 테이블 관리`}
      showDeleteButton
      onDelete={() => console.log(`${tableName} 삭제`)}
      actionButtons={
        <AdminActionBar>
          <Button
            variant="secondary"
            icon="trash"
            disabled={!selectedIds.some((id) => data.some((d) => d.id === id))}
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
      <AdminTable
        columns={SCHEMA_COLUMNS}
        data={data}
        selectedIds={selectedIds}
        onToggleSelect={toggleSelect}
        getItemId={(item) => item.id}
        renderCell={(item, col) => {
          if (col.key) return item[col.key as keyof typeof item];
          return null;
        }}
      />
    </AdminTableSection>
  );

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
        {renderSchemaTable("backlog", SCHEMA_DATA.backlog)}
        {renderSchemaTable("experience", SCHEMA_DATA.experience)}
        {renderSchemaTable("emails", SCHEMA_DATA.emails)}
        {renderSchemaTable("db_schema_management", SCHEMA_DATA.schema)}
      </div>
    </AdminPageLayout>
  );
}
