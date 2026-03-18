import { Suspense } from 'react'
import ExamClient from './exam-client'

function LoadingFallback() {
  return (
    <div className="flex h-full items-center justify-center p-8">
      <div className="text-muted-foreground animate-pulse">Loading exam environment...</div>
    </div>
  )
}

export default function ExamPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ExamClient />
    </Suspense>
  )
}
