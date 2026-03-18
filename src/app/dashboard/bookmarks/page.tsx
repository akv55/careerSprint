import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { getBookmarkedQuestions } from '../bookmark-actions'
import { getUserDomain } from '../actions'
import DashboardLayoutWrapper from '../components/dashboard-layout-wrapper'
import BookmarksClient from './bookmarks-client'

export default async function BookmarksPage() {
  // const supabase = await createClient()
  // const { data: { user }, error } = await supabase.auth.getUser()
  // if (error || !user) redirect('/auth/login')

  // const { data: profile } = await supabase
  //   .from('profiles')
  //   .select('full_name, role')
  //   .eq('id', user.id)
  //   .single()
    
  // const userDomain = await getUserDomain()
  const bookmarks = await getBookmarkedQuestions()

  return (
    <>
      <BookmarksClient initialBookmarks={bookmarks} />
    </>
)}
