'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function AdminAvatar() {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [initials, setInitials] = useState<string>('AD')

  useEffect(() => {
    async function fetchAvatar() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase.from('profiles').select('full_name, email, avatar_url').eq('id', user.id).single()
        if (data) {
          if (data.avatar_url) setAvatarUrl(data.avatar_url)
          const displayName = data.full_name || data.email || 'Admin'
          setInitials(displayName.split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase())
        }
      }
    }
    fetchAvatar()
  }, [])

  return (
    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border border-blue-200 overflow-hidden flex-shrink-0">
      {avatarUrl ? (
        <img src={avatarUrl} alt="Admin" className="w-full h-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  )
}
