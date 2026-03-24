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
          <div className="h-10 w-32 bg-slate-100 rounded-xl animate-pulse" />
          <div className="h-10 w-36 bg-blue-100 rounded-xl animate-pulse" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="h-10 flex-1 bg-slate-100 rounded-xl animate-pulse" />
        <div className="h-10 w-48 bg-slate-100 rounded-xl animate-pulse" />
        <div className="h-10 w-10 bg-slate-100 rounded-xl animate-pulse" />
      </div>

      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex gap-2">
              <div className="h-6 w-20 bg-blue-50 rounded-lg animate-pulse" />
              <div className="h-6 w-24 bg-slate-50 rounded-lg animate-pulse" />
              <div className="h-6 w-16 bg-orange-50 rounded-lg animate-pulse" />
            </div>
            <div className="h-6 w-3/4 bg-slate-100 rounded animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="h-10 bg-slate-50 rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
