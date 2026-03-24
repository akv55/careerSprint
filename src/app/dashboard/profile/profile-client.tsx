'use client'

import { useState } from 'react'
import { User, Mail, Briefcase, Award, Edit3, CheckCircle2 } from 'lucide-react'
import SetupWizard from '../setup-wizard'
import { useUser } from '../components/user-context'

export default function ProfileClient() {
  const { user, profile, userDomain } = useUser()
  const [isEditingSkills, setIsEditingSkills] = useState(false)

  if (!user) return null

  const userEmail = user.email
  const fullName = profile?.full_name || ''

  if (isEditingSkills) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Edit Engineering Profile</h2>
          <button 
            onClick={() => setIsEditingSkills(false)}
            className="text-sm font-semibold text-gray-500 hover:text-gray-900"
          >
            Cancel
          </button>
        </div>
        <SetupWizard />
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">Your Profile</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your account details and engineering skills.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold text-primary">
                {fullName ? fullName[0].toUpperCase() : userEmail[0].toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{fullName || 'No Name Provided'}</h2>
              <p className="text-gray-500 flex items-center gap-2 mt-1">
                <Mail className="w-4 h-4" /> {userEmail}
              </p>
            </div>
          </div>
        </div>
      </div>

      {!userDomain ? (
        <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6 flex items-start gap-4">
          <Award className="w-6 h-6 text-amber-600 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-amber-900">Profile Incomplete</h3>
            <p className="text-amber-700 text-sm mt-1 mb-4">You haven't set up your engineering domains and skills yet.</p>
            <button 
              onClick={() => setIsEditingSkills(true)}
              className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
            >
              Setup Profile
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden relative">
          <div className="absolute top-6 right-6">
            <button 
              onClick={() => setIsEditingSkills(true)}
              className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 text-sm font-semibold bg-gray-50 hover:bg-primary/10 px-3 py-1.5 rounded-lg border border-gray-200"
            >
              <Edit3 className="w-4 h-4" /> Edit Profile
            </button>
          </div>
          <div className="p-6 sm:p-8 space-y-8">
            <div>
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-primary" /> Engineering Domains
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-500 font-semibold mb-1 uppercase">Primary Domain</p>
                  <p className="font-bold text-gray-900">{userDomain.domain}</p>
                </div>
                {userDomain.secondary_domain && (
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500 font-semibold mb-1 uppercase">Secondary Domain</p>
                    <p className="font-bold text-gray-900">{userDomain.secondary_domain}</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" /> Tracked Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {(userDomain.skills || []).map((s: string) => (
                  <span key={s} className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary font-semibold text-sm border border-primary/20">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
