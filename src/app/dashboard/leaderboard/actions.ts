'use server'

import { createClient } from '@/utils/supabase/server'

export async function getLeaderboard() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('profiles')
    .select(`
      id, 
      full_name, 
      avatar_url, 
      user_gamification (
        experience_points, 
        current_streak, 
        badges
      )
    `)
    .not('user_gamification', 'is', null) // Only users with gamification records
    .order('user_gamification(experience_points)', { ascending: false })
    .limit(20)

  if (error) throw error

  // Flatten the response for the frontend
  const formatted = (data || []).map((p: any) => ({
    id: p.id,
    full_name: p.full_name,
    avatar_url: p.avatar_url,
    experience_points: p.user_gamification?.experience_points || 0,
    current_streak: p.user_gamification?.current_streak || 0,
    badges: p.user_gamification?.badges || []
  }))

  return formatted
}

export async function getMyGamificationStatus() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('user_gamification')
    .select('id:user_id, experience_points, current_streak, badges')
    .eq('user_id', user.id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') { // Not found - should not happen due to trigger but handle gracefully
      return { experience_points: 0, current_streak: 0, badges: [] }
    }
    throw error
  }
  return data
}
