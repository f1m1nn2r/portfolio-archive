import Image from "next/image";
import { ExperienceCard } from "@/components/experience/ExperienceCard";
import { PageLayout } from "@/components/common/PageLayout";
import { getExperiences } from "@/services";
import { getProfileFromDb } from "@/services/profile.server";

export default async function Home() {
  const [profile, experiences] = await Promise.all([
    getProfileFromDb(),
    getExperiences(),
  ]);

  return (
    <PageLayout className="min-h-screen bg-white pt-12.5 pb-25">
      {/* 상단 자기소개 */}
      <section className="max-w-7xl mx-auto px-4">
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
    </PageLayout>
  );
}
