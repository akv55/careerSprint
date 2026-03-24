import React from 'react'

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-slate-200 rounded-lg animate-pulse" />
          <div className="h-4 w-64 bg-slate-100 rounded-lg animate-pulse" />
        </div>
        <div className="flex gap-3">
          <div className="h-10 w-72 bg-slate-100 rounded-xl animate-pulse" />
          <div className="h-10 w-10 bg-slate-100 rounded-xl animate-pulse" />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex gap-6">
          <div className="h-4 w-24 bg-slate-100 rounded animate-pulse" />
          <div className="h-4 w-24 bg-slate-100 rounded animate-pulse" />
          <div className="h-4 w-24 bg-slate-100 rounded animate-pulse ml-auto" />
        </div>
        <div className="p-6 space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 bg-slate-100 rounded animate-pulse" />
                <div className="h-3 w-48 bg-slate-50 rounded animate-pulse" />
              </div>
              <div className="w-20 h-6 bg-slate-50 rounded-full animate-pulse" />
              <div className="w-24 h-4 bg-slate-50 rounded animate-pulse ml-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
