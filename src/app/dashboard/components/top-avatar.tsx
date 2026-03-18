'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function TopAvatar({ initials }: { initials: string }) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAvatar() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase.from('profiles').select('avatar_url').eq('id', user.id).single()
        if (data?.avatar_url) {
          setAvatarUrl(data.avatar_url)
        }
      }
    }
    fetchAvatar()
  }, [])

  return (
    <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
      {avatarUrl ? (
        <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
      ) : (
        <span className="text-xs font-bold text-primary">{initials}</span>
      )}
    </div>
  )
}
