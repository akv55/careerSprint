import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

interface TopbarProps {
  fullName: string | null
  email: string
  domain: string | null
}

export default function DashboardTopbar({ fullName, email, domain }: TopbarProps) {
  const displayName = fullName || email
  const initials = displayName
    .split(' ')
    .map((w: string) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 flex-shrink-0">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/dashboard" className="flex items-center flex-shrink-0">
            <Image src="/logo.png" alt="CareerSprint" width={180} height={36} priority />
          </Link>

          {/* Right area */}
          <div className="flex items-center gap-3">

            {/* Active domain badge */}
            {domain && (
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                {domain}
              </span>
            )}

            <div className="w-px h-6 bg-gray-200" />

            {/* Avatar + name */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-primary">{initials}</span>
              </div>
              <span className="hidden sm:block text-sm font-semibold text-gray-800 max-w-[140px] truncate">
                {displayName}
              </span>
            </div>

            {/* Sign Out */}
            <form action={async () => {
              'use server'
              const supabase = await createClient()
              await supabase.auth.signOut()
              redirect('/auth/login')
            }}>
              <button
                type="submit"
                className="text-xs font-semibold text-gray-500 hover:text-gray-900 border border-gray-200 rounded-lg py-1.5 px-3 hover:bg-gray-50 transition-colors"
              >
                Sign Out
              </button>
            </form>

          </div>
        </div>
      </div>
    </header>
  )
}
