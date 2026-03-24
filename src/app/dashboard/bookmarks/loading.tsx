import React from 'react'

export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="space-y-2">
        <div className="h-8 w-48 bg-slate-200 rounded-lg" />
        <div className="h-4 w-96 bg-slate-100 rounded-lg" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4 relative overflow-hidden">
            <div className="flex gap-2">
              <div className="h-6 w-20 bg-blue-50 rounded-lg" />
              <div className="h-6 w-24 bg-slate-50 rounded-lg" />
            </div>
            <div className="h-6 w-3/4 bg-slate-100 rounded" />
            <div className="space-y-2 py-4 border-t border-slate-50">
              <div className="h-4 w-full bg-slate-50 rounded" />
              <div className="h-4 w-5/6 bg-slate-50 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
