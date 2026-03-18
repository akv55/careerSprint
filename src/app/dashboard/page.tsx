import { Suspense } from 'react'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { getUserDomain } from './actions'
import { getTestHistory } from './exam-actions'
import SetupWizard from './setup-wizard'
import DashboardHome from './components/dashboard-home'

function LoadingFallback() {
  return (
    <div className="flex h-full items-center justify-center p-8">
      <div className="text-muted-foreground animate-pulse">Loading dashboard overview...</div>
    </div>
  )
}

async function DashboardContent() {
  const supabase = await createClient()
  const [{ data: { user }, error }, userDomain] = await Promise.all([
    supabase.auth.getUser(),
    getUserDomain()
  ])

  if (error || !user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, avatar_url, role')
    .eq('id', user.id)
    .single()

  const displayName = profile?.full_name || user.email || 'User'

  // Compute stats for the dashboard
  let stats = { examsTaken: 0, bestScore: null as number | null, avgTimeSecs: null as number | null }
  let recentSessions: any[] = []
  if (userDomain) {
    const history = await getTestHistory()
    stats.examsTaken = history.length
    recentSessions = history.slice(0, 5)
    if (history.length > 0) {
      stats.bestScore = Math.max(...history.map(h => Math.round((h.score / h.total) * 100)))
      const totalTime = history.reduce((sum, h) => sum + (h.time_taken_secs || 0), 0)
      stats.avgTimeSecs = Math.round(totalTime / history.length)
    }
  }

  return (
    <>
      {!userDomain ? (
        <div className="max-w-2xl mx-auto">
          <SetupWizard />
        </div>
      ) : (
        <div className="animate-in fade-in duration-500">
          <DashboardHome
            stats={stats}
            recentSessions={recentSessions}
          />
        </div>
      )}
    </>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <DashboardContent />
    </Suspense>
  )
}

