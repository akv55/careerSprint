'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import CvUploadForm from './cv-upload-form'
import SearchableDropdown from './components/searchable-dropdown'
import SkillsEditor from './components/skills-editor'
import SkillImportPopup from './components/skill-import-popup'
import { extractDomainAndSkills, SKILLS_DB } from '@/utils/skillsDB'
import { saveUserDomain } from './actions'

const DOMAINS = Object.keys(SKILLS_DB)

export default function SetupWizard() {
  const [step, setStep] = useState<'upload' | 'manual' | 'confirm'>('upload')
  const [domain, setDomain] = useState('')
  const [secondaryDomain, setSecondaryDomain] = useState('')
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [importPopupDomain, setImportPopupDomain] = useState<string | null>(null)

  const handleUploadSuccess = (data: any) => {
    const extracted = extractDomainAndSkills(data.text)
    setDomain(extracted.domain)
    if (extracted.secondaryDomain) setSecondaryDomain(extracted.secondaryDomain)
    setSkills(extracted.skills)
    setStep('confirm')
  }

  const handleAddSkill = (skillToAdd: string) => {
    if (!skillToAdd.trim()) return
    const split = skillToAdd.split(',').map(s => s.trim().toLowerCase()).filter(Boolean)
    setSkills(prev => Array.from(new Set([...prev, ...split])))
    setNewSkill('')
  }

  const triggerImportIfKnown = (selected: string) => {
    if (SKILLS_DB[selected]?.length > 0) setImportPopupDomain(selected)
  }

  const confirmImport = () => {
    if (importPopupDomain && SKILLS_DB[importPopupDomain]) {
      setSkills(prev => Array.from(new Set([...prev, ...SKILLS_DB[importPopupDomain]])))
    }
    setImportPopupDomain(null)
  }

  const handleSave = async () => {
    if (!domain.trim() || skills.length === 0) {
      setError('Please provide a primary domain and at least one skill.')
      return
    }
    setSaving(true)
    setError(null)
    const result = await saveUserDomain(domain, skills, secondaryDomain || undefined)
    if (result.error) { setError(result.error); setSaving(false) }
  }

  if (step === 'upload') {
    return (
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm w-full">
        <h2 className="text-2xl font-bold mb-2 tracking-tight text-gray-900 uppercase">Extract Skills from CV</h2>
        <p className="text-gray-600 font-medium mb-6">
          Upload your resume and we will automatically parse your domain and technical skills using fast local tech.
        </p>
        <CvUploadForm onSuccess={handleUploadSuccess} />
        <div className="mt-8 pt-6 border-t border-dashed border-gray-200 text-center">
          <p className="text-gray-500 font-medium mb-3">Don't have a resume handy?</p>
          <button
            onClick={() => { setDomain(''); setSecondaryDomain(''); setSkills([]); setStep('manual') }}
            className="text-sm font-semibold text-primary hover:opacity-80 underline decoration-1 underline-offset-4 transition-all"
          >
            Enter skills manually instead
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 relative w-full">
      <h2 className="text-2xl font-bold mb-2 tracking-tight text-gray-900 uppercase">
        {step === 'confirm' ? 'Confirm Your Skills' : 'Define Your Skills'}
      </h2>
      <p className="text-gray-600 font-medium mb-6">
        {step === 'confirm'
          ? 'We extracted these from your resume. Review, add, or remove items before proceeding.'
          : 'Manually define your technical profile. This will power your practice exams.'}
      </p>

      {error && (
        <div className="mb-6 bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200 font-medium">{error}</div>
      )}

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">Primary Domain</label>
            <SearchableDropdown options={DOMAINS} value={domain} onChange={setDomain}
              onSelectOption={(v) => { setDomain(v); triggerImportIfKnown(v) }}
              placeholder="e.g. Frontend Engineering..." />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Secondary Domain <span className="text-gray-400 text-xs font-medium tracking-normal">(Optional)</span>
            </label>
            <SearchableDropdown options={DOMAINS} value={secondaryDomain} onChange={setSecondaryDomain}
              onSelectOption={(v) => { setSecondaryDomain(v); triggerImportIfKnown(v) }}
              placeholder="e.g. Backend Engineering..." />
          </div>
        </div>

        <SkillsEditor
          skills={skills} newSkill={newSkill}
          onNewSkillChange={setNewSkill}
          onAddSkill={handleAddSkill}
          onRemoveSkill={(s) => setSkills(prev => prev.filter(x => x !== s))}
        />
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between">
        <button onClick={() => setStep('upload')} className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">
          ← Back to Upload
        </button>
        <button onClick={handleSave} disabled={saving}
          className="flex justify-center items-center gap-2 rounded-xl bg-accent px-8 py-3 text-sm font-bold text-white shadow-sm hover:opacity-90 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Save & Continue'}
        </button>
      </div>

      {importPopupDomain && (
        <SkillImportPopup
          domain={importPopupDomain}
          onConfirm={confirmImport}
          onSkip={() => setImportPopupDomain(null)}
        />
      )}
    </div>
  )
}
