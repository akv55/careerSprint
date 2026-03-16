'use client'

import { X } from 'lucide-react'
import SearchableDropdown from './searchable-dropdown'
import { ALL_KNOWN_SKILLS } from '@/utils/skillsDB'

interface SkillsEditorProps {
  skills: string[]
  newSkill: string
  onNewSkillChange: (v: string) => void
  onAddSkill: (skill: string) => void
  onRemoveSkill: (skill: string) => void
}

export default function SkillsEditor({
  skills, newSkill, onNewSkillChange, onAddSkill, onRemoveSkill
}: SkillsEditorProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">Your Skills</label>
      <div className="flex flex-wrap gap-2 mb-4">
        {skills.map(skill => (
          <div key={skill} className="flex items-center gap-1 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg text-sm font-semibold text-gray-700 shadow-sm">
            {skill}
            <button
              onClick={() => onRemoveSkill(skill)}
              className="ml-1 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        {skills.length === 0 && (
          <span className="text-sm text-gray-400 font-medium italic mt-2">No skills added yet.</span>
        )}
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <SearchableDropdown
            options={ALL_KNOWN_SKILLS}
            value={newSkill}
            onChange={onNewSkillChange}
            onSelectOption={(val) => onAddSkill(val)}
            placeholder="Search and add skills (or type custom, comma-separated)..."
          />
        </div>
        <button
          onClick={(e) => { e.preventDefault(); onAddSkill(newSkill) }}
          className="bg-primary text-white rounded-xl px-4 font-semibold hover:opacity-90 transition-colors shadow-sm"
        >
          Add
        </button>
      </div>
    </div>
  )
}
