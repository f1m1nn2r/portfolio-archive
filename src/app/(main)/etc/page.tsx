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
      <div className="mb-25">
        <div className="mb-25">
          <h1 className="text-[80px] font-bold leading-none mb-3">Etc</h1>
          <p className="text-lg text-gray-222 leading-relaxed">
            개발하면서 마주친 문제들, 배운 것들, 그리고 생각들을 기록합니다.
          </p>
        </div>

        <Image
          src="/images/new-open-muyaho.png"
          width={1280}
          height={600}
          alt="나 자신 화이팅"
        />
      </div>

      <Suspense fallback={<LoadingState />}>
        <CategoryContent />
      </Suspense>
    </PageLayout>
  );
}
