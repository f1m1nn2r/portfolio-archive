import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { Badge } from "@/components/common/Badge";
import { formatPeriod, calculateDuration } from "@/lib/date";
import { ExperienceCardProps } from "@/types/admin/experience";

export function ExperienceCard({
  experience,
  onEdit,
  onDelete,
  isMaster,
}: ExperienceCardProps) {
  if (!experience.id) {
    return null;
  }
  const isWork = experience.type === "WORK";

  return (
    <div className="p-6 border border-gray-ddd rounded-xl relative hover:border-gray-400 transition-colors sm:p-10">
      <div className="flex flex-col 2xl:flex-row gap-4 2xl:gap-8">
        {/* 회사/주요 업무 */}
        <div className="w-full 2xl:max-w-[600px]">
          <div className="text-[18px] sm:text-2xl font-bold mb-2.5">
            <h2>{experience.company}</h2>
            <p>{experience.team}</p>
          </div>
          <ul className="text-gray-555 text-[14px] sm:text-lg">
            {experience.description.map((desc, idx) => (
              <li key={idx}>{desc}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col xl:flex-col 2xl:flex-row gap-8 flex-1">
          {/* 다닌 기간 */}
          <div className="flex-1">
            <span className="font-medium text-[14px] sm:text-lg block">
              {formatPeriod(experience.start_date, experience.end_date)}
            </span>
            <span className="text-gray-999 text-[14px] sm:text-base block mt-1">
              {calculateDuration(experience.start_date, experience.end_date)}
            </span>
            <Badge className="bg-bg-light py-2 px-2.5 text-base mt-5">
              {experience.is_finished
                ? isWork
                  ? "퇴사"
                  : "종료"
                : isWork
                  ? "재직 중"
                  : "진행 중"}
            </Badge>
          </div>

          {/* 사용 스킬 */}
          <div className="2xl:flex-1 2xl:flex 2xl:justify-end">
            <div className="flex flex-col items-end gap-6">
              <div>
                <span className="text-lg font-medium text-right block mb-5">
                  사용 스킬
                </span>
                <div className="flex flex-wrap justify-end gap-1.5 max-w-[300px]">
                  {experience.skills.map((skill) => (
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
      </div>

      {/* 버튼 영역 */}
      <div className="flex justify-end gap-2 mt-6">
        {isMaster && (
          <Button
            variant="danger"
            size="md"
            onClick={() => onDelete(experience.id!)}
          >
            <Icon type="trash" size="20" />
            삭제
          </Button>
        )}
        {isMaster && (
          <Button
            variant="secondary"
            size="md"
            onClick={() => onEdit(experience)}
          >
            <Icon type="editAlt" size="20" />
            편집하기
          </Button>
        )}
      </div>
    </div>
  );
}
