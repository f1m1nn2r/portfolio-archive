import { useAdmin } from "@/providers/AdminProvider";
import { Textarea } from "@/components/ui/textarea";
import { ProfileFormData } from "@/lib/schemas/profile.schemas";

interface ProfileIntroSectionProps {
  data: Pick<ProfileFormData, "main_title" | "main_description">;
  onChange: (key: keyof ProfileFormData, value: string) => void;
}

export function ProfileIntroSection({
  data,
  onChange,
}: ProfileIntroSectionProps) {
  const { isMaster } = useAdmin();

  return (
    <section className="flex flex-col gap-6">
      <h3 className="text-lg font-bold pb-5 border-b border-gray-ddd">
        자기소개 관리
      </h3>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="text-base font-medium">타이틀</label>
          <p className="text-sm text-gray-555 mt-1 mb-4">
            메인 페이지 상단의 타이틀을 결정하는 영역입니다.
          </p>
          <Textarea
            className="min-h-[200px]"
            value={data.main_title}
            onChange={(e) => onChange("main_title", e.target.value)}
            disabled={!isMaster}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-base font-medium">상세 소개</label>
          <p className="text-sm text-gray-555 mt-1 mb-4">
            타이틀 하단에 소개 내용이 들어갑니다.
          </p>
          <Textarea
            className="min-h-[200px]"
            value={data.main_description}
            onChange={(e) => onChange("main_description", e.target.value)}
            disabled={!isMaster}
          />
        </div>
      </div>
    </section>
  );
}
