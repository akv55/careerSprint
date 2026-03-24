'use client'

import React, { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  LayoutDashboard, 
  Menu, 
  X,
  ChevronRight,
  LogOut,
  Zap,
  ShoppingBag,
  DollarSign,
  PhoneCall
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import Image from 'next/image'
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
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Reset navigation state when pathname finishes updating
    setNavigatingTo(null)
  }, [pathname])

  const handleNavigation = (href: string) => {
    // Don't navigate if we are already on the exact target page
    if (pathname === href) return 
    
    // Don't navigate if we are already in the process of navigating to this exact page (prevents click spam)
    if (navigatingTo === href) return 

    setNavigatingTo(href)
    router.push(href)
  }

  return (
    <div className="h-screen bg-slate-50 flex overflow-hidden">
      {/* Sidebar for Desktop */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } hidden md:flex flex-col bg-slate-900 text-white transition-all duration-300 ease-in-out border-r border-slate-800`}
      >
        <div className="p-6 flex items-center justify-between">
          <AnimatePresence mode="wait">
            {isSidebarOpen && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center"
              >
                <Image src="/logo.png" alt="CareerSprint" width={160} height={32} priority className="invert brightness-0" />
              </motion.div>
            )}
          </AnimatePresence>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-2 mt-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <button 
                key={item.href} 
                onClick={() => handleNavigation(item.href)}
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
              </button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={() => handleNavigation('/dashboard')}
            className="w-full flex items-center gap-3 px-3 py-3 text-slate-400 hover:text-red-400 transition-colors"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="font-medium">Exit Admin</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-50">
        <div className="flex items-center">
          <Image src="/logo.png" alt="CareerSprint" width={140} height={28} priority />
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-slate-600"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="md:hidden fixed inset-y-0 left-0 w-64 bg-slate-900 text-white z-50 p-6 flex flex-col"
            >
              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                  <Zap size={18} fill="currentColor" />
                </div>
                <span className="text-2xl font-black tracking-tight text-white">CareerSprint</span>
              </div>
              <nav className="flex-1 space-y-2">
                {navItems.map((item) => (
                  <button 
                    key={item.href} 
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      handleNavigation(item.href)
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl ${
                      pathname === item.href ? 'bg-blue-600' : 'text-slate-400'
                    }`}
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.name}</span>
                  </button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 hidden md:flex items-center justify-end px-8">
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900">System Administrator</p>
              <p className="text-xs text-slate-500">Live Backend Access</p>
            </div>
            <AdminAvatar />
          </div>
        </header>
        <div className="flex-1 overflow-auto p-4 md:p-8 mt-16 md:mt-0">
          {children}
        </div>
      </main>
    </div>
  )
}
