import Image from "next/image";
import EtcClient from "./EtcClient";
import { PageLayout } from "@/components/common/PageLayout";
import { getCategoriesWithStats } from "@/services/category/server";
import { Suspense } from "react";
import { LoadingState } from "@/components/common/LoadingState";

async function CategoryContent() {
  const initialCategories = await getCategoriesWithStats();
  return <EtcClient initialCategories={initialCategories} />;
}

export default function EtcPage() {
  return (
    <PageLayout>
      <div className="mb-14 sm:mb-20 md:mb-25">
        <div className="mb-14 sm:mb-20 md:mb-25">
          <h1 className="mb-3 text-4xl font-bold leading-none sm:text-6xl md:text-[80px]">
            Etc
          </h1>
          <p className="text-base leading-relaxed text-gray-222 sm:text-lg">
            개발하면서 마주친 문제들, 배운 것들, 그리고 생각들을 기록합니다.
          </p>
        </div>

        <Image
          src="/images/new-open-muyaho.png"
          width={1280}
          height={600}
          alt="나 자신 화이팅"
          className="h-auto w-full"
        />
      </div>

      <Suspense fallback={<LoadingState />}>
        <CategoryContent />
      </Suspense>
    </PageLayout>
  );
}
