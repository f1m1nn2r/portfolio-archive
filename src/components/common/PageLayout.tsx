import { PageLayoutProps } from "@/types/common/ui";

export function PageLayout({ children, className = "" }: PageLayoutProps) {
  return (
    <main className={`min-h-screen bg-white pt-12.5 pb-25 ${className}`}>
      <div className="max-w-7xl mx-auto px-5">{children}</div>
    </main>
  );
}
