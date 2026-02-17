import { Experience } from "@/types/api/experience";
import { formatPeriod } from "@/lib/date";

export function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
      {/* 왼쪽: 회사 정보 */}
      <div className="mb-0 md:flex-1 md:pr-8">
        <h3 className="break-words text-2xl font-bold leading-tight sm:text-3xl md:text-4xl md:leading-12">
          {experience.company}
          <br />
          {experience.team}
        </h3>
        <p className="mt-3 text-base sm:text-lg md:text-xl">
          {formatPeriod(experience.start_date, experience.end_date)}
        </p>
      </div>

      {/* 오른쪽: 스킬 & 설명 */}
      <div className="w-full md:max-w-[52%]">
        {/* 스킬 태그 */}
        <div className="flex flex-wrap justify-start gap-2 md:justify-end">
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
        <div className="mt-6 mb-5 text-left md:mt-13 md:mb-7 md:text-right">
          {experience.description.map((desc, idx) => (
            <p key={idx} className="text-base leading-relaxed sm:text-lg">
              {desc}
            </p>
          ))}
        </div>

        {/* 점 장식 */}
        <div className="flex justify-start gap-2 md:justify-end">
          <div className="w-2.5 h-2.5 bg-black rounded-full" />
          <div className="w-2.5 h-2.5 bg-black rounded-full" />
        </div>
      </div>
    </div>
  );
}
