'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, History, ChevronRight, Clock, Target, Filter, FileText } from 'lucide-react'
import CustomSelect from '@/components/ui/custom-select'

interface Session {
  id: string; domain: string; secondary_domain?: string | null; mode: string
  score: number; total: number; time_taken_secs: number; completed_at: string
}

interface Props { sessions: Session[] }

type SortKey = 'date' | 'score' | 'time'

export default function HistoryList({ sessions }: Props) {
  const [sortBy, setSortBy] = useState<SortKey>('date')
  const [filterDomain, setFilterDomain] = useState<string>('all')

  const domains = Array.from(new Set(sessions.map(s => s.domain)))

  const filtered = sessions.filter(s => filterDomain === 'all' || s.domain === filterDomain)

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'score') return (b.score / b.total) - (a.score / a.total)
    if (sortBy === 'time') return a.time_taken_secs - b.time_taken_secs
    return new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime()
  })

  // Aggregate stats
  const totalExams = sessions.length
  const avgScore = sessions.length > 0
    ? Math.round(sessions.reduce((s, h) => s + (h.score / h.total) * 100, 0) / sessions.length)
    : 0
  const totalTime = sessions.reduce((s, h) => s + h.time_taken_secs, 0)

  return (
    <>
      <Link href="/dashboard" className="text-sm font-semibold text-gray-400 hover:text-gray-700 transition-colors mb-6 inline-flex items-center gap-1.5">
        <ArrowLeft className="w-3.5 h-3.5" /> Dashboard
      </Link>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-6">
        <div className="bg-gray-950 px-8 py-6">
          <h1 className="text-xl font-extrabold text-white">Test History</h1>
          <p className="text-sm text-gray-400 mt-1">Review all your past exam attempts and track improvement.</p>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-3 divide-x divide-gray-100 px-4 py-4 text-center">
          <div>
            <p className="text-lg font-extrabold text-gray-900">{totalExams}</p>
            <p className="text-xs text-gray-400 font-medium">Total Exams</p>
          </div>
          <div>
            <p className="text-lg font-extrabold text-gray-900">{totalExams > 0 ? `${avgScore}%` : '—'}</p>
            <p className="text-xs text-gray-400 font-medium">Avg Score</p>
          </div>
          <div>
            <p className="text-lg font-extrabold text-gray-900">{totalExams > 0 ? fmtTime(Math.round(totalTime / totalExams)) : '—'}</p>
            <p className="text-xs text-gray-400 font-medium">Avg Time</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      {sessions.length > 0 && (
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <CustomSelect
              options={[
                { label: 'All Domains', value: 'all' },
                ...domains.map(d => ({ label: d, value: d }))
              ]}
              value={filterDomain}
              onChange={setFilterDomain}
              className="w-48"
            />
          </div>
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
            {([['date', 'Latest'], ['score', 'Score'], ['time', 'Time']] as [SortKey, string][]).map(([key, label]) => (
              <button key={key} onClick={() => setSortBy(key)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  sortBy === key ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                {label}
              </button>
            ))}
          </div>
          <span className="text-xs text-gray-400 ml-auto">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
        </div>
      )}

      {/* Sessions list */}
      {sessions.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-6 py-16 text-center">
          <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mx-auto mb-4">
            <History className="w-6 h-6 text-gray-300" />
          </div>
          <p className="text-base font-bold text-gray-500">No exams taken yet</p>
          <p className="text-sm text-gray-400 mt-1 mb-6">Start a practice exam to see your results here.</p>
          <Link href="/dashboard/exam" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl text-sm font-bold hover:opacity-90 transition-all">
            <FileText className="w-4 h-4" /> Start an Exam
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm divide-y divide-gray-100 overflow-hidden">
          {sorted.map((s) => {
            const pct = Math.round((s.score / s.total) * 100)
            const date = new Date(s.completed_at)
            return (
              <Link key={s.id} href={`/dashboard/exam/result/${s.id}`}
                className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors group">

                {/* Score badge */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-extrabold ${
                  pct >= 70 ? 'bg-green-50 text-green-600 border border-green-200'
                  : pct >= 40 ? 'bg-yellow-50 text-yellow-600 border border-yellow-200'
                  : 'bg-red-50 text-red-500 border border-red-200'}`}>
                  {pct}%
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-gray-800 truncate">{s.domain}</p>
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-bold rounded capitalize flex-shrink-0">{s.mode}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-2">
                    <span className="flex items-center gap-1"><Target className="w-3 h-3" />{s.score}/{s.total}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{fmtTime(s.time_taken_secs)}</span>
                  </p>
                </div>

                {/* Date */}
                <div className="text-right flex-shrink-0 hidden sm:block">
                  <p className="text-xs font-semibold text-gray-500">
                    {date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    {date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors flex-shrink-0" />
              </Link>
            )
          })}
        </div>
      )}
    </>
  )
}

function fmtTime(s: number) {
  return `${Math.floor(s / 60)}m ${s % 60}s`
}
