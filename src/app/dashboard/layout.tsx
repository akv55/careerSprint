import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { getUserDomain } from './actions'
import DashboardLayoutWrapper from './components/dashboard-layout-wrapper'
import { UserProvider } from './components/user-context'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  
  // Parallelize the user auth fetch and the domain fetch since they are independent
  const [{ data: { user }, error }, userDomain] = await Promise.all([
    supabase.auth.getUser(),
    getUserDomain()
  ])

  if (error || !user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, role')
    .eq('id', user.id)
    .single()

  return (
    <UserProvider 
      user={{ id: user.id, email: user.email! }} 
      profile={{ full_name: profile?.full_name, role: profile?.role }} 
      userDomain={userDomain ?? null}
    >
      <DashboardLayoutWrapper>
        {children}
      </DashboardLayoutWrapper>
    </UserProvider>
  )
}
