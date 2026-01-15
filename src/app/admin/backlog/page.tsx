"use client";

import { SummaryCard } from "@/components/admin/SummaryCard";
import { Button } from "@/components/common/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icon } from "@/components/common/Icon";
import { MOCK_BACKLOG } from "@/mock/backlog";
import { Badge } from "@/components/common/Badge";
import { CommonPagination } from "@/components/common/Pagination";
import { useState } from "react";

export default function BacklogPage() {
  // ------------------ 테이블 영역
  const COLUMNS = [
    {
      label: (
        <button className="flex justify-center">
          <Icon type="filterAlt" size="20" />
          <Icon type="chevronDown" size="20" />
        </button>
      ),
      width: "w-15",
      center: true,
    },
    { label: "NO", width: "w-15", center: true },
    { label: "화면" },
    { label: "세부 페이지" },
    { label: "Epic" },
    { label: "기능", width: "w-1/4" },
    { label: "설명" },
    { label: "구현", center: true },
    { label: "디자인", center: true },
  ];

  // ------------------ 페이지네이션 영역
  const [page, setPage] = useState(1);
  const totalPages = 5; // 실제로는 API 결과값에서 받아옴

  // ------------------ 총 백로그 개수, 구현 완료 계산 (mock 데이터 기반)
  const [backlogData, setBacklogData] = useState(MOCK_BACKLOG);

  // 상태값 기반으로 요약 데이터 계산
  const totalCount = backlogData.length;
  const completedCount = backlogData.filter((item) => item.isDone).length;
  const completionRate =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // 상태 토글 핸들러
  const toggleStatus = (id: number, field: "isDone" | "isDesigned") => {
    setBacklogData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: !item[field] } : item
      )
    );
  };

  return (
    <div className="p-10 pb-25 min-h-screen bg-white rounded-lg border border-gray-ddd">
      <h1 className="text-2xl font-semibold mb-8 pb-8 border-b border-gray-ddd">
        Backlog
      </h1>

      {/* 상단 요약 영역 */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <SummaryCard
          title="총 백로그 개수"
          value={`${totalCount}개`}
          icon="barChartAlt2"
          bgColor="bg-bg-purple"
        />
        <SummaryCard
          title="구현 완료 상태"
          value={`${completionRate}%`}
          icon="listUl"
          bgColor="bg-bg-blue"
        />
      </div>

      <div className="mb-4 flex justify-end gap-2 border-b border-gray-50">
        <Button variant="secondary" icon="trash">
          선택 항목 삭제
        </Button>
        <Button variant="secondary" icon="chevronDown">
          필터
        </Button>
      </div>

      {/* 테이블 컨트롤 영역 */}
      <div className="bg-white rounded-lg border border-gray-ddd overflow-hidden">
        <Table>
          <TableHeader className="bg-bg-light">
            <TableRow>
              {COLUMNS.map((col, index) => (
                <TableHead
                  key={index}
                  className={`
                    border-r border-gray-ddd last:border-r-0
                    text-base font-medium py-3.5
                    ${col.center ? "text-center" : ""}
                  `}
                  style={{ width: col.width }}
                >
                  {col.label === "checkbox" ? (
                    <input type="checkbox" className="rounded" />
                  ) : (
                    col.label
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {backlogData.map((item, index) => (
              <TableRow
                key={item.id}
                className="text-base hover:bg-gray-50 transition-colors"
              >
                {/* 필터, 번호 */}
                <TableCell className="w-[60px] py-3.5 text-center border-r border-gray-ddd">
                  <input type="checkbox" />
                </TableCell>
                <TableCell className="w-[60px] text-center border-r border-gray-ddd">
                  {index + 1}
                </TableCell>

                {[
                  { val: item.screen, width: "w-[150px]" }, // 화면
                  { val: item.subPage, width: "w-[120px]" }, // 세부 페이지
                  {
                    val: item.epic,
                    width: "w-[150px]",
                    isBadge: true,
                    badgeColor: "#DBF0D6", // 원하는 배경색 전달
                  },
                  { val: item.feature, width: "w-[390px]" }, // 기능
                  { val: item.description, width: "w-[370px]" }, // 설명
                ].map((cell, i) => (
                  <TableCell
                    key={i}
                    className={`border-r border-gray-ddd ${cell.width} truncate`}
                  >
                    {cell.isBadge ? (
                      <Badge
                        backgroundColor={cell.badgeColor}
                        className="gap-1"
                      >
                        {cell.val}
                      </Badge>
                    ) : (
                      cell.val
                    )}
                  </TableCell>
                ))}

                {[
                  { key: "isDone", status: item.isDone },
                  { key: "isDesigned", status: item.isDesigned },
                ].map((cell, i) => (
                  <TableCell
                    key={i}
                    className={`w-[100px] text-center ${
                      i === 0 ? "border-r border-gray-ddd" : ""
                    }`}
                  >
                    <div
                      className="flex justify-center cursor-pointer"
                      onClick={() =>
                        toggleStatus(
                          item.id,
                          cell.key as "isDone" | "isDesigned"
                        )
                      }
                    >
                      <Icon
                        type={cell.status ? "checkboxChecked" : "checkbox"}
                        size={24}
                      />
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="p-4.5 px-2.5 border-t border-gray-ddd">
          <Button
            className="
              bg-transparent 
              p-0 
              text-gray-999 text-base 
              hover:text-gray-600 hover:bg-transparent 
              font-regular"
          >
            <Icon type="plus" size="16" />
            Add Column
          </Button>
        </div>
      </div>

      {/* 페이지네이션 */}
      <div className="mt-4">
        <CommonPagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>

      {/* Epic 관리 */}
      <div className="mt-7.5 border-gray-100">
        <h3 className="text-lg font-bold mb-5 pb-5 border-b border-gray-ddd">
          Epic 관리
        </h3>
        <div className="flex flex-wrap gap-2">
          <Badge backgroundColor="#DBF0D6">
            <Icon type="x" size="16" />
            경력 관리
          </Badge>
          <Badge backgroundColor="#C7E0E9">
            <Icon type="x" size="16" />
            Epic 태그가 들어갑니다.
          </Badge>
          <Button variant="secondary" className="text-gray-999">
            <Icon type="plus" size="16" />
            Add Epic
          </Button>
        </div>
      </div>
    </div>
  );
}
