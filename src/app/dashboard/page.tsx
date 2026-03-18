import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { getUserDomain } from './actions'
import { getTestHistory } from './exam-actions'
import SetupWizard from './setup-wizard'
import DashboardLayoutWrapper from './components/dashboard-layout-wrapper'
import DashboardHome from './components/dashboard-home'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, avatar_url, role')
    .eq('id', user.id)
    .single()

  const userDomain = await getUserDomain()
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
    <DashboardLayoutWrapper 
      profileFullName={profile?.full_name} 
      email={user.email!} 
      domain={userDomain?.domain}
      role={profile?.role}
    >
      {!userDomain ? (
        <div className="max-w-2xl mx-auto">
          <SetupWizard />
        </div>
      ) : (
        <div className="animate-in fade-in duration-500">
          <DashboardHome
            domain={userDomain.domain}
            secondaryDomain={userDomain.secondary_domain}
            skills={userDomain.skills}
            userName={displayName}
            stats={stats}
            recentSessions={recentSessions}
          />
        </div>
      )}
    </DashboardLayoutWrapper>
  )
}

