'use server'

import { createClient } from '@/utils/supabase/server'

export type ExamMode = 'primary' | 'secondary' | 'both'

export interface ExamQuestion {
  id: string
  domain: string
  skill: string
  difficulty: string
  question: string
  options: { a: string; b: string; c: string; d: string }
}

/** Fetch 30 random questions filtered by domain/skills and mode */
export async function getExamQuestions(
  domain: string,
  skills: string[],
  secondaryDomain?: string | null,
  mode: ExamMode = 'both'
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated', questions: [] }

  const targetCount = 30
  let primaryCount = targetCount
  let secondaryCount = 0

  if (mode === 'both' && secondaryDomain) {
    primaryCount = 20
    secondaryCount = 10
  } else if (mode === 'secondary') {
    primaryCount = 0
    secondaryCount = targetCount
  }

  const questions: ExamQuestion[] = []

  // Fetch primary domain questions
  if (primaryCount > 0) {
    const { data } = await supabase
      .from('questions')
      .select('id, domain, skill, difficulty, question, options')
      .eq('domain', domain)
      .order('id') // stable sort before randomising client-side
    if (data) {
      // Prefer matching skills, then backfill from same domain
      const matched = data.filter(q => skills.some(s => q.skill.toLowerCase() === s.toLowerCase()))
      const rest = data.filter(q => !matched.includes(q))
      const pool = [...shuffle(matched), ...shuffle(rest)]
      questions.push(...pool.slice(0, primaryCount))
    }
  }

  // Fetch secondary domain questions
  if (secondaryCount > 0 && secondaryDomain) {
    const { data } = await supabase
      .from('questions')
      .select('id, domain, skill, difficulty, question, options')
      .eq('domain', secondaryDomain)
    if (data) {
      questions.push(...shuffle(data).slice(0, secondaryCount))
    }
  }

  // Backfill if not enough
  if (questions.length < targetCount) {
    const existingIds = questions.map(q => q.id)
    const backfillDomain = mode === 'secondary' ? secondaryDomain : domain
    if (backfillDomain) {
      const { data } = await supabase
        .from('questions')
        .select('id, domain, skill, difficulty, question, options')
        .eq('domain', backfillDomain)
        .not('id', 'in', `(${existingIds.join(',')})`)
      if (data) {
        questions.push(...shuffle(data).slice(0, targetCount - questions.length))
      }
    }
  }

  return { questions: shuffle(questions).slice(0, targetCount) }
}

/** Save completed test session — scoring happens server-side */
export async function saveTestSession(data: {
  questionIds: string[]
  answers: Record<string, string>
  domain: string
  secondaryDomain?: string | null
  mode: ExamMode
  timeTakenSecs: number
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  // Score server-side by fetching correct answers
  const { data: questions } = await supabase
    .from('questions')
    .select('id, correct')
    .in('id', data.questionIds)

  if (!questions) return { error: 'Failed to load questions for scoring' }

  let score = 0
  const correctMap: Record<string, string> = {}
  for (const q of questions) {
    correctMap[q.id] = q.correct
    if (data.answers[q.id] === q.correct) score++
  }

  const { data: session, error } = await supabase
    .from('test_sessions')
    .insert({
      user_id: user.id,
      domain: data.domain,
      secondary_domain: data.secondaryDomain || null,
      mode: data.mode,
      question_ids: data.questionIds,
      answers: data.answers,
      score,
      total: data.questionIds.length,
      time_taken_secs: data.timeTakenSecs,
      completed_at: new Date().toISOString(),
    })
    .select('id')
    .single()

  if (error) return { error: error.message }
  return { id: session.id, score, total: data.questionIds.length }
}

/** Get all test sessions for the current user */
export async function getTestHistory() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data } = await supabase
    .from('test_sessions')
    .select('id, domain, secondary_domain, mode, score, total, time_taken_secs, completed_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return data || []
}

/** Get a single test session with full question data for review */
export async function getTestSessionById(sessionId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: session } = await supabase
    .from('test_sessions')
    .select('*')
    .eq('id', sessionId)
    .eq('user_id', user.id)
    .single()

  if (!session) return null

  const { data: questions } = await supabase
    .from('questions')
    .select('id, domain, skill, difficulty, question, options, correct, explanation')
    .in('id', session.question_ids)

  return { session, questions: questions || [] }
}

/** Fisher-Yates shuffle */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
