import { getAdminStats } from './actions'
import AdminDashboardClient from './dashboard-client'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const stats = await getAdminStats()
  return <AdminDashboardClient stats={stats} />
}
