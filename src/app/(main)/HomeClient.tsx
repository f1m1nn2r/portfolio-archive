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
    <PageLayout className="bg-white">
      <section className="mx-auto w-full sm:px-6 ">
        <h1 className="mb-4 whitespace-pre-line break-words text-left text-2xl font-bold sm:mb-6 sm:text-3xl md:text-right md:text-4xl">
          {profile?.main_title}
        </h1>
        <p className="whitespace-pre-line break-keep text-left text-base leading-relaxed sm:text-lg md:text-right">
          {profile?.main_description}
        </p>
      </section>

      <div className="my-14 flex justify-center px-4 sm:my-20 md:my-25">
        <Image
          src="/images/circle-line-graphic.png"
          alt="decoration"
          width={828}
          height={230}
          className="h-auto w-full max-w-[828px]"
        />
      </div>

      <section className="mx-auto w-full pb-20 sm:px-6 md:pb-24 lg:pb-32">
        <div className="space-y-14 sm:space-y-16 md:space-y-20">
          {experiences.map((exp) => (
            <ExperienceCard key={exp.id} experience={exp} />
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
