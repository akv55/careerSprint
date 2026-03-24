import { getBookmarkedQuestions } from '../bookmark-actions'
import BookmarksClient from './bookmarks-client'

export default async function BookmarksPage() {
  const bookmarks = await getBookmarkedQuestions()
  return <BookmarksClient initialBookmarks={bookmarks} />
}
