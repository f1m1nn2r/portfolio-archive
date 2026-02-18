"use client";

import Image from "next/image";
import { AdminPageLayout } from "@/components/admin/layout/AdminPageLayout";
import {
  ProfileContactSection,
  ProfileIntroSection,
  ProfileLinkSection,
  useProfile,
} from "@/features/admin/profile";
import { SaveButton } from "@/components/common/SaveButton";

export default function ProfileSettingsPage() {
  const { formData, isLoading, handleInputChange, handleSave } = useProfile();

  return (
    <AdminPageLayout title="Profile Settings">
      <div className="flex flex-col gap-8">
        {/* 상단 짤 영역 */}
        <div className="w-full overflow-hidden">
          <Image
            src="/images/just-do-it.png"
            width={1500}
            height={600}
            alt="나 자신 화이팅"
            className="h-auto w-full"
          />
        </div>

        {/* 자기소개 관리 섹션 */}
        <ProfileIntroSection data={formData} onChange={handleInputChange} />

        {/* 연락처 정보 섹션 */}
        <ProfileContactSection data={formData} onChange={handleInputChange} />

        {/* 링크 연결 섹션 */}
        <ProfileLinkSection data={formData} onChange={handleInputChange} />
      </div>

      {/* 저장 버튼 */}
      <div className="flex justify-end mt-15">
        <SaveButton isLoading={isLoading} onClick={handleSave} />
      </div>
    </AdminPageLayout>
  );
}
