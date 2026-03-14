import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import CvUploadForm from './cv-upload-form'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/auth/login')
  }

  // Fetch the user's profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, role, avatar_url')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold bg-gradient-to-r from-[#0F6FFF] to-[#FF8A21] bg-clip-text text-transparent">
                  CareerSprint
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">
                {profile?.full_name || user.email}
              </span>
              <form action={async () => {
                'use server'
                const supabase = await createClient()
                await supabase.auth.signOut()
                redirect('/auth/login')
              }}>
                <button
                  type="submit"
                  className="text-sm text-gray-500 hover:text-gray-900 border border-transparent rounded-md py-2 px-4 transition-colors hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
              Welcome back, {profile?.full_name || user.email}!
            </h1>
            <p className="text-lg text-gray-500 mb-8">
              We're glad to see you again. Your role is: <span className="font-semibold text-gray-700 capitalize">{profile?.role || 'Student'}</span>
            </p>

            <CvUploadForm />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-6">
                 <h3 className="font-semibold text-blue-900 text-lg mb-2">Your Profile</h3>
                 <p className="text-blue-700 text-sm mb-4">Keep your information up to date to get the best recommendations.</p>
                 <button className="text-sm font-medium text-blue-600 hover:text-blue-800">Edit Profile &rarr;</button>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100 rounded-xl p-6">
                 <h3 className="font-semibold text-orange-900 text-lg mb-2">Practice Exams</h3>
                 <p className="text-orange-700 text-sm mb-4">Ready for your next challenge? Start a new practice test.</p>
                 <button className="text-sm font-medium text-orange-600 hover:text-orange-800">Start Exam &rarr;</button>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl p-6">
                 <h3 className="font-semibold text-emerald-900 text-lg mb-2">CV Analysis</h3>
                 <p className="text-emerald-700 text-sm mb-4">Upload your latest CV to get updated AI-driven insights.</p>
                 <button className="text-sm font-medium text-emerald-600 hover:text-emerald-800">Upload CV &rarr;</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
