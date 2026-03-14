'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function register(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string
  const role = formData.get('role') as string

  if (!email || !password || !fullName || !role) {
    return { error: 'Please fill in all fields' }
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      }
    }
  })

  if (error) {
    return { error: error.message }
  }

  // Next, update the user profile table manually as a fail-safe incase trigger fails or takes too long, 
  // though typically you want to rely on the handle_new_user trigger in supabase.
  if (data.user) {
    // Attempt an upsert so we don't crash if the trigger already ran
    const { error: profileError } = await supabase.from('profiles').upsert({
      id: data.user.id,
      email: data.user.email,
      full_name: fullName,
      role: role
    })
    
    if (profileError) {
      console.error("Failed to insert profile record manually:", profileError)
      // We don't necessarily want to block login here if auth signup worked, but we should log it
    }
  }

  // Redirect happens in the component after successful login
  return null
}
