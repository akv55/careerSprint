import { Suspense } from 'react'
import { getBookmarkedQuestions } from '../bookmark-actions'
import BookmarksClient from './bookmarks-client'

function LoadingFallback() {

  
  return (
    <div className="flex h-full items-center justify-center p-8">
      <div className="text-muted-foreground animate-pulse">Loading bookmarks...</div>
    </div>
  )
}

async function BookmarksContent() {
  const bookmarks = await getBookmarkedQuestions()
  return <BookmarksClient initialBookmarks={bookmarks} />
}

export default function BookmarksPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <BookmarksContent />
    </Suspense>
  )
}
