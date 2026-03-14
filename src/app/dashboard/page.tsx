import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { getUserDomain } from './actions'
import SetupWizard from './setup-wizard'
import Link from 'next/link'
import Image from 'next/image'
import { LayoutDashboard, FileText, History, BarChart2, User, Settings } from 'lucide-react'

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', active: true },
  { name: 'Practice Exams', icon: FileText, href: '#', active: false },
  { name: 'Test History', icon: History, href: '#', active: false },
  { name: 'Analytics', icon: BarChart2, href: '#', active: false },
  { name: 'Profile', icon: User, href: '#', active: false },
  { name: 'Settings', icon: Settings, href: '#', active: false },
]

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/auth/login')
  }

  // Fetch the user's profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, avatar_url')
    .eq('id', user.id)
    .single()

  const userDomain = await getUserDomain()

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* ── Dashboard Topbar ── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Left: Logo */}
            <Link href="/dashboard" className="flex items-center flex-shrink-0">
              <Image
                src="/logo.png"
                alt="CareerSprint"
                width={180}
                height={36}
                priority
              />
            </Link>

            {/* Right: User info + actions */}
            <div className="flex items-center gap-3">

              {/* Domain badge — only when setup is done */}
              {userDomain && (
                <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                  {userDomain.domain}
                </span>
              )}

              {/* Divider */}
              <div className="w-px h-6 bg-gray-200" />

              {/* Avatar + name */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary">
                    {(profile?.full_name || user!.email || 'U')
                      .split(' ')
                      .map((w: string) => w[0])
                      .slice(0, 2)
                      .join('')
                      .toUpperCase()}
                  </span>
                </div>
                <span className="hidden sm:block text-sm font-semibold text-gray-800 max-w-[140px] truncate">
                  {profile?.full_name || user!.email}
                </span>
              </div>

              {/* Sign Out */}
              <form action={async () => {
                'use server'
                const supabase = await createClient()
                await supabase.auth.signOut()
                redirect('/auth/login')
              }}>
                <button
                  type="submit"
                  className="text-xs font-semibold text-gray-500 hover:text-gray-900 border border-gray-200 rounded-lg py-1.5 px-3 hover:bg-gray-50 transition-colors"
                >
                  Sign Out
                </button>
              </form>

            </div>
          </div>
        </div>
      </header>

      {/* Body: sidebar + main, fills remaining viewport height */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        {userDomain && (
          <aside className="w-64 flex-shrink-0 border-r border-gray-200 bg-white hidden md:flex flex-col overflow-y-auto">
            <div className="py-6 px-4 space-y-1 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                    item.active 
                      ? 'bg-primary/10 text-primary border-2 border-primary/20 shadow-sm' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 border-2 border-transparent'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              )
            })}
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto min-w-0">
          <div className="py-10 px-6">
              <h1 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">
                Welcome back, {profile?.full_name || user.email}!
              </h1>
              {!userDomain ? (
                  <div className="max-w-2xl mx-auto mt-4">
                    <SetupWizard />
                  </div>
              ) : (
                  <div className="mt-8 animate-in fade-in duration-500">
                    <div className="mb-8 p-6 bg-white rounded-2xl border-2 border-gray-200 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-2">Active Domains</h2>
                        <div className="flex flex-col gap-1">
                          <p className="text-2xl sm:text-3xl font-extrabold text-gray-900">{userDomain.domain} <span className="text-primary text-sm align-top font-bold">(Primary)</span></p>
                          {userDomain.secondary_domain && (
                            <p className="text-xl sm:text-2xl font-bold text-gray-500">{userDomain.secondary_domain} <span className="text-gray-400 text-sm align-top font-semibold">(Secondary)</span></p>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {userDomain.skills.map((skill: string) => (
                            <span key={skill} className="px-3 py-1.5 bg-gray-50 text-gray-700 text-xs font-semibold uppercase rounded-lg border border-gray-200">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="shrink-0 xl:self-start mt-4 xl:mt-0">
                          <button className="whitespace-nowrap px-6 py-2.5 bg-white text-gray-700 font-semibold text-sm rounded-xl border border-gray-300 shadow-sm hover:bg-gray-50 transition-all">
                              Edit Profile
                          </button>
                      </div>
                    </div>
  
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
                      <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all flex flex-col">
                        <h3 className="font-bold text-gray-900 text-2xl tracking-tight mb-2">Practice Exams</h3>
                        <p className="text-gray-600 font-medium mb-8 flex-1">Generate a fresh 30-question test tailored to your exact domain and skills. Start validating your expertise now.</p>
                        <button className="text-sm font-bold text-white bg-primary w-full py-4 rounded-xl shadow-sm hover:opacity-90 transition-colors">Start Exam</button>
                      </div>
                      <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all flex flex-col">
                        <h3 className="font-bold text-gray-900 text-2xl tracking-tight mb-2">Test History</h3>
                        <p className="text-gray-600 font-medium mb-8 flex-1">Review your past performances, identify your weak spots, and see your solutions.</p>
                        <button className="text-sm font-bold text-white bg-accent w-full py-4 rounded-xl shadow-sm hover:opacity-90 transition-colors">View History</button>
                      </div>
                    </div>
                  </div>
              )}
          </div>
        </main>
      </div>
    </div>
  )
}
