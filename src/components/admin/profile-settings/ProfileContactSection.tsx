import { ProfileContactSectionProps } from "@/types/ui/profile";

export function ProfileContactSection({
  data,
  onChange,
  disabled,
}: ProfileContactSectionProps) {
  const inputStyles =
    "w-full p-5 border border-gray-ddd rounded-lg text-base outline-none focus:border-gray-555 transition-colors";

  return (
    <section className="flex flex-col gap-5">
      <h3 className="text-lg font-bold pb-5 border-b border-gray-ddd">
        연락처 정보
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <label className="text-base font-medium">전화번호</label>
          <input
            className={inputStyles}
            value={data.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            disabled={disabled}
          />
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-base font-medium">이메일</label>
          <input
            className={inputStyles}
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
            disabled={disabled}
          />
        </div>
      </div>
    </section>
  );
}
