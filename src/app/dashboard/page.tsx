'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { TrendingUp, Shield, Target, Sparkles } from 'lucide-react'
import { SkillProgressCards } from '@/components/dashboard/SkillProgressCards'

const PerformanceChart = dynamic(() => import('./performance-chart'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full rounded-xl bg-base-200 animate-pulse" />
  ),
})

const SkillBarChart = dynamic(() => import('./skill-bar-chart'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full rounded-xl bg-base-200 animate-pulse" />
  ),
})

const SkillRadarChart = dynamic(() => import('./skill-radar-chart'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full rounded-xl bg-base-200 animate-pulse" />
  ),
})

type Skill = { name: string; value: number }

export default function Dashboard() {
  const stats = [
    { title: 'Readiness', value: '72%', sub: '+6% this week', icon: TrendingUp },
    { title: 'Tests taken', value: '8', sub: 'Last 30 days', icon: Target },
    { title: 'Avg score', value: '78%', sub: 'Across attempts', icon: TrendingUp },
    { title: 'Cheating risk', value: 'Low', sub: 'Stable', icon: Shield },
  ] as const

  const skills: Skill[] = [
    { name: 'DSA', value: 68 },
    { name: 'System Design', value: 54 },
    { name: 'JavaScript/TS', value: 82 },
    { name: 'Communication', value: 63 },
  ]

  const recommended = [
    { title: 'Frontend Fundamentals (AI)', level: 'Intermediate', mins: 25 },
    { title: 'System Design Sprint', level: 'Beginner', mins: 30 },
    { title: 'Behavioral Round Drill', level: 'All levels', mins: 15 },
  ] as const

  return (
    <div className="space-y-8">

      {/* HERO */}
      <section className="relative overflow-hidden rounded-2xl p-8 text-white 
      bg-gradient-to-r from-blue-600 to-orange-500 
      bg-[length:200%_200%] animate-[gradientMove_8s_ease_infinite]">

        <div className="absolute inset-0 opacity-10 
        bg-[radial-gradient(circle_at_20%_30%,white,transparent_40%),radial-gradient(circle_at_80%_20%,white,transparent_40%)]" />

        <div className="relative z-10">
          <p className="text-sm font-semibold opacity-90">Welcome back 👋</p>
          <h1 className="text-3xl sm:text-4xl font-bold mt-2">
            Ready to level up?
          </h1>
          <p className="mt-3 max-w-xl opacity-90">
            Your readiness improved by 6% this week. Keep pushing your skill limits 🚀
          </p>

          <div className="mt-6 flex gap-3">
            <Link href="/dashboard/upload-cv"
              className="px-5 py-2 rounded-lg bg-white text-black font-semibold hover:scale-105 transition">
              Upload CV
            </Link>
            <Link href="/dashboard/ai-tests"
              className="px-5 py-2 rounded-lg bg-white/20 border border-white/30 hover:bg-white/30 transition">
              Browse AI Tests
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <div key={s.title}
				  className="rounded-2xl p-5 bg-gradient-to-br from-[#f5f8ff] via-white to-[#fff5ec] border border-[#d4d9ff]
				  shadow-sm hover:shadow-lg transition hover:-translate-y-1">

              <div className="relative flex items-start justify-between gap-4 p-2">
					<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0F6FFF] to-[#FF8A21] text-white shadow-sm">
					  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 text-right">
                  <p className="text-xs font-semibold text-base-content/60  py-1 uppercase tracking-wider">{s.title}</p>
                  <h2 className="mt-1 text-2xl font-bold text-base-content tracking-tight">{s.value}</h2>
                </div>
              </div>
				<p className="text-xs font-medium text-[#0F2B6F] bg-white/70 border border-[#d4d9ff] rounded-full mt-2 px-3 py-1 w-fit">
                {s.sub}
              </p>
            </div>
          )
        })}
      </section>

      {/* ANALYTICS GRID */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* SKILL PROGRESS */}
        <div className="rounded-2xl p-6 bg-base-100 border border-base-200 shadow-sm">
          <div className="flex justify-between">
            <h2 className="font-bold text-lg">Skill Progress</h2>
            <Link href="/dashboard/results"
              className="text-sm text-blue-600 font-semibold">
              Details
            </Link>
          </div>
          <div className="mt-4">
            <SkillProgressCards skills={skills} />
          </div>
        </div>

        {/* RADAR CHART */}
        <div className="rounded-2xl p-6 bg-base-100 border border-base-200 shadow-sm">
          <h2 className="font-bold text-lg">Skill Analytics</h2>
          <p className="text-sm text-base-content/60 mt-1">
            Radar view of your core competencies.
          </p>
          <div className="mt-4 h-64">
            <SkillRadarChart />
          </div>
        </div>

        {/* PERFORMANCE */}
        <div className="rounded-2xl p-6 bg-base-100 border border-base-200 shadow-sm">
          <div className="flex justify-between">
            <h2 className="font-bold text-lg">Performance</h2>
            <Link href="/dashboard/results"
              className="text-sm text-blue-600 font-semibold">
              View results
            </Link>
          </div>
          <p className="text-sm text-base-content/60 mt-1">
            Last 7 attempts
          </p>
          <div className="mt-4 h-64">
            <PerformanceChart />
          </div>
        </div>
      </section>

      {/* AI INSIGHTS */}
      <section className="rounded-2xl p-6 border border-blue-200 bg-blue-50/40 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-orange-500" />
          <h2 className="font-bold text-lg text-blue-700">
            AI Insight
          </h2>
        </div>
        <p className="mt-3 text-sm text-blue-800">
          Your consistency improved by 12%. Focus on System Design to increase
          readiness score to 80% in the next 2 weeks.
        </p>
      </section>

      {/* RECOMMENDED */}
      <section className="rounded-2xl p-6 bg-base-100 border border-base-200 shadow-sm">
        <h2 className="font-bold text-lg">Recommended Tests</h2>
        <p className="text-sm text-base-content/60 mt-1">
          Based on AI skill gap detection.
        </p>

        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommended.map((test) => (
            <div key={test.title}
              className="p-4 rounded-xl border border-base-200 
              hover:shadow-md transition">

              <p className="font-semibold">{test.title}</p>
              <p className="text-xs text-base-content/60 mt-1">
                {test.level} • {test.mins} mins
              </p>

              <Link href="/dashboard/ai-tests"
                className="mt-3 inline-block text-sm font-semibold 
                text-white bg-blue-600 px-4 py-1.5 rounded-lg 
                hover:bg-orange-500 transition">
                Start
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* BAR CHART */}
      <section className="rounded-2xl p-6 bg-base-100 border border-base-200 shadow-sm">
        <h2 className="font-bold text-lg">Skill Comparison</h2>
        <p className="text-sm text-base-content/60 mt-1">
          Bar chart breakdown.
        </p>
        <div className="mt-4 h-72">
          <SkillBarChart />
        </div>
      </section>
    </div>
  )
}