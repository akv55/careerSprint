import DashboardTopbar from './dashboard-topbar'
import DashboardSidebar from './dashboard-sidebar'

interface Props {
  children: React.ReactNode
  profileFullName?: string | null
  email: string
  domain?: string | null
  showSidebar?: boolean
}

export default function DashboardLayoutWrapper({ children, profileFullName, email, domain, showSidebar = true }: Props) {
  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <DashboardTopbar fullName={profileFullName ?? null} email={email} domain={domain ?? null} />
      <div className="flex-1 flex overflow-hidden">
        {showSidebar && domain && <DashboardSidebar />}
        <main className="flex-1 overflow-y-auto min-w-0">
          <div className="py-8 px-6 max-w-5xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
