import { Suspense } from 'react'
import ProfileClient from './profile-client'

function LoadingFallback() {
  return (
    <div className="flex h-full items-center justify-center p-8">
      <div className="text-muted-foreground animate-pulse">Loading profile data...</div>
    </div>
  )
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ProfileClient />
    </Suspense>
  )
}
