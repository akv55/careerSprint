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
    <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 tracking-tight">
            Create an Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join CareerSprint and prepare for your next interview
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}
