import DashboardTopbar from './dashboard-topbar'
import DashboardSidebar from './dashboard-sidebar'

interface Props {
  children: React.ReactNode
  showSidebar?: boolean
}

export default function DashboardLayoutWrapper({ 
  children, 
  showSidebar = true
}: Props) {
  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <DashboardTopbar />
      <div className="flex-1 flex overflow-hidden">
        {showSidebar && <DashboardSidebar />}
        <main className="flex-1 overflow-y-auto min-w-0">
          <div className="py-8 px-6 max-w-5xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
