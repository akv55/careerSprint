'use client'

import { useState } from 'react'
import { register } from './actions'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function RegisterForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    
    // Server action register
    const result = await register(formData)
    
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    } else {
       router.push('/dashboard')
       router.refresh()
    }
  }

  return (
    <form action={handleSubmit} className="mt-8 space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm text-center border border-red-200">
          {error}
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
             id="fullName"
             name="fullName"
             type="text"
             required
             className="mt-1 block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-[#0F6FFF] focus:outline-none focus:ring-[#0F6FFF] sm:text-sm"
             placeholder="John Doe"
          />
        </div>

        <div>
           <label className="block text-sm font-medium text-gray-700">Role</label>
           <select 
             name="role"
             className="mt-1 block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-[#0F6FFF] focus:outline-none focus:ring-[#0F6FFF] sm:text-sm bg-white"
             defaultValue="student"
             >
               <option value="student">Student / Candidate</option>
               <option value="company">Company</option>
           </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email address</label>
          <input
             id="email"
             name="email"
             type="email"
             required
             className="mt-1 block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-[#0F6FFF] focus:outline-none focus:ring-[#0F6FFF] sm:text-sm"
             placeholder="you@company.com"
          />
        </div>
        
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <div className="relative mt-1">
            <input
               id="password"
               name="password"
               type={showPassword ? "text" : "password"}
               required
               minLength={6}
               className="block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 pr-10 text-gray-900 placeholder-gray-400 focus:border-[#0F6FFF] focus:outline-none focus:ring-[#0F6FFF] sm:text-sm"
               placeholder="••••••••"
            />
            <button
               type="button"
               className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
               onClick={() => setShowPassword(!showPassword)}
            >
               {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
         <div className="text-sm text-gray-600">
           Already have an account?
         </div>
         <div className="text-sm">
           <Link href="/auth/login" className="font-medium text-[#0F6FFF] hover:text-[#0b4fd9]">
             Sign in
           </Link>
         </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="group relative flex w-full justify-center rounded-lg border border-transparent bg-gradient-to-r from-[#0F6FFF] to-[#FF8A21] px-4 py-2 text-sm font-medium text-white shadow-md transition-all hover:bg-gradient-to-l hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#0F6FFF] focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          'Register'
        )}
      </button>
    </form>
  )
}
