import { AdminPageLayoutProps } from "@/types/admin";
import { AdminAuthGuard } from "../common/AdminAuthGuard";

export const AdminPageLayout = ({ title, children }: AdminPageLayoutProps) => {
  return (
    <div className="p-10 pb-25 min-h-screen bg-white rounded-lg border border-gray-ddd">
      <h1 className="text-2xl font-semibold mb-8 pb-8 border-b border-gray-ddd">
        {title}
      </h1>
      <AdminAuthGuard />
      {children}
    </div>
  );
};
