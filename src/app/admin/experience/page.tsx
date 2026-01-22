"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { CommonPagination } from "@/components/common/Pagination";
import { ExperienceModal } from "@/components/admin/experience/ExperienceModal";
import { AdminPageLayout } from "@/components/admin/layout/AdminPageLayout";
import { AdminSummaryGrid } from "@/components/admin/layout/AdminSummaryGrid";
import { AdminActionBar } from "@/components/admin/layout/AdminActionBar";
import { Experience } from "@/types/api/experience";
import { ExperienceCard } from "@/components/admin/experience/ExperienceCard";
import { useExperience } from "@/hooks/useExperience";
import { calculateTotalExperience } from "@/utils/date";
import { AdminSummaryItem } from "@/types/admin/layout";
import { LoadingState } from "@/components/common/LoadingState";

export default function ExperiencePage() {
  const [page, setPage] = useState(1);
  const totalPages = 1;

  // 커스텀 훅 사용
  const { experiences, loading, fetchExperiences, deleteExperience } =
    useExperience();

  // 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);

  // 모달 핸들러
  const openAddModal = () => {
    setSelectedExperience(null);
    setModalMode("add");
    setIsModalOpen(true);
  };

  const openEditModal = (exp: Experience) => {
    setSelectedExperience(exp);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleSaveSuccess = () => {
    setIsModalOpen(false);
    fetchExperiences();
  };

  const summaryItems: AdminSummaryItem[] = useMemo(
    () => [
      {
        title: "총 경력",
        value: calculateTotalExperience(experiences),
        icon: "briefcase",
        bgColor: "bg-bg-purple",
      },
      {
        title: "등록된 회사 수",
        value: `${experiences.length}개`,
        icon: "building",
        bgColor: "bg-bg-blue",
      },
    ],
    [experiences],
  );

  if (loading) {
    return (
      <AdminPageLayout title="Experience">
        <LoadingState message="경력을 불러오는 중..." />
      </AdminPageLayout>
    );
  }

  return (
    <AdminPageLayout title="Experience">
      {/* 요약 */}
      <AdminSummaryGrid items={summaryItems} />

      {/* 액션 바 */}
      <AdminActionBar>
        <Button
          variant="secondary"
          className="border-gray-ddd"
          onClick={openAddModal}
        >
          <Icon type="plus" size={16} />새 경력 추가
        </Button>
      </AdminActionBar>

      {/* 경력 리스트 */}
      <div className="flex flex-col gap-6 mb-10">
        {experiences.length === 0 ? (
          <div className="text-center py-20 text-gray-555">
            등록된 경력이 없습니다.
          </div>
        ) : (
          experiences.map((exp) => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              onEdit={openEditModal}
              onDelete={deleteExperience}
            />
          ))
        )}
      </div>

      {/* 모달 */}
      <ExperienceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        initialData={selectedExperience}
        onSaveSuccess={handleSaveSuccess}
      />

      {/* 페이지네이션 */}
      <CommonPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </AdminPageLayout>
  );
}
