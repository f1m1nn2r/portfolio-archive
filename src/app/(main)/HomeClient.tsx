"use client";

import useSWR from "swr";
import Image from "next/image";
import { ExperienceCard } from "@/components/domains/experience/ExperienceCard";
import { PageLayout } from "@/components/common/PageLayout";
import { useExperience } from "@/hooks/experience/useExperience";
import { getProfileSettings } from "@/features/admin/profile";
import { HomeClientProps } from "@/types/ui/main";

export default function HomeClient({
  initialProfile,
  initialExperiences,
}: HomeClientProps) {
  const { data: profile } = useSWR(
    "/api/profile-settings",
    getProfileSettings,
    { fallbackData: initialProfile },
  );

  const { experiences } = useExperience({ initialData: initialExperiences });

  return (
    <PageLayout className="min-h-screen bg-white pt-12.5 pb-25">
      <section className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6 whitespace-pre-line text-right">
          {profile?.main_title}
        </h1>
        <p className="text-lg leading-relaxed whitespace-pre-line text-right">
          {profile?.main_description}
        </p>
      </section>

      <div className="flex justify-center my-25">
        <Image
          src="/images/circle-line-graphic.png"
          alt="decoration"
          width={828}
          height={230}
        />
      </div>

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
