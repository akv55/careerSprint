import { getAnalyticsData } from '../analytics-actions'
import AnalyticsClient from './performance-client'

export default async function AnalyticsPage() {
  const data = await getAnalyticsData()
  return <AnalyticsClient data={data!} />
}
