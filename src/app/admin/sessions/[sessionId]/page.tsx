import React from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, XCircle, Clock, Calendar } from 'lucide-react'
import { redirect } from 'next/navigation'
import { getAdminTestSessionById } from '../../actions'

export default async function AdminSessionResultPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await params
  const data = await getAdminTestSessionById(sessionId)
  
  if (!data) {
    redirect('/admin')
  }

  const { session, questions } = data
  const orderedQs = session.question_ids.map((id: string) => questions.find((q: any) => q.id === id)).filter(Boolean)
  const pct = Math.round((session.score / session.total) * 100)

  return (
    <div className="space-y-8 pb-12">
      <Link 
        href="/admin" 
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="bg-slate-900 px-8 py-8 text-center">
          <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 text-4xl font-black ${
            pct >= 80 ? 'bg-green-500/20 text-green-400' :
            pct >= 50 ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {pct}%
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Exam Session Result
          </h1>
          <p className="text-slate-400">Score: {session.score} / {session.total}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 p-6">
          <div className="text-center p-4">
            <p className="text-sm text-slate-500 font-medium mb-1">Domain</p>
            <p className="font-bold text-slate-900">{session.domain}</p>
          </div>
          <div className="text-center p-4">
            <p className="text-sm text-slate-500 font-medium mb-1">Mode</p>
            <p className="font-bold text-slate-900 capitalize">{session.mode}</p>
          </div>
          <div className="text-center p-4">
             <p className="text-sm text-slate-500 font-medium mb-1 line-clamp-1 pb-1">Time Taken</p>
             <p className="font-bold text-slate-900 flex items-center justify-center gap-1.5 align-middle">
               <Clock size={16} className="text-slate-400" /> 
               {Math.floor(session.time_taken_secs / 60)}m {session.time_taken_secs % 60}s
             </p>
          </div>
          <div className="text-center p-4">
            <p className="text-sm text-slate-500 font-medium mb-1 line-clamp-1 pb-1">Completed At</p>
            <p className="font-bold text-slate-900 flex items-center justify-center gap-1.5 align-middle">
              <Calendar size={16} className="text-slate-400" /> 
              {new Date(session.completed_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Question Review</h2>
        {orderedQs.map((q: any, i: number) => {
          const userAns = session.answers[q.id]
          const isCorrect = userAns === q.correct

          return (
            <div key={q.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
               <div className="p-5">
                 <div className="flex items-start gap-4">
                   {isCorrect ? (
                     <div className="bg-green-100 p-2 rounded-full mt-1 shrink-0">
                       <CheckCircle2 className="w-5 h-5 text-green-600" />
                     </div>
                   ) : (
                     <div className="bg-red-100 p-2 rounded-full mt-1 shrink-0">
                       <XCircle className="w-5 h-5 text-red-600" />
                     </div>
                   )}
                   <div className="flex-1">
                     <p className="font-medium text-slate-900 leading-relaxed">
                       <span className="text-slate-400 font-bold mr-2">Q{i + 1}</span>
                       {q.question}
                     </p>
                     
                     <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                       {(['a', 'b', 'c', 'd'] as const).map(opt => {
                         const isUser = userAns === opt
                         const isRight = q.correct === opt
                         let optClass = "p-3 rounded-xl border text-sm flex gap-3 transition-colors "
                         if (isRight) optClass += "bg-green-50/50 border-green-200 text-green-800"
                         else if (isUser && !isRight) optClass += "bg-red-50/50 border-red-200 text-red-800"
                         else optClass += "bg-slate-50 border-slate-100 text-slate-600"

                         return (
                           <div key={opt} className={optClass}>
                             <span className={`uppercase font-bold pt-0.5 ${isRight ? 'text-green-600' : isUser ? 'text-red-500' : 'text-slate-400'}`}>
                               {opt}
                             </span>
                             <span className="flex-1">{q.options[opt]}</span>
                             {isRight && <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />}
                             {isUser && !isRight && <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />}
                           </div>
                         )
                       })}
                     </div>
                     
                     {!isCorrect && q.explanation && (
                       <div className="mt-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                         <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Explanation</p>
                         <p className="text-sm text-slate-700 leading-relaxed">{q.explanation}</p>
                       </div>
                     )}
                   </div>
                 </div>
               </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
