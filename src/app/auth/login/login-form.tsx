'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from './actions'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { loginWithGoogle } from '../oauth-actions'

export default function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    
    // Server action login
    const result = await login(formData)
    
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

      <div>
        <button
          type="button"
          onClick={() => loginWithGoogle()}
          className="w-full flex justify-center items-center gap-3 rounded-xl border-2 border-gray-900 bg-white px-4 py-2.5 text-sm font-bold text-gray-900 shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] hover:shadow-[2px_2px_0px_0px_rgba(17,24,39,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
        >
          <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
            <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
            <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
            <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
            <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.26538 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853" />
          </svg>
          Sign in with Google
        </button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t-2 border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm font-bold leading-6">
          <span className="bg-white px-6 text-gray-500">Or continue with</span>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-700">Email address</label>
          <input
             id="email"
             name="email"
             type="email"
             required
             className="mt-1 block w-full appearance-none rounded-xl border-2 border-gray-900 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-[#0F6FFF] focus:outline-none focus:ring-0 sm:text-sm font-medium shadow-[2px_2px_0px_0px_rgba(17,24,39,0.1)] transition-all"
             placeholder="you@company.com"
          />
        </div>
        
        <div className="relative">
          <label className="block text-sm font-bold text-gray-700">Password</label>
          <div className="relative mt-1">
            <input
               id="password"
               name="password"
               type={showPassword ? "text" : "password"}
               required
               className="block w-full appearance-none rounded-xl border-2 border-gray-900 px-3 py-2 pr-10 text-gray-900 placeholder-gray-400 focus:border-[#0F6FFF] focus:outline-none focus:ring-0 sm:text-sm font-medium shadow-[2px_2px_0px_0px_rgba(17,24,39,0.1)] transition-all"
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

      <div className="flex items-center justify-between mt-2">
         <div className="text-sm">
           <Link href="/auth/reset" className="font-bold text-[#0F6FFF] hover:text-gray-900 transition-colors">
             Forgot your password?
           </Link>
         </div>
         <div className="text-sm">
           <Link href="/auth/register" className="font-bold text-gray-600 hover:text-gray-900 transition-colors">
             Create account
           </Link>
         </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="group relative flex w-full justify-center items-center rounded-xl border-2 border-gray-900 bg-[#0F6FFF] px-4 py-3 text-sm font-black text-white shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] transition-all hover:bg-blue-600 hover:shadow-[2px_2px_0px_0px_rgba(17,24,39,1)] hover:translate-x-[2px] hover:translate-y-[2px] disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          'Sign in with Email'
        )}
      </button>
    </form>
  )
}
