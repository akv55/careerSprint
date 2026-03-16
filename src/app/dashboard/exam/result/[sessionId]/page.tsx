import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { getTestSessionById } from '../../../exam-actions'
import { getUserDomain } from '../../../actions'
import { getUserBookmarksForQuestions } from '../../../bookmark-actions'
import ExamResult from './exam-result'
import DashboardLayoutWrapper from '../../../components/dashboard-layout-wrapper'

export default async function ResultPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.id)
    .single()

  const userDomain = await getUserDomain()

  const { sessionId } = await params
  const data = await getTestSessionById(sessionId)
  if (!data) redirect('/dashboard')

  const bookmarkMap = await getUserBookmarksForQuestions(data.session.question_ids)

  return (
    <DashboardLayoutWrapper 
      profileFullName={profile?.full_name} 
      email={user.email!} 
      domain={userDomain?.domain}
    >
      <ExamResult 
        session={data.session} 
        questions={data.questions} 
        initialBookmarks={bookmarkMap}
      />
    </DashboardLayoutWrapper>
  )
}
