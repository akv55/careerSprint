"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShieldCheck,
  CreditCard,
  Users,
  FileText,
  MonitorPlay,
  Settings,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Bell,
} from "lucide-react";

const items = [
  { label: "Dashboard", href: "/admin/adminDashboard", icon: LayoutDashboard },
  { label: "Access Management", href: "/admin/accessManagement", icon: ShieldCheck },
  { label: "Billing", href: "/admin/billing", icon: CreditCard },
  { label: "Candidates", href: "/admin/candidates", icon: Users },
   { label: "Notifications", href: "/admin/notifications", icon: Bell },
  { label: "Exams", href: "/admin/exams", icon: FileText },
  { label: "Proctoring", href: "/admin/proctoring", icon: MonitorPlay },
  { label: "Settings", href: "/admin/setting", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`h-full bg-white border-r border-gray-200 flex flex-col justify-between transition-all duration-300 ${collapsed ? "w-20" : "w-72"
        }`}
    >
      <div>
        {/* Top brand + collapse toggle */}
        <div className="flex items-center justify-between px-3 pt-4 pb-2">
          <button
            type="button"
            onClick={() => setCollapsed((prev) => !prev)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-2 space-y-2 px-3">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all group ${isActive
                    ? "bg-gradient-to-r from-[#0F6FFF] to-[#FF8A21] text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100 hover:text-[#0F6FFF]"
                  }`}
              >
                <Icon size={18} />

                {!collapsed && item.label}

                {/* Tooltip when collapsed */}
                {collapsed && (
                  <span className="absolute left-full ml-3 whitespace-nowrap rounded-md bg-gray-900 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="border-t p-4">
        <div className={`flex items-center gap-3 rounded-2xl bg-gray-50 px-3 py-3 ${collapsed ? "justify-center" : "justify-between"}`}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#0F6FFF] to-[#FF8A21] text-white text-sm font-semibold">
              AK
            </div>
            {!collapsed && (
              <div>
                <p className="text-sm font-semibold text-gray-900">Alok Kumar</p>
                <p className="text-xs text-gray-500">alok@email.com</p>
              </div>
            )}
          </div>

          {!collapsed && (
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
}
