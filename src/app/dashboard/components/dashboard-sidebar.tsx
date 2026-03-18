'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, FileText, History, BarChart2, User, Settings, Bookmark, Trophy, ShieldCheck, Zap } from 'lucide-react'

const navItems = [
  { name: 'Dashboard',      icon: LayoutDashboard, href: '/dashboard' },
  { name: 'Practice Exams', icon: FileText,         href: '/dashboard/exam' },
  { name: 'Leaderboard',    icon: Trophy,           href: '/dashboard/leaderboard' },
  { name: 'Test History',   icon: History,          href: '/dashboard/history' },
  { name: 'Performance',      icon: BarChart2,        href: '/dashboard/performance' },
  { name: 'Saved Questions', icon: Bookmark,         href: '/dashboard/bookmarks' },
  { name: 'Profile',        icon: User,             href: '/dashboard/profile' },
  { name: 'Settings',       icon: Settings,         href: '/dashboard/settings' },
]

export default function DashboardSidebar({ role }: { role?: string | null }) {
  const pathname = usePathname()

  const allNavItems = [...navItems]
  if (role === 'admin') {
    allNavItems.splice(1, 0, { name: 'Admin Panel', icon: ShieldCheck, href: '/admin' })
  }

  return (
    <aside className="w-64 flex-shrink-0 border-r border-gray-200 bg-white hidden md:flex flex-col overflow-y-auto">
      <div className="p-6 border-b border-gray-50 flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20">
          <Zap size={18} fill="currentColor" />
        </div>
        <span className="text-xl font-black tracking-tight text-gray-900">CareerSprint</span>
      </div>
      <div className="py-6 px-4 space-y-1 flex-1">
        {allNavItems.map((item) => {
          const Icon = item.icon
          // Handle nested routes (e.g. /dashboard/exam/result should match /dashboard/exam)
          const active = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/dashboard')
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm ${
                active
                  ? 'bg-primary/10 text-primary border-2 border-primary/20 shadow-sm'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 border-2 border-transparent'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {item.name}
            </Link>
          )
        })}
      </div>
    </aside>
  )
}
