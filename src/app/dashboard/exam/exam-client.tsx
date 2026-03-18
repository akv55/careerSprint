'use client'

import { useState } from 'react'
import ExamModeSelector from './exam-mode-selector'
import ExamRunner from './exam-runner'
import { getExamQuestions, type ExamMode, type ExamQuestion } from '../exam-actions'
import { Loader2 } from 'lucide-react'

import DashboardLayoutWrapper from '../components/dashboard-layout-wrapper'

interface ExamClientProps {
  domain: string
  secondaryDomain?: string | null
  skills: string[]
  profileFullName?: string | null
  email: string
  role?: string | null
}

export default function ExamClient({ domain, secondaryDomain, skills, profileFullName, email, role }: ExamClientProps) {
  const [phase, setPhase] = useState<'select' | 'loading' | 'running'>('select')
  const [mode, setMode] = useState<ExamMode>('both')
  const [questions, setQuestions] = useState<ExamQuestion[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleStart = async (selectedMode: ExamMode) => {
    setMode(selectedMode)
    setPhase('loading')
    setError(null)

    const result = await getExamQuestions(domain, skills, secondaryDomain, selectedMode)
    if (result.error) {
      setError(result.error)
      setPhase('select')
      return
    }
    if (result.questions.length === 0) {
      setError('No questions found for your domain. Please try again later.')
      setPhase('select')
      return
    }
    setQuestions(result.questions)
    setPhase('running')
  }

  if (phase === 'running') {
    return (
      <ExamRunner
        questions={questions}
        domain={domain}
        secondaryDomain={secondaryDomain}
        mode={mode}
      />
    )
  }

  return (
    <DashboardLayoutWrapper profileFullName={profileFullName} email={email} domain={domain} role={role}>
      {phase === 'loading' ? (
        <div className="flex items-center justify-center py-24">
          <div className="text-center">
            <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-4" />
            <p className="text-lg font-bold text-gray-700">Preparing your exam...</p>
            <p className="text-sm text-gray-400 mt-1">Fetching {mode === 'both' ? 'mixed domain' : mode} questions</p>
          </div>
        </div>
      ) : (
        <ExamModeSelector
          domain={domain}
          secondaryDomain={secondaryDomain}
          onStart={handleStart}
          error={error}
        />
      )}
    </DashboardLayoutWrapper>
  )
}
