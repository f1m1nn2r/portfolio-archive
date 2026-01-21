"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { CommonPagination } from "@/components/common/Pagination";
import { Dropdown } from "@/components/common/Dropdown";
import { MOCK_EMAILS } from "@/mock/email";
import { AdminSummaryItem } from "@/types/admin";
import { AdminSummaryGrid } from "@/components/admin/layout/AdminSummaryGrid";
import { AdminPageLayout } from "@/components/admin/layout/AdminPageLayout";

export default function EmailPage() {
  const [emails, setEmails] = useState(MOCK_EMAILS);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const totalPages = 1;

  // ------------------ 계산된 데이터 (Memoization)
  const unreadCount = useMemo(
    () => emails.filter((e) => !e.isRead).length,
    [emails],
  );

  // ------------------ 핸들러 영역
  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id],
    );
  };

  const toggleStar = (id: number) => {
    setEmails((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isStarred: !e.isStarred } : e)),
    );
  };

  const deleteSelected = () => {
    if (confirm(`선택한 ${selectedIds.length}개의 메일을 삭제하시겠습니까?`)) {
      setEmails((prev) => prev.filter((e) => !selectedIds.includes(e.id)));
      setSelectedIds([]);
    }
  };

  const markAsRead = () => {
    setEmails((prev) =>
      prev.map((e) =>
        selectedIds.includes(e.id) ? { ...e, isRead: true } : e,
      ),
    );
    setSelectedIds([]);
  };

  // ------------------ 드롭다운 메뉴 아이템
  const filterMenuItems = [
    {
      label: "전체 선택",
      onClick: () => setSelectedIds(emails.map((e) => e.id)),
    },
    { label: "선택 해제", onClick: () => setSelectedIds([]) },
    {
      label: "읽은 메일",
      onClick: () =>
        setSelectedIds(emails.filter((e) => e.isRead).map((e) => e.id)),
    },
    {
      label: "읽지 않은 메일",
      onClick: () =>
        setSelectedIds(emails.filter((e) => !e.isRead).map((e) => e.id)),
    },
  ];

  // ------------------ 요약 아이템 배열 영역
  const summaryItems: AdminSummaryItem[] = [
    {
      title: "총 이메일",
      value: `${emails.length}개`,
      icon: "mailSend",
      bgColor: "bg-bg-purple",
    },
    {
      title: "읽지 않음",
      value: `${unreadCount}개`,
      icon: "envelopeOpen",
      bgColor: "bg-bg-blue",
    },
  ];

  return (
    <AdminPageLayout title="Email">
      {/* 상단 요약 영역 */}
      <AdminSummaryGrid items={summaryItems} />

      {/* 검색 및 필터 */}
      <div className="mb-4 flex justify-end gap-2">
        <div className="relative w-[300px]">
          <input
            type="text"
            placeholder="이메일 검색"
            className="w-full border border-gray-ddd rounded-sm py-2 px-10 text-base outline-none focus:border-gray-400"
          />
          <Icon
            type="search"
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
        <Button variant="secondary" size="md">
          필터 <Icon type="chevronDown" size={20} />
        </Button>
      </div>

      {/* 테이블 컨트롤러 */}
      <div className="bg-white rounded-lg border border-gray-ddd overflow-hidden">
        <div className="flex items-center justify-between px-10 py-5 border-b border-gray-ddd bg-bg-light/30">
          <div className="flex items-center gap-4">
            <Dropdown
              trigger={
                <div className="flex items-center cursor-pointer">
                  <Icon
                    type={
                      selectedIds.length === emails.length && emails.length > 0
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
              {selectedIds.length > 0
                ? `${selectedIds.length}개 선택됨`
                : "항목 선택"}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="md"
              onClick={markAsRead}
              disabled={selectedIds.length === 0}
            >
              <Icon type="envelopeOpen" size={20} /> 읽음 표시
            </Button>
            <Button
              variant="danger"
              size="md"
              onClick={deleteSelected}
              disabled={selectedIds.length === 0}
            >
              <Icon type="trash" size={16} /> 삭제
            </Button>
          </div>
        </div>

        {/* 이메일 리스트 */}
        <div className="flex flex-col">
          {emails.map((email) => (
            <div
              key={email.id}
              className={`flex gap-7.5 p-10 border-b border-gray-ddd last:border-b-0 hover:bg-gray-50 transition-colors ${!email.isRead ? "bg-white font-semibold" : "bg-white"}`}
            >
              <div className="flex items-start gap-2">
                <div
                  className="cursor-pointer"
                  onClick={() => toggleSelect(email.id)}
                >
                  <Icon
                    type={
                      selectedIds.includes(email.id)
                        ? "checkboxChecked"
                        : "checkbox"
                    }
                    size={24}
                  />
                </div>
                <div
                  className="cursor-pointer pt-0.5"
                  onClick={() => toggleStar(email.id)}
                >
                  <Icon
                    type="star"
                    size={20}
                    className={
                      email.isStarred ? "text-yellow-400" : "text-black"
                    }
                  />
                </div>
              </div>

              <div className="flex-1 flex items-start gap-7.5">
                <div className="-mt-0.5">
                  <span className="text-lg block mb-1">{email.sender}</span>
                  <span className="text-base line-clamp-1">{email.title}</span>
                </div>
                <span className="text-base whitespace-nowrap">
                  {email.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CommonPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </AdminPageLayout>
  );
}
