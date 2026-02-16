import type { ReactNode } from 'react';
import AdminNavbar from '@/components/layouts/admin-navbar';
import AdminSidebar from '@/components/layouts/admin-sidebar';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <AdminNavbar />
      <div className="flex flex-1 overflow-hidden bg-gradient-to-br from-[#f5f8ff] via-white to-[#fff5ec] overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto px-6 py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
