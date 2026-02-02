"use client";

import Image from "next/image";
import { AdminPageLayout } from "@/components/admin/layout/AdminPageLayout";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { LoadingState } from "@/components/common/LoadingState";
import { useProfileForm } from "@/hooks/profile/useProfileForm";
import { AdminAuthGuard } from "@/components/admin/common/AdminAuthGuard";
import { useAdminMode } from "@/hooks/common/useAdminMode";

export default function ProfileSettingsPage() {
  const { isMaster } = useAdminMode();
  const { formData, isLoading, handleInputChange, handleSave } =
    useProfileForm();

  const inputStyles =
    "w-full p-5 border border-gray-ddd rounded-lg text-base outline-none focus:border-gray-555 transition-colors";

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
        <section className="flex flex-col gap-6">
          <h3 className="text-lg font-bold pb-5 border-b border-gray-ddd">
            자기소개 관리
          </h3>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="text-base font-medium">타이틀</label>
              <p className="text-sm text-gray-555 mt-1 mb-4">
                메인 페이지 상단의 타이틀을 결정하는 영역입니다.
              </p>
              <textarea
                className={`${inputStyles} min-h-[200px]`}
                value={formData.main_title}
                onChange={(e) =>
                  handleInputChange("main_title", e.target.value)
                }
                disabled={!isMaster}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-base font-medium">상세 소개</label>
              <p className="text-sm text-gray-555 mt-1 mb-4">
                타이틀 하단에 소개 내용이 들어갑니다.
              </p>
              <textarea
                className={`${inputStyles} min-h-[200px]`}
                value={formData.main_description}
                onChange={(e) =>
                  handleInputChange("main_description", e.target.value)
                }
                disabled={!isMaster}
              />
            </div>
          </div>
        </section>

        {/* 연락처 정보 섹션 */}
        <section className="flex flex-col gap-5">
          <h3 className="text-lg font-bold pb-5 border-b border-gray-ddd">
            연락처 정보
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
              <label className="text-base font-medium">전화번호</label>
              <input
                className={inputStyles}
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                disabled={!isMaster}
              />
            </div>
            <div className="flex flex-col gap-4">
              <label className="text-base font-medium">이메일</label>
              <input
                className={inputStyles}
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                disabled={!isMaster}
              />
            </div>
          </div>
        </section>

        {/* 링크 연결 섹션 */}
        <section className="flex flex-col gap-5">
          <h3 className="text-lg font-bold pb-5 border-b border-gray-ddd">
            링크 연결
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-base font-medium">이력서</label>
              <input
                className={inputStyles}
                placeholder="URL을 입력하세요."
                value={formData.resume_url}
                onChange={(e) =>
                  handleInputChange("resume_url", e.target.value)
                }
                disabled={!isMaster}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-base font-medium">포트폴리오 PDF</label>
              <input
                className={inputStyles}
                placeholder="URL을 입력하세요."
                value={formData.pdf_url}
                onChange={(e) => handleInputChange("pdf_url", e.target.value)}
                disabled={!isMaster}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-base font-medium">깃허브</label>
              <input
                className={inputStyles}
                value={formData.github_url}
                onChange={(e) =>
                  handleInputChange("github_url", e.target.value)
                }
                disabled={!isMaster}
              />
            </div>
          </div>
        </section>
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
