import { ProfileLinkSectionProps } from "@/types/ui/profile";

export function ProfileLinkSection({
  data,
  onChange,
  disabled,
}: ProfileLinkSectionProps) {
  const inputStyles =
    "w-full p-5 border border-gray-ddd rounded-lg text-base outline-none focus:border-gray-555 transition-colors";

  return (
    <section className="flex flex-col gap-5">
      <h3 className="text-lg font-bold pb-5 border-b border-gray-ddd">
        링크 연결
      </h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-base font-medium">이력서</label>
          <input
            className={inputStyles}
            placeholder="URL을 입력하세요."
            value={data.resume_url}
            onChange={(e) => onChange("resume_url", e.target.value)}
            disabled={disabled}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-base font-medium">포트폴리오 PDF</label>
          <input
            className={inputStyles}
            placeholder="URL을 입력하세요."
            value={data.pdf_url}
            onChange={(e) => onChange("pdf_url", e.target.value)}
            disabled={disabled}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-base font-medium">깃허브</label>
          <input
            className={inputStyles}
            value={data.github_url}
            onChange={(e) => onChange("github_url", e.target.value)}
            disabled={disabled}
          />
        </div>
      </div>
    </section>
  );
}
