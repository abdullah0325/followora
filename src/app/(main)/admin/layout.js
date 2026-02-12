"use client";

import AdminNavbar from "@/components/layout/AdminNavbar";
import AdminSidebar from "@/components/layout/AdminSidebar";
import AdminRouteGuard from "@/components/AdminRouteGuard";
import { useAuth } from "@/hooks/authContext";

const AdminLayout = ({ children }) => {
  const { isSidebarOpen } = useAuth();

  return (
    <AdminRouteGuard>
      <div className="min-h-screen dark:bg-zinc-950 bg-gray-50 text-gray-800 dark:text-white overflow-hidden">
        {/* Navbar */}
        <AdminNavbar />

        <div className="flex relative">
          {/* Sidebar */}
          <AdminSidebar />

          {/* Main Content */}
          <main
            className={`ml-auto transition-all duration-300 ease-in-out p-6
              ${isSidebarOpen ? "w-[80%]" : "w-[98%]"}
            `}
          >
            {children}
          </main>
        </div>
      </div>
    </AdminRouteGuard>
  );
};

export default AdminLayout;
