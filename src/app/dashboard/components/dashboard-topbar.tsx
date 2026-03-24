'use client';

import Link from 'next/link'
import Image from 'next/image'
import { signOutUser } from '../actions'
import TopAvatar from './top-avatar'
import { useUser } from './user-context'

export default function DashboardTopbar() {
  const { user, profile, userDomain } = useUser()
  
  if (!user) return null
  
  const domain = userDomain?.domain

  const displayName = profile?.full_name || user.email
  const initials = displayName
    .split(' ')
    .map((w: string) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shrink-0">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/dashboard" className="flex items-center shrink-0">
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

            {profile?.role === 'admin' && (
              <span className="inline-flex items-center gap-1.5 text-xs font-black text-red-600 bg-red-50 border border-red-100 rounded-full px-3 py-1 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block" />
                ADMIN
              </span>
            )}

            <div className="w-px h-6 bg-gray-200" />

            {/* Avatar + name */}
            <div className="flex items-center gap-2.5">
              <TopAvatar initials={initials} />
              <span className="hidden sm:block text-sm font-semibold text-gray-800 max-w-[140px] truncate">
                {displayName}
              </span>
            </div>

            {/* Sign Out */}
            <form action={signOutUser}>
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
