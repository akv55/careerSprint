import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { getUserDomain } from '../actions'
import DashboardLayoutWrapper from '../components/dashboard-layout-wrapper'
import ProfileClient from './profile-client'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()
    
  const userDomain = await getUserDomain()

  return (
    <DashboardLayoutWrapper 
      profileFullName={profile?.full_name} 
      email={user.email!} 
      domain={userDomain?.domain}
    >
      <ProfileClient 
        user={{ email: user.email!, fullName: profile?.full_name || '' }}
        userDomain={userDomain}
      />
    </DashboardLayoutWrapper>
  )
}
