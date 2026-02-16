import type { ReactNode } from "react";
import UserNavbar from "@/components/layouts/user-navbar";
import Sidebar from "@/components/layouts/user-sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <UserNavbar />
      <div className="flex flex-1 overflow-hidden bg-gradient-to-br from-[#f5f8ff] via-white to-[#fff5ec]">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}