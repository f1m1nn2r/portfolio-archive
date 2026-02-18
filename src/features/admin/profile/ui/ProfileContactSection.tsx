import { Input } from "@/components/ui/input";
import { ProfileFormData } from "@/lib/schemas/profile.schemas";
import { useAdmin } from "@/providers/AdminProvider";

interface ProfileContactSectionProps {
  data: Pick<ProfileFormData, "phone" | "email">;
  onChange: (key: keyof ProfileFormData, value: string) => void;
}

type ContactKey = "phone" | "email";

const contactFields: { key: ContactKey; label: string }[] = [
  { key: "phone", label: "전화번호" },
  { key: "email", label: "이메일" },
];

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contactFields.map(({ key, label }) => (
          <div key={key} className="flex flex-col gap-4">
            <label className="text-base font-medium">{label}</label>
            <Input
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
