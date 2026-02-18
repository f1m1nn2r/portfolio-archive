import { Input } from "@/components/ui/input";
import { ProfileFormData } from "@/lib/schemas/profile.schemas";
import { useAdmin } from "@/providers/AdminProvider";

interface ProfileLinkSectionProps {
  data: Pick<ProfileFormData, "resume_url" | "pdf_url" | "github_url">;
  onChange: (key: keyof ProfileFormData, value: string) => void;
}

type LinkKey = "resume_url" | "pdf_url" | "github_url";

const linkFields: { key: LinkKey; label: string }[] = [
  { key: "resume_url", label: "이력서" },
  { key: "pdf_url", label: "포트폴리오 PDF" },
  { key: "github_url", label: "깃허브" },
];

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
      <div className="flex flex-wrap gap-4">
        {linkFields.map(({ key, label }) => (
          <div className="flex flex-col gap-4 flex-1 min-w-[200px]">
            <label className="text-base font-medium">{label}</label>
            <Input
              placeholder="URL을 입력하세요."
              value={data[key]}
              onChange={(e) => onChange(key, e.target.value)}
              disabled={!isMaster}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
