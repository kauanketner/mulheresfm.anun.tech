// Auth is handled by middleware.ts
// This layout applies the admin shell to all /admin/* pages except /admin/login
// (middleware redirects unauthenticated users to /admin/login before reaching here)
import { cookies } from "next/headers";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const session = cookieStore.get("admin_session");
  const isLoggedIn = session?.value === "1";

  // For the login page (not authenticated), render bare
  if (!isLoggedIn) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex font-body bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 ml-64 min-h-screen">{children}</main>
    </div>
  );
}
