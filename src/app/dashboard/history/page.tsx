import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { getTestHistory } from '../exam-actions'
import { getUserDomain } from '../actions'
import HistoryList from './history-list'
import DashboardLayoutWrapper from '../components/dashboard-layout-wrapper'

export default async function HistoryPage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.id)
    .single()
    
  const userDomain = await getUserDomain()
  const history = await getTestHistory()

  return (
    <DashboardLayoutWrapper 
      profileFullName={profile?.full_name} 
      email={user.email!} 
      domain={userDomain?.domain}
    >
      <HistoryList sessions={history} />
    </DashboardLayoutWrapper>
  )
}
