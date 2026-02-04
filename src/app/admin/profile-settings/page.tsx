"use client";

import Image from "next/image";
import { AdminPageLayout } from "@/components/admin/layout/AdminPageLayout";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { useProfileForm } from "@/hooks/profile/useProfileForm";
import { ProfileIntroSection } from "@/components/admin/profile-settings/ProfileIntroSection";
import { ProfileContactSection } from "@/components/admin/profile-settings/ProfileContactSection";
import { ProfileLinkSection } from "@/components/admin/profile-settings/ProfileLinkSection";

export default function ProfileSettingsPage() {
  const { isMaster, formData, isLoading, handleInputChange, handleSave } =
    useProfileForm();

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
          />
        </div>

        {/* 자기소개 관리 섹션 */}
        <ProfileIntroSection
          data={formData}
          onChange={handleInputChange}
          disabled={!isMaster}
        />

        {/* 연락처 정보 섹션 */}
        <ProfileContactSection
          data={formData}
          onChange={handleInputChange}
          disabled={!isMaster}
        />

        {/* 링크 연결 섹션 */}
        <ProfileLinkSection
          data={formData}
          onChange={handleInputChange}
          disabled={!isMaster}
        />
      </div>

      {/* 저장 버튼 */}
      <div className="flex justify-end mt-15">
        {isMaster && (
          <Button
            variant="ghost"
            size="md"
            onClick={() => handleSave()}
            disabled={isLoading}
            type="button"
          >
            <Icon type="save" />
            {isLoading ? "저장 중..." : "저장하기"}
          </Button>
        )}
      </div>
    </AdminPageLayout>
  );
}
