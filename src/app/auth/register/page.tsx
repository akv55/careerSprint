import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import RegisterForm from './register-form'

export default async function RegisterPage() {
  const supabase = await createClient()

  // If user is already logged in, redirect to dashboard
  const { data: { session } } = await supabase.auth.getSession()
  
  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#fafbfc] selection:bg-yellow-300">
      {/* Global Background Dots */}
      <div className="absolute bg-fixed inset-0 bg-[radial-gradient(#d1d5db_2px,transparent_2px)] [background-size:24px_24px] opacity-60 pointer-events-none z-0"></div>

      <div className="relative z-10 w-full max-w-md space-y-8 bg-white p-8 rounded-2xl border-4 border-gray-900 shadow-[8px_8px_0px_0px_rgba(17,24,39,1)]">
        <div className="text-center">
          <h2 className="mt-6 text-4xl font-black text-gray-900 tracking-tight">
            Create an Account
          </h2>
          <p className="mt-2 text-sm font-bold text-gray-600">
            Join CareerSprint and prepare for your next interview
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}
