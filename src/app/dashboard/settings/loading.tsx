import React from 'react'

export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-pulse">
      <div className="space-y-2">
        <div className="h-8 w-48 bg-slate-200 rounded-lg" />
        <div className="h-4 w-96 bg-slate-100 rounded-lg" />
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden p-8 space-y-8">
        <div className="h-7 w-48 bg-slate-200 rounded" />
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-4 border border-slate-50 bg-slate-50/50 rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white border border-slate-100" />
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-slate-100 rounded" />
                  <div className="h-3 w-48 bg-slate-50 rounded" />
                </div>
              </div>
              <div className="h-6 w-20 bg-slate-100 rounded" />
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-slate-100 space-y-4">
           <div className="h-6 w-32 bg-red-50 rounded" />
           <div className="p-4 bg-red-50/30 border border-red-50 rounded-2xl space-y-2">
              <div className="h-4 w-full bg-red-50/50 rounded" />
              <div className="h-10 w-32 bg-red-100/50 rounded-xl" />
           </div>
        </div>
      </div>
    </div>
  )
}
