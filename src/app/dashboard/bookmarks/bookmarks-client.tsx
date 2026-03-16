'use client'

import { useState } from 'react'
import { Bookmark, BookmarkCheck, ChevronDown, ChevronUp, Clock, Trash2, CheckCircle2, MessageSquare, BookOpen } from 'lucide-react'
import { toggleBookmark, updateBookmarkNote } from '../bookmark-actions'

interface BookmarkedQuestion {
  id: string
  note: string 
  created_at: string
  question: {
    id: string
    domain: string
    skill: string
    difficulty: string
    question: string
    options: { a: string; b: string; c: string; d: string }
    correct: string
    explanation: string | null
  }
}

export default function BookmarksClient({ initialBookmarks }: { initialBookmarks: any[] }) {
  const [bookmarks, setBookmarks] = useState<BookmarkedQuestion[]>(initialBookmarks)
  const [expanded, setExpanded] = useState<string | null>(null)

  const handleRemove = async (qId: string) => {
    const res = await toggleBookmark(qId)
    if (!res.error) {
      setBookmarks(prev => prev.filter(b => b.question.id !== qId))
    }
  }

  const handleUpdateNote = async (qId: string, note: string) => {
    const res = await updateBookmarkNote(qId, note)
    if (!res.error) {
      setBookmarks(prev => prev.map(b => b.question.id === qId ? { ...b, note } : b))
    }
  }

  if (bookmarks.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-6 py-16 text-center">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center mx-auto mb-4 text-amber-600">
          <Bookmark className="w-6 h-6" />
        </div>
        <p className="text-base font-bold text-gray-500">No bookmarked questions yet</p>
        <p className="text-sm text-gray-400 mt-1 mb-6">Found a tough question in an exam? Save it to your library for later review.</p>
        <a href="/dashboard/exam" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl text-sm font-bold hover:opacity-90 transition-all">
          <BookOpen className="w-4 h-4" /> Start Practicing
        </a>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">Saved Questions Library</h1>
        <p className="text-sm text-gray-500 mt-1">Review questions you've bookmarked for focused study.</p>
      </div>

      <div className="space-y-4">
        {bookmarks.map((b) => {
          const q = b.question
          const isOpen = expanded === q.id
          
          return (
            <div key={q.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:border-amber-200 transition-all">
              <div 
                onClick={() => setExpanded(isOpen ? null : q.id)}
                className="p-5 cursor-pointer flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0 text-amber-600">
                  <BookmarkCheck className="w-5 h-5" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-gray-100 px-2 py-0.5 rounded">{q.skill}</span>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded">{q.domain}</span>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 line-clamp-2">{q.question}</h3>
                  {b.note && !isOpen && (
                    <p className="text-xs text-amber-600 mt-2 flex items-center gap-1.5 italic">
                      <MessageSquare className="w-3 h-3" /> {b.note}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                   {isOpen ? <ChevronUp className="w-5 h-5 text-gray-300" /> : <ChevronDown className="w-5 h-5 text-gray-300" />}
                </div>
              </div>

              {isOpen && (
                <div className="px-5 pb-5 pt-0 border-t border-gray-50 bg-white">

                  {q.explanation && (
                    <div className="p-4 rounded-xl border-2 border-gray-300">
                      <p className="text-md text-gray-900">{q.explanation}</p>
                    </div>
                  )}

                  <div className="mt-6 p-6 bg-amber-50 rounded-2xl border border-amber-100 shadow-inner">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-amber-600" />
                        <p className="text-xs font-bold text-amber-600 uppercase tracking-wider">My Study Notes</p>
                      </div>
                      <button 
                         onClick={() => handleRemove(q.id)}
                         className="flex items-center gap-1.5 text-[10px] font-bold text-red-400 hover:text-red-600 transition-colors uppercase"
                      >
                        <Trash2 className="w-3 h-3" /> Remove Bookmark
                      </button>
                    </div>
                    <textarea 
                      defaultValue={b.note}
                      onBlur={(e) => handleUpdateNote(q.id, e.target.value)}
                      placeholder="Add a private note to help you remember this concept..."
                      className="w-full bg-white border border-amber-200 rounded-xl p-4 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all min-h-[100px] shadow-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
