import Image from "next/image";
import { Experience } from "@/types/api/experience";

async function getExperiences(): Promise<Experience[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/experience`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      throw new Error(`경력 정보를 불러오는데 실패했습니다: ${res.status}`);
    }

    const json = await res.json();

    if (json.success && Array.isArray(json.data)) {
      return json.data;
    }

    if (Array.isArray(json)) {
      return json;
    }

    console.error("예상치 못한 API 응답 형식:", json);
    return [];
  } catch (error) {
    console.error("경력 정보 조회 실패:", error);
    return [];
  }
}

async function getProfileSettings() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/profile-settings`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      throw new Error(`프로필 정보를 불러오는데 실패했습니다: ${res.status}`);
    }

    const json = await res.json();

    if (json.success && json.data) {
      return json.data;
    }

    if (json && !json.success) {
      return json;
    }

    console.error("예상치 못한 프로필 응답 형식:", json);
    return {
      main_title: "",
      main_description: "",
    };
  } catch (error) {
    console.error("프로필 정보 조회 실패:", error);
    return {
      main_title: "",
      main_description: "",
    };
  }
}

function formatPeriod(start: string, end: string | null): string {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}`;
  };

  const startFormatted = formatDate(start);
  const endFormatted = end ? formatDate(end) : "현재";

  return `(${startFormatted} - ${endFormatted})`;
}

function ExperienceCard({ experience }: { experience: Experience }) {
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

export default async function Home() {
  const profile = await getProfileSettings();
  const experiences = await getExperiences();

  return (
    <main className="min-h-screen bg-white">
      {/* 상단 자기소개 */}
      <section className="max-w-7xl mx-auto py-20 px-4">
        <h1 className="text-4xl font-bold mb-6 whitespace-pre-line text-right">
          {profile.main_title}
        </h1>
        <p className="text-lg leading-relaxed whitespace-pre-line text-right">
          {profile.main_description}
        </p>
      </section>

      {/* 꾸밈 요소 */}
      <div className="flex justify-center my-25">
        <Image
          src="/images/circle-line-graphic.png"
          alt="decoration"
          width={828}
          height={230}
        />
      </div>

      {/* 경력 리스트 */}
      <section className="max-w-7xl mx-auto px-4 pb-32">
        <div className="space-y-20">
          {experiences.map((exp) => (
            <ExperienceCard key={exp.id} experience={exp} />
          ))}
        </div>
      </section>
    </main>
  );
}
