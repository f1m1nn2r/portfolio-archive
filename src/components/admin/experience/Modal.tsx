"use client";

import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { Badge } from "@/components/common/Badge";
import { ExperienceModalProps } from "@/types/admin";

// 반복되는 섹션 레이아웃
const FormSection = ({
  title,
  children,
  isFirst = false,
}: {
  title: string;
  children: React.ReactNode;
  isFirst?: boolean;
}) => (
  <section
    className={`space-y-4 ${isFirst ? "" : "pt-12.5 border-t border-gray-ddd"}`}
  >
    <h3 className="text-lg font-semibold text-gray-555 uppercase tracking-wider mb-7.5">
      {title}
    </h3>
    <div className="space-y-6">{children}</div>
  </section>
);

// 라벨 + 입력창 조합
const FormField = ({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) => (
  <div className="space-y-2">
    <label className="text-base font-medium inline-block mb-4">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {children}
  </div>
);

export const ExperienceModal = ({
  isOpen,
  onClose,
  mode,
}: ExperienceModalProps) => {
  if (!isOpen) return null;

  const inputStyles =
    "w-full p-5 border border-gray-ddd rounded-lg text-base outline-none focus:border-gray-555 transition-colors";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg w-full max-w-[1200px] max-h-[90vh] flex flex-col overflow-hidden shadow-xl">
        {/* 헤더 고정 영역 */}
        <div className="flex items-center justify-between p-7.5 border-b border-gray-100">
          <h2 className="text-2xl font-semibold">
            {mode === "edit" ? "경력 수정" : "경력 추가"}
          </h2>
          <button
            onClick={onClose}
            className="cursor-pointer hover:opacity-70 transition-opacity"
          >
            <Icon type="x" size={36} />
          </button>
        </div>

        {/* 폼 영역 */}
        <div className="flex-1 overflow-y-auto p-10 space-y-12.5">
          <FormSection title="기본 정보" isFirst>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="회사명" required>
                <input
                  type="text"
                  placeholder="주식회사 아이스크림 에듀"
                  className={inputStyles}
                />
              </FormField>
              <FormField label="직책/역할" required>
                <input
                  type="text"
                  placeholder="전략기획팀/사원"
                  className={inputStyles}
                />
              </FormField>
            </div>
            <FormField label="설명">
              <textarea
                rows={5}
                placeholder="업무 내용을 입력해주세요."
                className={`${inputStyles} resize-none`}
              />
            </FormField>
          </FormSection>

          <FormSection title="근무 기간">
            <div className="grid grid-cols-2 gap-4">
              <FormField label="시작일" required>
                <div className="relative">
                  <input
                    type="text"
                    value="2023년 9월"
                    className={`${inputStyles} bg-white cursor-pointer`}
                    readOnly
                  />
                  <Icon
                    type="calendarAlt"
                    size={18}
                    className="absolute right-5 top-1/2 -translate-y-1/2"
                  />
                </div>
              </FormField>
              <FormField label="종료일">
                <div className="relative">
                  <input
                    type="text"
                    value="2023년 9월"
                    className={`${inputStyles} bg-white cursor-pointer`}
                    readOnly
                  />
                  <Icon
                    type="calendarAlt"
                    size={18}
                    className="absolute right-5 top-1/2 -translate-y-1/2"
                  />
                </div>
              </FormField>
            </div>
          </FormSection>

          <FormSection title="기술 스택">
            <FormField label="사용 기술">
              <div className="w-full p-5 border border-gray-ddd rounded-lg flex flex-wrap gap-2 items-center min-h-[50px] focus-within:border-gray-555 transition-colors">
                {["PHP", "jQuery", "JavaScript", "HTML", "SCSS"].map(
                  (skill) => (
                    <Badge
                      key={skill}
                      className="bg-bg-light border border-gray-ddd text-gray-700 gap-1 px-2 py-1"
                    >
                      <Icon type="x" size={16} className="cursor-pointer" />
                      {skill}
                    </Badge>
                  ),
                )}
                <input
                  type="text"
                  placeholder="+ Add Skils(입력 후 Enter)"
                  className="text-sm outline-none text-gray-555 flex-1 min-w-[200px] py-1 bg-transparent"
                />
              </div>
            </FormField>
          </FormSection>
        </div>

        {/* 풋터 고정 영역 */}
        <div className="px-10 py-6 border-t border-gray-light bg-bg-light/50 flex justify-end gap-2">
          <Button variant="danger" size="md">
            <Icon type="trash" size={16} /> 삭제
          </Button>
          <Button variant="secondary" size="md" onClick={onClose}>
            <Icon type="x" size={16} /> 취소
          </Button>
          <Button variant="ghost" size="md">
            <Icon type="save" size={16} /> 저장
          </Button>
        </div>
      </div>
    </div>
  );
};
