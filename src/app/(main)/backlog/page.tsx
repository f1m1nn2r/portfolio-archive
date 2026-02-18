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
      <header className="mb-25">
        <h1 className="text-[80px] font-bold leading-none mb-3">Backlog</h1>
        <p className="text-lg text-gray-222 leading-relaxed">
          본 포트폴리오의 백로그를 나타내는 페이지입니다.
        </p>
      </header>

      <BacklogClient initialBacklogs={backlogs} initialEpics={epics} />
    </PageLayout>
  );
}
