import { Input } from "@/components/ui/input";
import { ProfileFormData } from "@/lib/schemas/profile.schemas";
import { useAdmin } from "@/providers/AdminProvider";

interface ProfileLinkSectionProps {
  data: Pick<ProfileFormData, "resume_url" | "pdf_url" | "github_url">;
  onChange: (key: keyof ProfileFormData, value: string) => void;
}

export function ProfileLinkSection({
  data,
  onChange,
}: ProfileLinkSectionProps) {
  const { isMaster } = useAdmin();

  return (
    <section className="flex flex-col gap-5">
      <h3 className="text-lg font-bold pb-5 border-b border-gray-ddd">
        링크 연결
      </h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-base font-medium">이력서</label>
          <Input
            placeholder="URL을 입력하세요."
            value={data.resume_url}
            onChange={(e) => onChange("resume_url", e.target.value)}
            disabled={!isMaster}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-base font-medium">포트폴리오 PDF</label>
          <Input
            placeholder="URL을 입력하세요."
            value={data.pdf_url}
            onChange={(e) => onChange("pdf_url", e.target.value)}
            disabled={!isMaster}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-base font-medium">깃허브</label>
          <Input
            value={data.github_url}
            onChange={(e) => onChange("github_url", e.target.value)}
            disabled={!isMaster}
          />
        </div>
      </div>
    </section>
  );
}
