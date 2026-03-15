'use client'

import { useState } from 'react'
import { ArrowRight, Layers, Target, Zap, AlertCircle } from 'lucide-react'
import type { ExamMode } from '../exam-actions'
import Link from 'next/link'

interface Props {
  domain: string
  secondaryDomain?: string | null
  onStart: (mode: ExamMode) => void
  error: string | null
}

const modes: { mode: ExamMode; icon: typeof Target; label: string; desc: string; accent: string }[] = [
  {
    mode: 'primary', icon: Target, label: 'Primary Domain',
    desc: '30 questions from your primary engineering domain.',
    accent: 'border-primary/30 bg-primary/5 hover:border-primary/60',
  },
  {
    mode: 'secondary', icon: Zap, label: 'Secondary Domain',
    desc: '30 questions from your secondary domain.',
    accent: 'border-accent/30 bg-accent/5 hover:border-accent/60',
  },
  {
    mode: 'both', icon: Layers, label: 'Mixed (Both)',
    desc: '20 from primary + 10 from secondary for a broad test.',
    accent: 'border-gray-300 bg-gray-50 hover:border-gray-400',
  },
]

export default function ExamModeSelector({ domain, secondaryDomain, onStart, error }: Props) {
  const [selected, setSelected] = useState<ExamMode>(secondaryDomain ? 'both' : 'primary')

  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-full max-w-xl">
        <Link href="/dashboard" className="text-sm font-semibold text-gray-400 hover:text-gray-700 transition-colors mb-6 inline-block">
          ← Back to Dashboard
        </Link>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gray-950 px-8 py-6">
            <h1 className="text-xl font-extrabold text-white">Start a Practice Exam</h1>
            <p className="text-sm text-gray-400 mt-1">Choose which domain to test yourself on. 30 MCQs per session.</p>
          </div>

          <div className="p-8 space-y-4">
            {error && (
              <div className="flex items-center gap-2 bg-red-50 text-red-600 p-3 rounded-xl text-sm border border-red-200">
                <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
              </div>
            )}

            {modes.map(({ mode, icon: Icon, label, desc, accent }) => {
              const disabled = mode === 'secondary' && !secondaryDomain
              const active = selected === mode

              return (
                <button key={mode} disabled={disabled}
                  onClick={() => setSelected(mode)}
                  className={`w-full text-left p-5 rounded-xl border-2 transition-all flex items-start gap-4
                    ${disabled ? 'opacity-40 cursor-not-allowed border-gray-200 bg-gray-50'
                      : active ? accent + ' ring-2 ring-offset-1 ring-primary/30' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                    ${active ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">
                      {label}
                      {mode !== 'secondary' && <span className="ml-2 text-gray-400 font-medium text-xs">({mode === 'primary' ? domain : `${domain} + ${secondaryDomain || '—'}`})</span>}
                      {mode === 'secondary' && <span className="ml-2 text-gray-400 font-medium text-xs">({secondaryDomain || 'Not set'})</span>}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                    {disabled && <p className="text-xs text-red-400 mt-1">Set a secondary domain in your profile first.</p>}
                  </div>
                </button>
              )
            })}

            <button onClick={() => onStart(selected)}
              className="w-full mt-4 py-3.5 rounded-xl bg-primary text-white text-sm font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              Begin Exam <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
