'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight, Clock, Send, Loader2, AlertCircle } from 'lucide-react'
import { saveTestSession, type ExamMode, type ExamQuestion } from '../exam-actions'

interface Props {
  questions: ExamQuestion[]
  domain: string
  secondaryDomain?: string | null
  mode: ExamMode
}

export default function ExamRunner({ questions, domain, secondaryDomain, mode }: Props) {
  const router = useRouter()
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const startTime = useRef(Date.now())

  // Timer
  const [elapsed, setElapsed] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setElapsed(Math.floor((Date.now() - startTime.current) / 1000)), 1000)
    return () => clearInterval(t)
  }, [])

  const q = questions[current]
  const answered = Object.keys(answers).length
  const isLast = current === questions.length - 1

  const selectAnswer = (opt: string) => {
    setAnswers(prev => ({ ...prev, [q.id]: opt }))
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    setError(null)
    const result = await saveTestSession({
      questionIds: questions.map(q => q.id),
      answers,
      domain,
      secondaryDomain,
      mode,
      timeTakenSecs: Math.floor((Date.now() - startTime.current) / 1000),
    })
    if (result.error) { setError(result.error); setSubmitting(false); return }
    router.push(`/dashboard/exam/result/${result.id}`)
  }

  const fmtTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              {mode === 'both' ? 'Mixed' : mode} Exam
            </span>
            <span className="text-xs text-gray-300">•</span>
            <span className="text-xs font-semibold text-gray-500">{q.domain}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-sm font-mono font-bold text-gray-600">
              <Clock className="w-4 h-4 text-gray-400" /> {fmtTime(elapsed)}
            </div>
            <span className="text-xs font-bold text-gray-400">{answered}/{questions.length} answered</span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-1 bg-gray-100">
          <div className="h-full bg-primary transition-all duration-300" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
        </div>
      </div>

      {/* Question area */}
      <div className="flex-1 max-w-3xl mx-auto w-full px-6 py-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="inline-block px-2.5 py-1 bg-gray-100 text-gray-500 text-xs font-bold rounded-lg uppercase">
            Q{current + 1}/{questions.length}
          </span>
          <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-bold rounded-lg capitalize">
            {q.skill}
          </span>
          <span className={`px-2.5 py-1 text-xs font-bold rounded-lg capitalize ${
            q.difficulty === 'easy' ? 'bg-green-50 text-green-600' :
            q.difficulty === 'hard' ? 'bg-red-50 text-red-600' :
            'bg-yellow-50 text-yellow-600'
          }`}>
            {q.difficulty}
          </span>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-8 leading-relaxed">{q.question}</h2>

        <div className="space-y-3">
          {(['a', 'b', 'c', 'd'] as const).map(opt => {
            const selected = answers[q.id] === opt
            return (
              <button key={opt} onClick={() => selectAnswer(opt)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-3
                  ${selected
                    ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                    : 'border-gray-200 bg-white hover:border-gray-300'}`}
              >
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                  selected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  {opt.toUpperCase()}
                </span>
                <span className="text-sm text-gray-800 pt-1">{q.options[opt]}</span>
              </button>
            )
          })}
        </div>

        {error && (
          <div className="mt-6 flex items-center gap-2 bg-red-50 text-red-600 p-3 rounded-xl text-sm border border-red-200">
            <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <div className="bg-white border-t border-gray-200 sticky bottom-0">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0}
            className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          {/* Question dots (compact) */}
          <div className="hidden sm:flex items-center gap-1 flex-wrap max-w-[300px] justify-center">
            {questions.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === current ? 'bg-primary scale-125' :
                  answers[questions[i].id] ? 'bg-primary/40' : 'bg-gray-200'}`}
              />
            ))}
          </div>

          {isLast ? (
            <button onClick={handleSubmit} disabled={submitting}
              className="flex items-center gap-2 bg-accent text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-all disabled:opacity-50">
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Submit Exam
            </button>
          ) : (
            <button onClick={() => setCurrent(c => Math.min(questions.length - 1, c + 1))}
              className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:opacity-80 transition-opacity">
              Next <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
