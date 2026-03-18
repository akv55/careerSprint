import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { getAnalyticsData } from '../analytics-actions'
import { getUserDomain } from '../actions'
import DashboardLayoutWrapper from '../components/dashboard-layout-wrapper'
import AnalyticsClient from './performance-client'

export default async function AnalyticsPage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, role')
    .eq('id', user.id)
    .single()
    
  const userDomain = await getUserDomain()
  const data = await getAnalyticsData()

  return (
    <DashboardLayoutWrapper 
      profileFullName={profile?.full_name} 
      email={user.email!} 
      domain={userDomain?.domain}
      role={profile?.role}
    >
      <AnalyticsClient data={data!} />
    </DashboardLayoutWrapper>
  )
}
