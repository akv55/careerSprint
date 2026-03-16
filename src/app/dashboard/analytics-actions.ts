'use server'

import { createClient } from '@/utils/supabase/server'
import { getUserDomain } from './actions'

export async function getAnalyticsData() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const userDomain = await getUserDomain()
  if (!userDomain) return null

  // Fetch all test sessions for the user
  const { data: sessions } = await supabase
    .from('test_sessions')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: true }) // Chronological for logic

  if (!sessions || sessions.length === 0) {
    return {
      hasData: false,
      trendData: [],
      skillRadar: [],
      domainCompare: [],
      timeVsScore: [],
      weakestSkills: []
    }
  }

  // 1. Trend Data (Score over time)
  const trendData = sessions.map((s, idx) => ({
    name: `Exam ${idx + 1}`,
    scorePct: Math.round((s.score / s.total) * 100),
    domain: s.domain
  }))

  // 2. Time vs Score
  const timeVsScore = sessions.map((s, idx) => ({
    name: `Exam ${idx + 1}`,
    timeMin: Math.round(s.time_taken_secs / 60 * 10) / 10,
    scorePct: Math.round((s.score / s.total) * 100)
  }))

  // 3. Domain Comparison
  const domainStats: Record<string, { totalScore: number, totalQs: number, exams: number }> = {}
  for (const s of sessions) {
    if (!domainStats[s.domain]) domainStats[s.domain] = { totalScore: 0, totalQs: 0, exams: 0 }
    domainStats[s.domain].totalScore += s.score
    domainStats[s.domain].totalQs += s.total
    domainStats[s.domain].exams += 1
  }
  const domainCompare = Object.entries(domainStats).map(([domain, stats]) => ({
    domain,
    avgScore: Math.round((stats.totalScore / stats.totalQs) * 100),
    exams: stats.exams
  }))

  // 4. Skill Mastery Radar & Weakest Links
  // We need to fetch the questions to know which skills correspond to which question IDs
  const allQuestionIds = new Set<string>()
  for (const s of sessions) {
    s.question_ids.forEach((id: string) => allQuestionIds.add(id))
  }

  // Fetch questions in batches if needed (assuming < few hundred unique questions for now)
  const qIdArr = Array.from(allQuestionIds)
  const skillMap: Record<string, { correct: number, total: number }> = {}

  if (qIdArr.length > 0) {
    const { data: questions } = await supabase
      .from('questions')
      .select('id, skill')
      .in('id', qIdArr)

    if (questions) {
      const qSkillMap = new Map(questions.map(q => [q.id, q.skill]))

      for (const s of sessions) {
        // Evaluate each answer
        for (const [qId, ans] of Object.entries(s.answers)) {
          const skill = qSkillMap.get(qId)
          if (!skill) continue
          
          if (!skillMap[skill]) skillMap[skill] = { correct: 0, total: 0 }
          skillMap[skill].total += 1
          
          // To evaluate correct/wrong, we'd need actual answers.. wait!
          // Actually test_sessions doesn't store per-question correctness boolean.
          // Let's refetch 'correct' field as well to calculate this accurately. 
        }
      }
    }
  }

  // Let me revise the skill logic to fetch 'correct' too so we can accurately score skills
  const detailedSkillMap: Record<string, { correct: number, total: number }> = {}
  
  if (qIdArr.length > 0) {
    const { data: questions } = await supabase
      .from('questions')
      .select('id, skill, correct')
      .in('id', qIdArr)
      
    if (questions) {
      const qDataMap = new Map(questions.map(q => [q.id, { skill: q.skill, correct: q.correct }]))
      
      for (const s of sessions) {
        for (const [qId, userAns] of Object.entries(s.answers)) {
          const qObj = qDataMap.get(qId)
          if (!qObj) continue
          
          if (!detailedSkillMap[qObj.skill]) detailedSkillMap[qObj.skill] = { correct: 0, total: 0 }
          detailedSkillMap[qObj.skill].total += 1
          if (userAns === qObj.correct) {
            detailedSkillMap[qObj.skill].correct += 1
          }
        }
      }
    }
  }

  const skillRadar = Object.entries(detailedSkillMap).map(([skill, stats]) => ({
    skill,
    accuracy: Math.round((stats.correct / stats.total) * 100),
    fullMark: 100 // for radar chart maximum
  }))
  
  // Sort for weakest skills (minimum 5 questions attempted to qualify)
  const weakestSkills = skillRadar
    .filter(s => detailedSkillMap[s.skill].total >= 3) // Need at least 3 attempts to be statistically somewhat relevant
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 3)

  return {
    hasData: true,
    trendData,
    timeVsScore,
    domainCompare,
    skillRadar,
    weakestSkills
  }
}
