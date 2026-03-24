import React from 'react'

export default function Loading() {
  return (
    <div className="py-8 px-6 max-w-5xl mx-auto w-full space-y-8 p-4 md:p-0 animate-pulse">
      {/* Hero Banner Skeleton */}
      <div className="w-full h-[220px] bg-[#0c1322] rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 pointer-events-none" />
        <div className="space-y-4 relative z-10">
          <div className="w-32 h-6 bg-slate-800 rounded-full"></div>
          <div className="w-64 h-10 bg-slate-800/80 rounded-xl border border-slate-700"></div>
          <div className="w-96 h-5 bg-slate-800/50 rounded-lg"></div>
        </div>
        <div className="flex justify-end gap-3 mt-auto relative z-10">
          <div className="w-24 h-8 bg-slate-800/50 rounded-full border border-slate-700"></div>
          <div className="w-24 h-8 bg-slate-800/50 rounded-full border border-slate-700"></div>
        </div>
      </div>

      {/* Stats Section Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-[120px] bg-white border border-slate-100 rounded-3xl flex items-center p-6 gap-6 shadow-sm">
             <div className="w-14 h-14 bg-slate-50 rounded-2xl shrink-0"></div>
             <div className="flex flex-col gap-2 flex-1">
               <div className="w-16 h-8 bg-slate-100 rounded-lg"></div>
               <div className="w-24 h-4 bg-slate-50 rounded"></div>
             </div>
          </div>
        ))}
      </div>

      {/* Quick Actions Skeleton */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-40 h-6 bg-slate-200 rounded-lg"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-3xl p-6 min-h-[220px] flex flex-col shadow-sm space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl"></div>
                <div className="w-32 h-6 bg-slate-100 rounded-lg"></div>
              </div>
              <div className="space-y-2 flex-1 mt-2">
                 <div className="w-full h-4 bg-slate-100 rounded"></div>
                 <div className="w-5/6 h-4 bg-slate-100 rounded"></div>
                 <div className="w-4/6 h-4 bg-slate-50 rounded"></div>
              </div>
              <div className="w-full h-12 rounded-2xl bg-slate-50 mt-auto border border-slate-100"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity Skeleton */}
      <div>
        <div className="flex justify-between items-center mb-6 mt-12">
          <div className="w-48 h-6 bg-slate-200 rounded-lg"></div>
          <div className="w-20 h-4 bg-slate-100 rounded"></div>
        </div>
        <div className="w-full bg-white border border-slate-100 rounded-3xl p-6 flex flex-col shadow-sm divide-y divide-slate-50 overflow-hidden">
           {[1, 2].map((i) => (
             <div key={i} className="flex items-center justify-between py-6 first:pt-0 last:pb-0">
               <div className="flex items-center gap-4">
                 <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-100"></div>
                 <div className="space-y-2">
                   <div className="w-48 h-5 bg-slate-100 rounded"></div>
                   <div className="w-64 h-4 bg-slate-50 rounded"></div>
                 </div>
               </div>
               <div className="w-20 h-4 bg-slate-50 rounded hidden md:block"></div>
             </div>
           ))}
        </div>
      </div>
    </div>
  )
}
