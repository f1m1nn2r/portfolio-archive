"use client";

import { AdminPageLayout } from "@/components/admin/layout/AdminPageLayout";
import { ExperienceManagementSection } from "@/components/admin/experience/ExperienceManagementSection";
import { ProjectManagementSection } from "@/components/admin/project/ProjectManagementSection";

export default function ExperiencePage() {
  return (
    <AdminPageLayout title="Experience">
      {/* 경력 관리 섹션 */}
      <ExperienceManagementSection />

      {/* 작업물 관리 섹션 */}
      <ProjectManagementSection />
    </AdminPageLayout>
  );
}
