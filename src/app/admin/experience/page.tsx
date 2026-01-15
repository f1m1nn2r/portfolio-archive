"use client";

import { useState } from "react";
import { SummaryCard } from "@/components/admin/SummaryCard";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { Badge } from "@/components/common/Badge";
import { CommonPagination } from "@/components/common/Pagination";
import { MOCK_EXPERIENCE } from "@/mock/experience";

export default function ExperiencePage() {
  const [page, setPage] = useState(1);
  const totalPages = 1;

  return (
    <div className="p-10 pb-25 min-h-screen bg-white rounded-lg border border-gray-ddd">
      <h1 className="text-2xl font-semibold mb-8 pb-8 border-b border-gray-ddd">
        Experience
      </h1>

      {/* 상단 요약 영역 */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <SummaryCard
          title="총 경력"
          value="3년 8개월"
          icon="briefcase"
          bgColor="bg-[#F5F0FF]"
        />
        <SummaryCard
          title="등록된 회사 수"
          value={`${MOCK_EXPERIENCE.length}개`}
          icon="building"
          bgColor="bg-[#EBF5FF]"
        />
      </div>

      {/* 새 경력 추가 버튼 */}
      <div className="mb-6 flex justify-end">
        <Button variant="secondary" className="border-gray-ddd text-sm">
          <Icon type="plus" size={16} />새 경력 추가
        </Button>
      </div>

      {/* 경력 리스트 */}
      <div className="flex flex-col gap-6 mb-10">
        {MOCK_EXPERIENCE.map((exp) => (
          <div
            key={exp.id}
            className="p-10 border border-gray-ddd rounded-xl relative hover:border-gray-400 transition-colors"
          >
            <div className="flex items-start justify-between">
              {/* 회사/주요 업무 */}
              <div>
                <div className="text-2xl font-bold mb-2.5">
                  <h2>{exp.company}</h2>
                  <p>{exp.team}</p>
                </div>
                <ul className="text-gray-555 text-lg">
                  {exp.description.map((desc, idx) => (
                    <li key={idx}>{desc}</li>
                  ))}
                </ul>
              </div>

              {/* 다닌 기간/개월 수 */}
              <div>
                <span className="font-medium text-lg block">{exp.period}</span>
                <span className="text-gray-999 text-base block mb-5">
                  {exp.duration}
                </span>
                <Badge className="bg-bg-light py-2 px-2.5 text-base">
                  {exp.status}
                </Badge>
              </div>

              {/* 사용 스킬 */}
              <div className="flex justify-between items-end">
                <div className="flex flex-col items-end gap-6">
                  <div>
                    <span className="text-lg font-medium text-right block mb-5">
                      사용 스킬
                    </span>
                    <div className="flex flex-wrap justify-end gap-1.5 max-w-[300px]">
                      {exp.skills.map((skill) => (
                        <Badge
                          key={skill}
                          className="border border-gray-ddd text-sm"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 버튼 영역 */}
            <div className="flex justify-end gap-2">
              <Button variant="danger" size="md">
                <Icon type="trash" size="20" />
                삭제
              </Button>
              <Button variant="secondary" size="md">
                <Icon type="editAlt" size="20" />
                편집하기
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <CommonPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
}
