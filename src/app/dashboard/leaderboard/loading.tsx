import React from 'react'

export default function Loading() {
  return (
    <div className="space-y-12 animate-pulse">
      {/* Hero Section Skeleton */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900/90 p-8 md:p-10 border border-slate-800">
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div className="space-y-4">
            <div className="h-6 w-32 bg-slate-800 rounded-full mx-auto lg:mx-0" />
            <div className="h-12 w-64 bg-slate-800/50 rounded-lg mx-auto lg:mx-0" />
            <div className="h-4 w-80 bg-slate-800/30 rounded-lg mx-auto lg:mx-0" />
          </div>
          <div className="flex gap-4 p-4 bg-white/5 rounded-3xl border border-white/5 backdrop-blur-sm">
             {[...Array(3)].map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2 px-3">
                  <div className="h-3 w-10 bg-slate-800 rounded" />
                  <div className="h-8 w-16 bg-slate-700 rounded" />
                </div>
             ))}
          </div>
        </div>
      </div>

      {/* Podium Section Skeleton */}
      <div className="max-w-3xl mx-auto px-4">
        <div className="grid grid-cols-3 gap-4 md:gap-8 items-end pt-12">
          {/* Silver */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-slate-100 border-4 border-slate-50" />
            <div className="h-16 md:h-24 w-full bg-slate-50 rounded-t-3xl border-t border-x border-slate-100" />
          </div>
          {/* Gold */}
          <div className="flex flex-col items-center gap-4 scale-110">
            <div className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-slate-200 border-4 border-slate-100" />
            <div className="h-24 md:h-36 w-full bg-slate-100 rounded-t-3xl border-t border-x border-slate-100" />
          </div>
          {/* Bronze */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-slate-100 border-4 border-slate-50" />
            <div className="h-12 md:h-20 w-full bg-slate-50 rounded-t-3xl border-t border-x border-slate-100" />
          </div>
        </div>
      </div>

      {/* Main Ranking List Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 h-12" />
            <div className="divide-y divide-slate-50">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="px-6 py-4 flex items-center gap-4">
                  <div className="h-4 w-4 bg-slate-100 rounded" />
                  <div className="w-10 h-10 rounded-xl bg-slate-50" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-32 bg-slate-100 rounded" />
                    <div className="h-3 w-48 bg-slate-50 rounded" />
                  </div>
                  <div className="h-6 w-12 bg-slate-100 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-slate-900 rounded-[2.5rem] p-8 h-64 border border-slate-800" />
           <div className="bg-white rounded-[2.5rem] p-8 h-40 border border-slate-100" />
        </div>
      </div>
    </div>
  )
}
