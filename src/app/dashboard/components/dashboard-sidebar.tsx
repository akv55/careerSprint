import Link from 'next/link'
import { LayoutDashboard, FileText, History, BarChart2, User, Settings } from 'lucide-react'

const navItems = [
  { name: 'Dashboard',      icon: LayoutDashboard, href: '/dashboard',         active: true  },
  { name: 'Practice Exams', icon: FileText,         href: '/dashboard/exams',   active: false },
  { name: 'Test History',   icon: History,          href: '/dashboard/history', active: false },
  { name: 'Analytics',      icon: BarChart2,        href: '/dashboard/analytics', active: false },
  { name: 'Profile',        icon: User,             href: '/dashboard/profile', active: false },
  { name: 'Settings',       icon: Settings,         href: '/dashboard/settings', active: false },
]

export default function DashboardSidebar() {
  return (
    <aside className="w-64 flex-shrink-0 border-r border-gray-200 bg-white hidden md:flex flex-col overflow-y-auto">
      <div className="py-6 px-4 space-y-1 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm ${
                item.active
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
