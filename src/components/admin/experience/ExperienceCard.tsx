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

  return (
    <div className="p-10 border border-gray-ddd rounded-xl relative hover:border-gray-400 transition-colors">
      <div className="flex items-start">
        {/* 회사/주요 업무 */}
        <div className="w-full max-w-[600px]">
          <div className="text-2xl font-bold mb-2.5">
            <h2>{experience.company}</h2>
            <p>{experience.team}</p>
          </div>
          <ul className="text-gray-555 text-lg">
            {experience.description.map((desc, idx) => (
              <li key={idx}>{desc}</li>
            ))}
          </ul>
        </div>

        {/* 다닌 기간 */}
        <div className="flex-1">
          <span className="font-medium text-lg block">
            {formatPeriod(experience.start_date, experience.end_date)}
          </span>
          <span className="text-gray-999 text-base block mt-1">
            {calculateDuration(experience.start_date, experience.end_date)}
          </span>
          <Badge className="bg-bg-light py-2 px-2.5 text-base mt-5">
            {experience.is_finished ? "퇴사" : "재직 중"}
          </Badge>
        </div>

        {/* 사용 스킬 */}
        <div className="flex justify-end items-end flex-1">
          <div className="flex flex-col items-end gap-6">
            <div>
              <span className="text-lg font-medium text-right block mb-5">
                사용 스킬
              </span>
              <div className="flex flex-wrap justify-end gap-1.5 max-w-[300px]">
                {experience.skills.map((skill) => (
                  <Badge key={skill} className="border border-gray-ddd text-sm">
                    {skill}
                  </Badge>
                ))}
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
