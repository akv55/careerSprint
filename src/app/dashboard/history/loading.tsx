import React from 'react'

export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="space-y-2">
        <div className="h-8 w-48 bg-slate-200 rounded-lg" />
        <div className="h-4 w-96 bg-slate-100 rounded-lg" />
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex gap-10">
          <div className="h-4 w-24 bg-slate-100 rounded" />
          <div className="h-4 w-24 bg-slate-100 rounded" />
          <div className="h-4 w-24 bg-slate-100 rounded ml-auto" />
        </div>
        <div className="p-6 space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-6 py-4 border-b border-slate-50 last:border-0">
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-40 bg-slate-200 rounded" />
                <div className="h-4 w-64 bg-slate-100 rounded" />
              </div>
              <div className="text-right space-y-2">
                <div className="h-5 w-20 bg-blue-100 rounded-full" />
                <div className="h-3 w-16 bg-slate-50 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
