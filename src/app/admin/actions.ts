'use server'

import { createClient } from '@/utils/supabase/server'

export async function getAdminStats() {
  const supabase = await createClient()
  
  // Verify admin role again for safety
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') throw new Error('Unauthorized')

  // 1. Total Registered Users
  const { count: userCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })

  // 2. Total Exams Completed
  const { count: examCount } = await supabase
    .from('test_sessions')
    .select('*', { count: 'exact', head: true })

  // 3. User Growth (Last 30 days)
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  
  const { count: recentUsers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', thirtyDaysAgo.toISOString())

  // 4. Recent Activities (Fetch sessions then join locally since foreign key is to auth.users not profiles)
  const { data: rawActivities } = await supabase
    .from('test_sessions')
    .select('*')
    .order('completed_at', { ascending: false })
    .limit(10)

  let recentActivities: any[] = []
  if (rawActivities && rawActivities.length > 0) {
    const userIds = Array.from(new Set(rawActivities.map(a => a.user_id)))
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, full_name, email, avatar_url')
      .in('id', userIds)
    
    recentActivities = rawActivities.map(activity => {
      const profile = profiles?.find(p => p.id === activity.user_id) || null
      return {
        ...activity,
        profiles: profile
      }
    })
  }

  // 5. Success Rate
  // Simplified logic: Average score percentage across all sessions
  const { data: allSessions } = await supabase
    .from('test_sessions')
    .select('score, total')
  
  let avgSuccessRate = 0
  if (allSessions && allSessions.length > 0) {
    const totalPct = allSessions.reduce((acc, curr) => acc + (curr.score / curr.total), 0)
    avgSuccessRate = Math.round((totalPct / allSessions.length) * 100)
  }

  // 6. Chart Data Generation (Last 6 Months)
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  
  const { data: allProfiles } = await supabase.from('profiles').select('created_at')
  const { data: allExamSessions } = await supabase.from('test_sessions').select('completed_at')

  const chartData = []
  const now = new Date()
  let runningUserTotal = 0;

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(now.getMonth() - 5);
  sixMonthsAgo.setDate(1); // start of 6 months ago
  sixMonthsAgo.setHours(0, 0, 0, 0);

  if (allProfiles) {
    runningUserTotal = allProfiles.filter(p => new Date(p.created_at) < sixMonthsAgo).length;
  }

  for (let i = 5; i >= 0; i--) {
    const d = new Date()
    d.setMonth(now.getMonth() - i)
    const month = d.getMonth()
    const year = d.getFullYear()
    
    const usersThisMonth = allProfiles ? allProfiles.filter(p => {
      const pD = new Date(p.created_at)
      return pD.getMonth() === month && pD.getFullYear() === year
    }).length : 0

    runningUserTotal += usersThisMonth;

    const examsThisMonth = allExamSessions ? allExamSessions.filter(e => {
      if (!e.completed_at) return false;
      const eD = new Date(e.completed_at)
      return eD.getMonth() === month && eD.getFullYear() === year
    }).length : 0

    chartData.push({
      name: monthNames[month],
      users: runningUserTotal,
      exams: examsThisMonth
    })
  }

  return {
    userCount: userCount || 0,
    examCount: examCount || 0,
    recentUsers: recentUsers || 0,
    avgSuccessRate,
    recentActivities: recentActivities || [],
    chartData
  }
}

export async function getAdminUsers(filters?: { search?: string, page?: number, pageSize?: number }) {
  const supabase = await createClient()
  const page = filters?.page || 1
  const pageSize = filters?.pageSize || 10
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1
  
  let query = supabase
    .from('profiles')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to)

  if (filters?.search) {
    query = query.or(`full_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`)
  }

  const { data, error, count } = await query
  if (error) throw error
  return {
    users: data || [],
    totalCount: count || 0
  }
}

export async function getAdminUserDetail(userId: string) {
  const supabase = await createClient()

  // 1. Profile data
  const { data: profile, error: pError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (pError) throw pError

  // 2. Exam History
  const { data: exams, error: eError } = await supabase
    .from('test_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('completed_at', { ascending: false })

  if (eError) throw eError

  // 3. Domains/Skills
  const { data: domain } = await supabase
    .from('user_domains')
    .select('*')
    .eq('user_id', userId)
    .single()

  // 4. Gamification data
  const { data: gamification } = await supabase
    .from('user_gamification')
    .select('*')
    .eq('user_id', userId)
    .single()

  return {
    profile,
    exams: exams || [],
    domain,
    gamification
  }
}

export async function getAdminQuestions(filters?: { domain?: string, skill?: string, search?: string, page?: number, pageSize?: number }) {
  const supabase = await createClient()
  const page = filters?.page || 1
  const pageSize = filters?.pageSize || 10
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let query = supabase
    .from('questions')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to)

  if (filters?.domain) query = query.eq('domain', filters.domain)
  if (filters?.skill) query = query.eq('skill', filters.skill)
  if (filters?.search) {
    query = query.ilike('question', `%${filters.search}%`)
  }

  const { data, error, count } = await query
  if (error) throw error
  return {
    questions: data || [],
    totalCount: count || 0
  }
}

export async function deleteQuestion(id: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('questions')
    .delete()
    .eq('id', id)
  
  if (error) throw error
  return { success: true }
}

export async function bulkUploadQuestions(questions: any[]) {
  const supabase = await createClient()
  
  // Basic validation and formatting
  const formatted = questions.map(q => ({
    domain: q.domain,
    skill: q.skill,
    question: q.question,
    options: q.options,
    correct: q.correct,
    explanation: q.explanation || '',
    difficulty: q.difficulty || 'medium'
  }))

  const { data, error } = await supabase
    .from('questions')
    .insert(formatted)
    .select('id')

  if (error) throw error
  return { count: data?.length || 0 }
}

export async function getAdminFilterOptions() {
  const supabase = await createClient()
  
  const { data: domains } = await supabase
    .from('questions')
    .select('domain')
  
  const { data: skills } = await supabase
    .from('questions')
    .select('skill')

  const uniqueDomains = Array.from(new Set(domains?.map(d => d.domain))).sort()
  const uniqueSkills = Array.from(new Set(skills?.map(s => s.skill))).sort()

  return {
    domains: uniqueDomains,
    skills: uniqueSkills
  }
}

export async function getAdminEnrollments(filters?: { search?: string, status?: string, page?: number, pageSize?: number }) {
  const supabase = await createClient()
  const page = filters?.page || 1
  const pageSize = filters?.pageSize || 10
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let query = supabase
    .from('enrollments')
    .select(`
      *,
      profiles:user_id ( full_name, email )
    `, { count: 'exact' })
    .order('purchased_at', { ascending: false })
    .range(from, to)

  if (filters?.status && filters.status !== 'all') {
    query = query.eq('payment_status', filters.status)
  }

  if (filters?.search) {
    query = query.or(`course_title.ilike.%${filters.search}%,mobile_no.ilike.%${filters.search}%`)
  }

  const { data, error, count } = await query
  
  if (error) {
    console.error("Error fetching enrollments:", error)
    throw error
  }
  
  return {
    enrollments: data || [],
    totalCount: count || 0
  }
}
