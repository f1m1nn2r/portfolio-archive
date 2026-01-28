interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  isFirst?: boolean;
}

export function FormSection({
  title,
  children,
  isFirst = false,
}: FormSectionProps) {
  return (
    <section
      className={`space-y-4 ${isFirst ? "" : "pt-12.5 border-t border-gray-ddd"}`}
    >
      <h3 className="text-lg font-semibold text-gray-555 uppercase tracking-wider mb-7.5">
        {title}
      </h3>
      <div className="space-y-6">{children}</div>
    </section>
  );
}
