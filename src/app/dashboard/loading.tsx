
export default function DashboardLoading() {
  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden animate-pulse">
      {/* Topbar Skeleton */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 flex-shrink-0">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Placeholder */}
            <div className="flex items-center flex-shrink-0">
              <div className="w-40 h-8 bg-gray-200 rounded"></div>
            </div>
            
            {/* Right side items */}
            <div className="flex items-center gap-4">
              {/* Skill Pill */}
              <div className="w-32 h-8 bg-gray-100 rounded-full border border-gray-200"></div>
              {/* Admin Pill */}
              <div className="hidden md:block w-20 h-8 bg-red-50 rounded-full border border-red-100"></div>
              {/* Profile section */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                <div className="w-24 h-4 bg-gray-200 rounded hidden md:block"></div>
              </div>
              {/* Sign Out Button */}
              <div className="w-20 h-8 bg-gray-100 rounded-lg ml-2 border border-gray-200"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Skeleton */}
        <aside className="w-64 flex-shrink-0 border-r border-gray-200 bg-white hidden md:flex flex-col overflow-y-auto">
          <div className="p-6 border-b border-gray-50 flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
            <div className="w-28 h-5 bg-gray-200 rounded"></div>
          </div>
          <div className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div key={i} className="w-full h-[44px] flex items-center gap-3 px-3 rounded-xl bg-transparent">
                <div className="w-5 h-5 bg-gray-200 rounded-md"></div>
                <div className={`h-4 bg-gray-200 rounded ${i === 1 ? "w-20" : i % 2 === 0 ? "w-28" : "w-24"}`}></div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content Area Skeleton */}
        <main className="flex-1 overflow-y-auto min-w-0">
          <div className="py-8 px-6 max-w-5xl mx-auto w-full space-y-8 p-4 md:p-0">
            {/* Hero Banner Skeleton */}
            <div className="w-full h-[180px] bg-[#0c1220] rounded-[2rem] p-8 flex flex-col justify-between shadow-xl">
              <div className="space-y-4">
                <div className="w-32 h-3 bg-gray-800 rounded"></div>
                <div className="w-64 h-8 bg-gray-700/50 rounded"></div>
                <div className="w-96 h-4 bg-gray-800 rounded"></div>
              </div>
              <div className="flex justify-end gap-2 mt-auto">
                <div className="w-16 h-6 bg-gray-800/50 rounded-full"></div>
                <div className="w-16 h-6 bg-gray-800/50 rounded-full"></div>
                <div className="w-16 h-6 bg-gray-800/50 rounded-full"></div>
              </div>
            </div>

            {/* Stats Section Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[104px] bg-white border border-gray-100 rounded-2xl flex items-center p-6 gap-6 shadow-sm">
                   <div className="w-12 h-12 bg-gray-100 rounded-xl"></div>
                   <div className="flex flex-col gap-2 flex-1">
                     <div className="w-12 h-6 bg-gray-200 rounded"></div>
                     <div className="w-24 h-4 bg-gray-100 rounded"></div>
                   </div>
                </div>
              ))}
            </div>

            {/* Quick Actions Skeleton */}
            <div>
              <div className="mb-4 w-32 h-4 bg-gray-200 rounded"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 min-h-[220px] flex flex-col shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-50/50 rounded-lg"></div>
                      <div className="w-24 h-6 bg-gray-200 rounded"></div>
                    </div>
                    <div className="space-y-2 mb-6 flex-1 mt-2">
                       <div className="w-full h-4 bg-gray-100 rounded"></div>
                       <div className="w-5/6 h-4 bg-gray-100 rounded"></div>
                       <div className="w-4/6 h-4 bg-gray-100 rounded"></div>
                    </div>
                    <div className={`w-full h-11 rounded-full mt-auto ${i === 1 ? "bg-blue-500/20" : i === 2 ? "bg-orange-500/20" : "bg-gray-800/20"}`}></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity Skeleton */}
            <div>
              <div className="flex justify-between items-center mb-4 mt-8">
                <div className="w-32 h-4 bg-gray-200 rounded"></div>
                <div className="w-16 h-4 bg-gray-100 rounded"></div>
              </div>
              <div className="w-full h-[90px] bg-white border border-gray-100 rounded-2xl p-6 flex items-center justify-between shadow-sm">
                 <div className="flex items-center gap-4">
                   <div className="w-14 h-14 rounded-full bg-green-50/50 border border-green-100/50"></div>
                   <div className="space-y-2">
                     <div className="w-40 h-5 bg-gray-200 rounded"></div>
                     <div className="w-56 h-4 bg-gray-100 rounded"></div>
                   </div>
                 </div>
                 <div className="w-12 h-4 bg-gray-100 rounded hidden md:block"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
