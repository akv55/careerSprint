'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  LayoutDashboard, 
  Menu, 
  X,
  ChevronRight,
  LogOut,
  ShoppingBag
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import AdminAvatar from './components/admin-avatar'

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: BarChart3 },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Enrollments', href: '/admin/enrollments', icon: ShoppingBag },
  { name: 'Questions', href: '/admin/questions', icon: BookOpen },
  { name: 'Main Site', href: '/dashboard', icon: LayoutDashboard },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="h-screen bg-slate-50 flex flex-col overflow-hidden w-full">
      {/* Navbar - Desktop & Mobile Header */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-40 shrink-0 sticky top-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 text-slate-600"
          >
            <Menu size={24} />
          </button>
          <Link href="/admin" className="flex items-center gap-2">
            <Image src="/logo.png" alt="CareerSprint" width={180} height={36} priority />
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-black text-red-600 bg-red-50 border border-red-100 rounded-full px-2 py-0.5 ml-2">
              ADMIN
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <AdminAvatar />
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Desktop */}
        <aside 
          className={`${
            isSidebarOpen ? 'w-72' : 'w-20'
          } shrink-0 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col transition-all duration-300 relative z-30`}
        >
          <nav className="flex-1 px-3 space-y-2 mt-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all group ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <item.icon size={20} className={isActive ? 'text-white' : 'group-hover:text-blue-400'} />
                  {isSidebarOpen && (
                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="font-medium whitespace-nowrap"
                    >
                      {item.name}
                    </motion.span>
                  )}
                  {isActive && isSidebarOpen && (
                    <ChevronRight size={14} className="ml-auto opacity-50" />
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t border-slate-800">
            <Link 
              href="/dashboard"
              className="w-full flex items-center gap-3 px-3 py-3 text-slate-400 hover:text-red-400 transition-colors"
            >
              <LogOut size={20} />
              {isSidebarOpen && <span className="font-medium">Exit Admin</span>}
            </Link>
          </div>
          
          {/* Sidebar Toggle Button */}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="absolute -right-3 top-10 w-6 h-6 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-colors z-40"
          >
            {isSidebarOpen ? <X size={12} /> : <Menu size={12} />}
          </button>
        </aside>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-auto bg-slate-50/50 p-4 md:p-8">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[99]"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="md:hidden fixed inset-y-0 left-0 w-72 bg-slate-900 text-white z-[100] p-6 flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Image src="/logo.png" alt="CareerSprint" width={140} height={28} priority className="brightness-200 grayscale" />
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-slate-800 rounded-lg">
                  <X size={24} />
                </button>
              </div>

              <nav className="flex-1 space-y-2">
                {navItems.map((item) => (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      pathname === item.href ? 'bg-blue-600 shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <item.icon size={20} />
                    <span className="font-medium text-lg">{item.name}</span>
                  </Link>
                ))}
              </nav>

              <div className="mt-auto pt-6 border-t border-slate-800">
                <Link 
                  href="/dashboard"
                  className="flex items-center gap-3 px-4 py-4 text-slate-400 hover:text-red-400 font-medium"
                >
                  <LogOut size={20} />
                  <span>Exit Admin</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
