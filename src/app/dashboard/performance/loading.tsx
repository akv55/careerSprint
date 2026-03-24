import React from 'react'

export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="space-y-2">
        <div className="h-8 w-64 bg-slate-200 rounded-lg" />
        <div className="h-4 w-96 bg-slate-100 rounded-lg" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-100 rounded-2xl" />
              <div className="h-4 w-24 bg-slate-100 rounded" />
            </div>
            <div className="h-8 w-16 bg-slate-200 rounded" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-6">
          <div className="h-6 w-32 bg-slate-200 rounded animate-pulse" />
          <div className="h-[300px] w-full bg-slate-50 rounded-2xl" />
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-6">
          <div className="h-6 w-32 bg-slate-200 rounded animate-pulse" />
          <div className="h-[300px] w-full bg-slate-50 rounded-2xl" />
        </div>
      </div>
    </div>
  )
}
