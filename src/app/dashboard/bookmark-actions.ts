'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function toggleBookmark(questionId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  // Check if already bookmarked
  const { data: existing } = await supabase
    .from('user_bookmarks')
    .select('id')
    .eq('user_id', user.id)
    .eq('question_id', questionId)
    .single()

  if (existing) {
    // Remove it
    const { error } = await supabase
      .from('user_bookmarks')
      .delete()
      .eq('id', existing.id)
    
    if (error) return { error: error.message }
    return { success: true, bookmarked: false }
  } else {
    // Add it
    const { error } = await supabase
      .from('user_bookmarks')
      .insert({ user_id: user.id, question_id: questionId })
    
    if (error) return { error: error.message }
    return { success: true, bookmarked: true }
  }
}

export async function updateBookmarkNote(questionId: string, note: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('user_bookmarks')
    .update({ note })
    .eq('user_id', user.id)
    .eq('question_id', questionId)
  
  if (error) return { error: error.message }
  return { success: true }
}

export async function getBookmarkedQuestions() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('user_bookmarks')
    .select(`
      id,
      note,
      created_at,
      question:questions (
        id,
        domain,
        skill,
        difficulty,
        question,
        options,
        correct,
        explanation
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) return []
  return data || []
}

export async function getUserBookmarksForQuestions(questionIds: string[]) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return {}

  const { data } = await supabase
    .from('user_bookmarks')
    .select('question_id, note')
    .eq('user_id', user.id)
    .in('question_id', questionIds)

  const bookmarkMap: Record<string, { bookmarked: boolean; note: string }> = {}
  data?.forEach(b => {
    bookmarkMap[b.question_id] = { bookmarked: true, note: b.note || '' }
  })
  
  return bookmarkMap
}
