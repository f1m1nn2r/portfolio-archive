import { PageLayout } from "@/components/common/PageLayout";
import { getBacklogs } from "@/features/admin/backlog/server";
import { getEpicsFromDb } from "@/services/epic/server";
import BacklogClient from "./BacklogClient";

export default async function BacklogMainPage() {
  const [backlogs, epics] = await Promise.all([
    getBacklogs(),
    getEpicsFromDb(),
  ]);

  return (
    <PageLayout>
      <header className="mb-14 sm:mb-20 md:mb-25">
        <h1 className="mb-3 text-4xl font-bold leading-none sm:text-6xl md:text-[80px]">
          Backlog
        </h1>
        <p className="text-base break-keep text-gray-222 sm:text-lg">
          본 포트폴리오의 백로그를 나타내는 페이지입니다.
        </p>
      </header>

      <BacklogClient initialBacklogs={backlogs} initialEpics={epics} />
    </PageLayout>
  );
}
