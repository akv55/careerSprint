'use client';

import Link from 'next/link'
import { FileText, History, BarChart2, ArrowRight, BookOpen, Target, Clock, CheckCircle2, ChevronRight } from 'lucide-react'
import { useUser } from './user-context'

interface RecentSession {
  id: string; domain: string; mode: string
  score: number; total: number; time_taken_secs: number; completed_at: string
}

interface DashboardHomeProps {
  stats: { examsTaken: number; bestScore: number | null; avgTimeSecs: number | null }
  recentSessions: RecentSession[]
}

const quickActions = [
  {
    icon: FileText, label: 'Practice Exam', href: '/dashboard/exam',
    description: 'Start a fresh 30-question MCQ test tailored to your domain and skills.',
    cta: 'Start Exam', ctaStyle: 'bg-primary',
    accent: 'bg-primary/8 border-primary/20', iconColor: 'text-primary',
  },
  {
    icon: History, label: 'Test History', href: '/dashboard/history',
    description: 'Review past exam attempts, check scores and read explanations.',
    cta: 'View History', ctaStyle: 'bg-accent',
    accent: 'bg-accent/8 border-accent/20', iconColor: 'text-accent',
  },
  {
    icon: BarChart2, label: 'Analytics', href: '/dashboard/analytics',
    description: 'Track your weak topics, skill gaps, and improvement over time.',
    cta: 'View Analytics', ctaStyle: 'bg-gray-800',
    accent: 'bg-gray-50 border-gray-200', iconColor: 'text-gray-600',
  },
]

export default function DashboardHome({ stats, recentSessions }: DashboardHomeProps) {
  const { user, profile, userDomain } = useUser()
  
  if (!user || !userDomain) return null
  
  const userName = profile?.full_name || user.email || 'User'
  const { domain, secondary_domain: secondaryDomain, skills = [] } = userDomain

  const firstName = userName.split(' ')[0]
  const fmtTime = (s: number) => `${Math.floor(s / 60)}m ${s % 60}s`

  const statCards = [
    { icon: BookOpen, label: 'Exams Taken', value: stats.examsTaken > 0 ? String(stats.examsTaken) : '—' },
    { icon: Target,   label: 'Best Score',  value: stats.bestScore !== null ? `${stats.bestScore}%` : '—' },
    { icon: Clock,    label: 'Avg. Time',   value: stats.avgTimeSecs !== null ? fmtTime(stats.avgTimeSecs) : '—' },
  ]

  return (
    <div className="space-y-8">

      {/* Hero greeting */}
      <div className="rounded-2xl bg-gray-950 text-white px-8 py-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1">Dashboard</p>
          <h1 className="text-2xl font-extrabold leading-tight">Good to see you, {firstName}! 👋</h1>
          <p className="text-gray-400 text-sm mt-1.5">
            You're set up as a{' '}
            <span className="text-white font-semibold">{domain}</span>
            {secondaryDomain && <span className="text-gray-400"> + {secondaryDomain}</span>} engineer.
          </p>
        </div>
        <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
          <span className="text-xs text-gray-500 font-medium">{skills.length} skills tracked</span>
          <div className="flex flex-wrap gap-1.5 justify-end max-w-[260px]">
            {skills.slice(0, 6).map(s => (
              <span key={s} className="px-2 py-0.5 bg-white/10 text-white text-[10px] font-semibold rounded-full uppercase">{s}</span>
            ))}
            {skills.length > 6 && (
              <span className="px-2 py-0.5 bg-white/10 text-gray-400 text-[10px] font-semibold rounded-full">+{skills.length - 6} more</span>
            )}
          </div>
        </div>
      </div>

      {/* Stat row */}
      <div className="grid grid-cols-3 gap-4">
        {statCards.map(({ icon: Icon, label, value }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-200 px-5 py-4 flex items-center gap-4 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5 text-gray-400" />
            </div>
            <div>
              <p className="text-xl font-extrabold text-gray-900 leading-none">{value}</p>
              <p className="text-xs text-gray-400 font-medium mt-1">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Quick Actions</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {quickActions.map(({ icon: Icon, label, description, cta, ctaStyle, accent, iconColor, href }) => (
            <div key={label} className={`bg-white rounded-2xl border ${accent} p-6 flex flex-col gap-4 hover:shadow-md transition-all`}>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl ${accent} flex items-center justify-center border`}>
                  <Icon className={`w-4.5 h-4.5 ${iconColor}`} />
                </div>
                <h3 className="font-bold text-gray-900 text-base">{label}</h3>
              </div>
              <p className="text-sm text-gray-500 flex-1 leading-relaxed">{description}</p>
              <Link href={href}
                className={`w-full py-3 rounded-xl text-sm font-bold text-white ${ctaStyle} hover:opacity-90 transition-opacity flex items-center justify-center gap-2`}
              >
                {cta} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Recent Activity</p>
          {recentSessions.length > 0 && (
            <Link href="/dashboard/history" className="text-xs font-semibold text-primary hover:opacity-80 transition-opacity">
              View all →
            </Link>
          )}
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm divide-y divide-gray-100 overflow-hidden">
          {recentSessions.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mx-auto mb-3">
                <History className="w-5 h-5 text-gray-300" />
              </div>
              <p className="text-sm font-semibold text-gray-400">No exams taken yet</p>
              <p className="text-xs text-gray-300 mt-1">Your test history will appear here once you start an exam.</p>
            </div>
          ) : (
            recentSessions.map((s) => {
              const pct = Math.round((s.score / s.total) * 100)
              const date = new Date(s.completed_at)
              const timeAgo = formatTimeAgo(date)
              return (
                <Link key={s.id} href={`/dashboard/exam/result/${s.id}`}
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors group">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-extrabold ${
                    pct >= 70 ? 'bg-green-50 text-green-600 border border-green-200'
                    : pct >= 40 ? 'bg-yellow-50 text-yellow-600 border border-yellow-200'
                    : 'bg-red-50 text-red-500 border border-red-200'}`}>
                    {pct}%
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-800 truncate">{s.domain}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {s.score}/{s.total} correct · {Math.floor(s.time_taken_secs / 60)}m {s.time_taken_secs % 60}s · <span className="capitalize">{s.mode}</span>
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 font-medium flex-shrink-0">{timeAgo}</span>
                  <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-gray-500 transition-colors flex-shrink-0" />
                </Link>
              )
            })
          )}
        </div>
      </div>

    </div>
  )
}

function formatTimeAgo(date: Date) {
  const secs = Math.floor((Date.now() - date.getTime()) / 1000)
  if (secs < 60) return 'just now'
  const mins = Math.floor(secs / 60)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 7) return `${days}d ago`
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}
