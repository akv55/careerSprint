import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { getUserDomain } from './actions'
import DashboardLayoutWrapper from './components/dashboard-layout-wrapper'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, role')
    .eq('id', user.id)
    .single()

  const userDomain = await getUserDomain()

  return (
    <DashboardLayoutWrapper 
      profileFullName={profile?.full_name} 
      email={user.email!} 
      domain={userDomain?.domain}
      role={profile?.role}
    >
      {children}
    </DashboardLayoutWrapper>
  )
}
