import { Experience } from "@/types/api/experience";
import { formatPeriod } from "@/lib/date";

export function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <div className="relative flex">
      {/* 왼쪽: 회사 정보 */}
      <div className="mb-6 flex-1">
        <h3 className="text-4xl font-bold leading-12">
          {experience.company}
          <br />
          {experience.team}
        </h3>
        <p className="text-xl mt-3">
          {formatPeriod(experience.start_date, experience.end_date)}
        </p>
      </div>

      {/* 오른쪽: 스킬 & 설명 */}
      <div>
        {/* 스킬 태그 */}
        <div className="flex justify-end gap-2">
          {experience.skills.map((skill) => (
            <span
              key={skill}
              className="px-4 py-1.5 bg-black text-white text-sm rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* 업무 설명 */}
        <div className="text-right mt-13 mb-7">
          {experience.description.map((desc, idx) => (
            <p key={idx} className="text-lg leading-relaxed">
              {desc}
            </p>
          ))}
        </div>

        {/* 점 장식 */}
        <div className="flex justify-end gap-2">
          <div className="w-2.5 h-2.5 bg-black rounded-full" />
          <div className="w-2.5 h-2.5 bg-black rounded-full" />
        </div>
      </div>
    </div>
  );
}
