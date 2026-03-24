'use client'
import { 
  Users, 
  CheckCircle2, 
  TrendingUp, 
  Clock,
  ArrowUpRight
} from 'lucide-react'
import { motion } from 'framer-motion'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts'

import Link from 'next/link'

interface AdminStats {
  userCount: number
  examCount: number
  recentUsers: number
  avgSuccessRate: number
  recentActivities: any[]
  chartData: any[]
}

export default function AdminDashboardClient({ stats }: { stats: AdminStats }) {
  const kpis = [
    { 
      label: 'Total Users', 
      value: stats.userCount || 0, 
      icon: Users, 
      color: 'blue',
      growth: `+${stats.recentUsers || 0} this month`
    },
    { 
      label: 'Exams Completed', 
      value: stats.examCount || 0, 
      icon: CheckCircle2, 
      color: 'green',
      growth: 'Stable traffic'
    },
    { 
      label: 'Avg. Success Rate', 
      value: `${stats.avgSuccessRate || 0}%`, 
      icon: TrendingUp, 
      color: 'purple',
      growth: 'Based on all tests'
    },
    { 
      label: 'Active Now', 
      value: 'Live', 
      icon: Clock, 
      color: 'orange',
      growth: 'Real-time monitoring'
    }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Platform Analytics</h1>
        <p className="text-slate-500">Overview of platform growth and user performance.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-${kpi.color}-50 text-${kpi.color}-600`}>
                <kpi.icon size={24} />
              </div>
              <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full">
                {kpi.growth}
              </span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">{kpi.label}</h3>
            <p className="text-2xl font-bold text-slate-900 mt-1">{kpi.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* User Growth Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 mb-6">User Growth</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.chartData || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#0f172a', fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Exam Attempts Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Exam Attempts</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.chartData || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <RechartsTooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#0f172a', fontWeight: 600 }}
                />
                <Bar dataKey="exams" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Recent Exam Activities</h2>
          <Link href="/admin/sessions" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
            View All <ArrowUpRight size={16} />
          </Link>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 divide-y divide-slate-50 overflow-hidden">
          {stats.recentActivities.length > 0 ? (
            stats.recentActivities.map((activity) => {
              const profile = Array.isArray(activity.profiles) ? activity.profiles[0] : activity.profiles
              const displayName = profile?.full_name || profile?.email || 'Anonymous'
              const initials = displayName.split(' ').map((w: string) => w[0]).slice(0,2).join('').toUpperCase()
              return (
                <Link 
                  href={`/admin/sessions/${activity.id}`} 
                  key={activity.id} 
                  className="p-4 hover:bg-slate-50 transition-colors flex items-center gap-4 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt={displayName} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-sm font-bold text-blue-600">{initials}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 truncate">
                      {displayName}
                    </p>
                    <p className="text-sm text-slate-500 truncate">
                      Completed <span className="font-medium text-slate-700">{activity.domain}</span> exam • {activity.score}/{activity.total} score
                    </p>
                  </div>
                  <div className="text-right whitespace-nowrap">
                    <p className="text-xs font-medium text-slate-400">
                      {new Date(activity.completed_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <p className="text-xs text-slate-400">
                      {new Date(activity.completed_at).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              )
            })
          ) : (
            <div className="p-8 text-center text-slate-500">
              No recent activities found.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}