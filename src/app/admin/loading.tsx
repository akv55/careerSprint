import React from 'react'

export default function Loading() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="h-8 w-48 bg-slate-200 rounded-lg animate-pulse" />
        <div className="h-4 w-80 bg-slate-100 rounded-lg animate-pulse" />
      </div>

      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-slate-50 rounded-xl animate-pulse" />
              <div className="h-6 w-20 bg-slate-50 rounded-full animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-24 bg-slate-100 rounded animate-pulse" />
              <div className="h-8 w-32 bg-slate-200 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
            <div className="h-6 w-32 bg-slate-200 rounded animate-pulse" />
            <div className="h-[300px] w-full bg-slate-50 rounded-xl animate-pulse flex items-end justify-between p-4">
               {[...Array(12)].map((_, j) => (
                 <div 
                  key={j} 
                  className="w-4 bg-slate-100 rounded-t animate-pulse shrink-0" 
                  style={{ height: `${Math.random() * 60 + 20}%` }}
                 />
               ))}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Skeleton */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-6 w-48 bg-slate-200 rounded animate-pulse" />
          <div className="h-4 w-20 bg-slate-100 rounded animate-pulse" />
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 divide-y divide-slate-50 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 animate-pulse flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-40 bg-slate-100 rounded animate-pulse" />
                <div className="h-3 w-64 bg-slate-50 rounded animate-pulse" />
              </div>
              <div className="text-right space-y-1">
                <div className="h-3 w-16 bg-slate-50 rounded animate-pulse ml-auto" />
                <div className="h-3 w-12 bg-slate-50 rounded animate-pulse ml-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
