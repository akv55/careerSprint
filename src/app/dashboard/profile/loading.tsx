import React from 'react'

export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-pulse">
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-8">
        <div className="w-24 h-24 rounded-full bg-slate-100 shrink-0" />
        <div className="flex-1 space-y-3 w-full text-center md:text-left">
          <div className="h-8 w-64 bg-slate-200 rounded-lg mx-auto md:mx-0" />
          <div className="h-4 w-48 bg-slate-100 rounded-lg mx-auto md:mx-0" />
          <div className="h-4 w-full bg-slate-50 rounded-lg" />
        </div>
        <div className="flex gap-2">
           <div className="h-10 w-24 bg-slate-100 rounded-xl" />
           <div className="h-10 w-10 bg-slate-100 rounded-xl" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <div className="h-6 w-32 bg-slate-200 rounded" />
            <div className="space-y-4">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="h-12 bg-slate-50 rounded-2xl" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
