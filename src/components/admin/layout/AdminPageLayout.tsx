import { AdminPageLayoutProps } from "@/types/admin";

export const AdminPageLayout = ({ title, children }: AdminPageLayoutProps) => {
  return (
    <div className="p-10 pb-25 min-h-screen bg-white rounded-lg border border-gray-ddd">
      <h1 className="text-2xl font-semibold mb-8 pb-8 border-b border-gray-ddd">
        {title}
      </h1>
      {children}
    </div>
  );
};
