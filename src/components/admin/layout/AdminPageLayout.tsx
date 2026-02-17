import { AdminPageLayoutProps } from "@/types/admin";
import { AdminAuthGuard } from "../common/AdminAuthGuard";

export const AdminPageLayout = ({ title, children }: AdminPageLayoutProps) => {
  return (
    <div className="min-h-screen rounded-lg border border-gray-ddd bg-white p-4 pb-12 sm:p-6 sm:pb-16 lg:p-10 lg:pb-25">
      <h1 className="mb-6 border-b border-gray-ddd pb-6 text-xl font-semibold sm:mb-8 sm:pb-8 sm:text-2xl">
        {title}
      </h1>
      <AdminAuthGuard />
      {children}
    </div>
  );
};
