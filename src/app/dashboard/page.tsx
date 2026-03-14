import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { getUserDomain } from './actions'
import SetupWizard from './setup-wizard'
import DashboardTopbar from './components/dashboard-topbar'
import DashboardSidebar from './components/dashboard-sidebar'
import DomainOverview from './components/domain-overview'
import ActionCards from './components/action-cards'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, avatar_url')
    .eq('id', user.id)
    .single()

  const userDomain = await getUserDomain()

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">

      <DashboardTopbar
        fullName={profile?.full_name ?? null}
        email={user.email!}
        domain={userDomain?.domain ?? null}
      />

      {/* Body: sidebar + main content, fills remaining height */}
      <div className="flex-1 flex overflow-hidden">

        {userDomain && <DashboardSidebar />}

        <main className="flex-1 overflow-y-auto min-w-0">
          <div className="py-10 px-6 mx-auto">

            <h1 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">
              Welcome back, {profile?.full_name || user.email}!
            </h1>

            {!userDomain ? (
              <div className="max-w-2xl mx-auto">
                <SetupWizard />
              </div>
            ) : (
              <div className="animate-in fade-in duration-500">
                <DomainOverview
                  domain={userDomain.domain}
                  secondaryDomain={userDomain.secondary_domain}
                  skills={userDomain.skills}
                />
                <ActionCards />
              </div>
            )}

          </div>
        </main>

      </div>
    </div>
  )
}
