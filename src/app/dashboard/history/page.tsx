import { Suspense } from 'react'
import { getTestHistory } from '../exam-actions'
import HistoryList from './history-list'

function LoadingFallback() {
  return (
    <div className="flex h-full items-center justify-center p-8">
      <div className="text-muted-foreground animate-pulse">Loading test history...</div>
    </div>
  )
}

async function HistoryContent() {
  const history = await getTestHistory()
  return <HistoryList sessions={history} />
}

export default function HistoryPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <HistoryContent />
    </Suspense>
  )
}
