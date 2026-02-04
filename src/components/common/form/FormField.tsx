import { FormFieldProps } from "@/types/common/ui";

export function FormField({ label, required, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-base font-medium inline-block mb-4">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}
