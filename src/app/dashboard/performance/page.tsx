import { Suspense } from 'react'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { getAnalyticsData } from '../analytics-actions'
import { getUserDomain } from '../actions'
import DashboardLayoutWrapper from '../components/dashboard-layout-wrapper'
import AnalyticsClient from './performance-client'

function LoadingFallback() {
  return (
    <div className="flex h-full items-center justify-center p-8">
      <div className="text-muted-foreground animate-pulse">Loading performance data...</div>
    </div>
  )
}

async function AnalyticsContent() {
  // const supabase = await createClient()
  // const { data: { user }, error } = await supabase.auth.getUser()
  // if (error || !user) redirect('/auth/login')

  // const { data: profile } = await supabase
  //   .from('profiles')
  //   .select('full_name, role')
  //   .eq('id', user.id)
  //   .single()
    
  // const userDomain = await getUserDomain()
  const data = await getAnalyticsData()

  return <AnalyticsClient data={data!} />
}

export default function AnalyticsPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AnalyticsContent />
    </Suspense>
  )
}
