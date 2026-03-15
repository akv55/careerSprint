'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, XCircle, Trophy, Clock, ArrowLeft, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react'

interface Question {
  id: string; domain: string; skill: string; difficulty: string
  question: string; options: { a: string; b: string; c: string; d: string }
  correct: string; explanation: string | null
}

interface Session {
  id: string; domain: string; secondary_domain?: string | null; mode: string
  score: number; total: number; time_taken_secs: number; completed_at: string
  answers: Record<string, string>; question_ids: string[]
}

interface Props { session: Session; questions: Question[] }

export default function ExamResult({ session, questions }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null)
  const pct = Math.round((session.score / session.total) * 100)
  const fmtTime = (s: number) => `${Math.floor(s / 60)}m ${s % 60}s`

  // Sort questions to match original order
  const orderedQs = session.question_ids.map(id => questions.find(q => q.id === id)).filter(Boolean) as Question[]

  // Group by skill for breakdown
  const skillBreakdown: Record<string, { correct: number; total: number }> = {}
  for (const q of orderedQs) {
    if (!skillBreakdown[q.skill]) skillBreakdown[q.skill] = { correct: 0, total: 0 }
    skillBreakdown[q.skill].total++
    if (session.answers[q.id] === q.correct) skillBreakdown[q.skill].correct++
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-8">

        {/* Back link */}
        <Link href="/dashboard" className="text-sm font-semibold text-gray-400 hover:text-gray-700 transition-colors mb-6 inline-flex items-center gap-1.5">
          <ArrowLeft className="w-3.5 h-3.5" /> Dashboard
        </Link>

        {/* Score card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-8">
          <div className="bg-gray-950 px-8 py-6 text-center">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-3 text-3xl font-black ${
              pct >= 80 ? 'bg-green-500/20 text-green-400' :
              pct >= 50 ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-red-500/20 text-red-400'
            }`}>
              {pct}%
            </div>
            <h1 className="text-xl font-extrabold text-white">{session.score}/{session.total} Correct</h1>
            <p className="text-gray-400 text-sm mt-1">
              {pct >= 80 ? 'Excellent work! 🎉' : pct >= 50 ? 'Good effort! Keep practicing.' : 'Keep studying, you\'ll improve!'}
            </p>
          </div>

          <div className="grid grid-cols-3 divide-x divide-gray-100 px-4 py-4 text-center">
            <div>
              <p className="text-xs text-gray-400 font-medium">Domain</p>
              <p className="text-sm font-bold text-gray-900 mt-0.5">{session.domain}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Mode</p>
              <p className="text-sm font-bold text-gray-900 mt-0.5 capitalize">{session.mode}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Time</p>
              <p className="text-sm font-bold text-gray-900 mt-0.5 flex items-center justify-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gray-400" /> {fmtTime(session.time_taken_secs)}
              </p>
            </div>
          </div>
        </div>

        {/* Skill breakdown */}
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Skill Breakdown</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Object.entries(skillBreakdown).map(([skill, { correct, total }]) => {
              const spct = Math.round((correct / total) * 100)
              return (
                <div key={skill} className="bg-white rounded-xl border border-gray-200 p-3">
                  <p className="text-xs font-bold text-gray-700 capitalize truncate">{skill}</p>
                  <p className={`text-lg font-extrabold mt-0.5 ${spct >= 70 ? 'text-green-600' : spct >= 40 ? 'text-yellow-600' : 'text-red-500'}`}>
                    {correct}/{total}
                  </p>
                  <div className="h-1.5 bg-gray-100 rounded-full mt-1.5">
                    <div className={`h-full rounded-full ${spct >= 70 ? 'bg-green-500' : spct >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${spct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Per-question review */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Question Review</p>
          <div className="space-y-2">
            {orderedQs.map((q, i) => {
              const userAns = session.answers[q.id]
              const isCorrect = userAns === q.correct
              const isOpen = expanded === q.id

              return (
                <div key={q.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <button onClick={() => setExpanded(isOpen ? null : q.id)}
                    className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors">
                    {isCorrect
                      ? <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      : <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />}
                    <span className="text-sm text-gray-800 flex-1 truncate">
                      <span className="font-bold text-gray-400 mr-2">Q{i + 1}</span>
                      {q.question}
                    </span>
                    <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded capitalize flex-shrink-0">{q.skill}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 border-t border-gray-100 pt-3 space-y-2">
                      {(['a', 'b', 'c', 'd'] as const).map(opt => {
                        const isUser = userAns === opt
                        const isRight = q.correct === opt
                        return (
                          <div key={opt} className={`p-3 rounded-lg text-sm flex items-start gap-2 ${
                            isRight ? 'bg-green-50 border border-green-200' :
                            isUser && !isRight ? 'bg-red-50 border border-red-200' :
                            'bg-gray-50 border border-transparent'}`}>
                            <span className={`font-bold text-xs mt-0.5 ${isRight ? 'text-green-600' : isUser ? 'text-red-500' : 'text-gray-400'}`}>
                              {opt.toUpperCase()}
                            </span>
                            <span className="text-gray-700">{q.options[opt]}</span>
                            {isRight && <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 ml-auto mt-0.5" />}
                            {isUser && !isRight && <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 ml-auto mt-0.5" />}
                          </div>
                        )
                      })}
                      {q.explanation && (
                        <div className="mt-2 p-3 bg-primary/5 rounded-lg border border-primary/10">
                          <p className="text-xs font-bold text-primary mb-1">Explanation</p>
                          <p className="text-sm text-gray-700">{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex items-center gap-4 justify-center">
          <Link href="/dashboard/exam"
            className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl text-sm font-bold hover:opacity-90 transition-all">
            <RotateCcw className="w-4 h-4" /> Take Another Exam
          </Link>
          <Link href="/dashboard"
            className="px-6 py-3 rounded-xl text-sm font-semibold text-gray-500 border border-gray-200 hover:bg-gray-50 transition-all">
            Dashboard
          </Link>
        </div>

      </div>
    </div>
  )
}
