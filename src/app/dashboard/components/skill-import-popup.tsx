'use client'

interface SkillImportPopupProps {
  domain: string
  onConfirm: () => void
  onSkip: () => void
}

export default function SkillImportPopup({ domain, onConfirm, onSkip }: SkillImportPopupProps) {
  return (
    <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-30 rounded-2xl flex items-center justify-center p-6 animate-in fade-in duration-200">
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xl max-w-sm w-full text-center">
        <h3 className="text-lg font-bold mb-2 uppercase tracking-tight text-gray-900">Import Skills?</h3>
        <p className="text-sm font-medium text-gray-600 mb-6">
          You selected <strong className="text-gray-900">{domain}</strong>. Would you like to automatically import all common skills related to this domain?
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onSkip}
            className="px-4 py-2 bg-gray-50 text-gray-700 font-semibold rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors shadow-sm"
          >
            No, Skip
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-accent text-white font-semibold rounded-xl hover:opacity-90 transition-colors shadow-sm"
          >
            Yes, Import All
          </button>
        </div>
      </div>
    </div>
  )
}
