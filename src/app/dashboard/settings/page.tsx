import { Bell, Lock, Moon } from 'lucide-react'

function SettingsContent() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your preferences and application settings.</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 md:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Account Settings</h2>
          
          <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-100 hover:border-gray-200 bg-gray-50 hover:bg-gray-100/50 rounded-2xl transition-all cursor-not-allowed opacity-70">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gray-200">
                    <Lock className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Change Password</h3>
                    <p className="text-xs text-gray-500">Update your account password</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase bg-gray-100 px-2 py-1 rounded">Coming Soon</span>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-100 hover:border-gray-200 bg-gray-50 hover:bg-gray-100/50 rounded-2xl transition-all cursor-not-allowed opacity-70">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gray-200">
                    <Bell className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                    <p className="text-xs text-gray-500">Manage email alerts and study reminders</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase bg-gray-100 px-2 py-1 rounded">Coming Soon</span>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-100 hover:border-gray-200 bg-gray-50 hover:bg-gray-100/50 rounded-2xl transition-all cursor-not-allowed opacity-70">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gray-200">
                    <Moon className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Appearance</h3>
                    <p className="text-xs text-gray-500">Toggle dark mode and interface themes</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase bg-gray-100 px-2 py-1 rounded">Coming Soon</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h2 className="text-lg font-bold text-red-600 mb-4">Danger Zone</h2>
              <div className="p-4 border border-red-200 bg-red-50/50 rounded-2xl">
                <h3 className="font-semibold text-red-900 mb-1">Delete Account</h3>
                <p className="text-sm text-red-700 mb-4">Permanently remove your account and all associated test history.</p>
                <button disabled className="bg-red-600/30 text-white px-4 py-2 rounded-xl text-xs font-bold cursor-not-allowed">
                  Delete Account (Disabled)
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default function SettingsPage() {
  return <SettingsContent />
}
