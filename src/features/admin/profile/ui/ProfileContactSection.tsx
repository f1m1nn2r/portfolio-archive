import { Input } from "@/components/ui/input";
import { ProfileFormData } from "@/lib/schemas/profile.schemas";
import { useAdmin } from "@/providers/AdminProvider";

interface ProfileContactSectionProps {
  data: Pick<ProfileFormData, "phone" | "email">;
  onChange: (key: keyof ProfileFormData, value: string) => void;
}

export function ProfileContactSection({
  data,
  onChange,
}: ProfileContactSectionProps) {
  const { isMaster } = useAdmin();

  return (
    <section className="flex flex-col gap-5">
      <h3 className="text-lg font-bold pb-5 border-b border-gray-ddd">
        연락처 정보
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <label className="text-base font-medium">전화번호</label>
          <Input
            value={data.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            disabled={!isMaster}
          />
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-base font-medium">이메일</label>
          <Input
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
            disabled={!isMaster}
          />
        </div>
      </div>
    </section>
  );
}
