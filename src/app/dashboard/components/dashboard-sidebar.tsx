'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useTransition, useState } from 'react'
import { LayoutDashboard, FileText, History, BarChart2, User, Settings, Bookmark, Trophy, ShieldCheck, Zap } from 'lucide-react'
import { useUser } from './user-context'

const navItems = [
  { name: 'Dashboard',      icon: LayoutDashboard, href: '/dashboard' },
  { name: 'Practice Exams', icon: FileText,         href: '/dashboard/exam' },
  { name: 'Leaderboard',    icon: Trophy,           href: '/dashboard/leaderboard' },
  { name: 'Test History',   icon: History,          href: '/dashboard/history' },
  { name: 'Performance',    icon: BarChart2,         href: '/dashboard/performance' },
  { name: 'Saved Questions',icon: Bookmark,          href: '/dashboard/bookmarks' },
  { name: 'Profile',        icon: User,             href: '/dashboard/profile' },
  { name: 'Settings',       icon: Settings,         href: '/dashboard/settings' },
]

export default function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { profile } = useUser()
  const [isPending, startTransition] = useTransition()
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null)

  const allNavItems = [...navItems]
  if (profile?.role === 'admin') {
    allNavItems.splice(1, 0, { name: 'Admin Panel', icon: ShieldCheck, href: '/admin' })
  }

  const handleNavClick = (href: string) => {
    if (isPending) return        // already navigating somewhere, ignore
    if (pathname === href) return // already on this page, ignore
    if (pathname.startsWith(href) && href !== '/dashboard') return // already in this section

    setNavigatingTo(href)
    startTransition(() => {
      router.push(href)
    })
  }

  return (
    <aside className="w-64 shrink-0 border-r border-gray-200 bg-white hidden md:flex flex-col overflow-y-auto">
      <div className="py-6 px-4 space-y-1 flex-1">
        {allNavItems.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/dashboard')
          const isNavigatingHere = navigatingTo === item.href

          return (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.href)}
              disabled={isNavigatingHere}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm ${
                active
                  ? 'bg-primary/10 text-primary border-2 border-primary/20 shadow-sm'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 border-2 border-transparent'
              } ${isNavigatingHere ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <Icon className={`w-5 h-5 shrink-0 ${isNavigatingHere ? 'animate-pulse' : ''}`} />
              {item.name}
            </button>
          )
        })}
      </div>
    </aside>
  )
}