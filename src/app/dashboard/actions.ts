'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function getUserDomain() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data, error } = await supabase
    .from('user_domains')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (error || !data) return null
  return data
}

export async function saveUserDomain(domain: string, skills: string[], secondaryDomain?: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Not authenticated' }

  const upsertData: any = {
    user_id: user.id,
    domain,
    skills,
    updated_at: new Date().toISOString()
  };

  if (secondaryDomain) {
    upsertData.secondary_domain = secondaryDomain;
  } else {
    upsertData.secondary_domain = null;
  }

  const { error } = await supabase
    .from('user_domains')
    .upsert(upsertData, { onConflict: 'user_id' })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  return { success: true }
}

export async function signOutUser() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/auth/login')
}
