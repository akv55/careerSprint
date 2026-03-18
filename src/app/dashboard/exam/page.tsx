import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { getUserDomain } from '../actions'
import ExamClient from './exam-client'

export default async function ExamPage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, role')
    .eq('id', user.id)
    .single()

  const userDomain = await getUserDomain()
  if (!userDomain) redirect('/dashboard')

  return (
    <ExamClient
      domain={userDomain.domain}
      secondaryDomain={userDomain.secondary_domain}
      skills={userDomain.skills}
      profileFullName={profile?.full_name}
      email={user.email!}
      role={profile?.role}
    />
  )
}
