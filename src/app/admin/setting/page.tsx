"use client";

import { useState, type Dispatch, type SetStateAction, type ReactNode } from "react";

export default function AdminSettingsPage() {
  const [mfa, setMfa] = useState(true);
  const [maintenance, setMaintenance] = useState(false);
  const [allowRegistrations, setAllowRegistrations] = useState(true);
  const [enforcePasswordPolicy, setEnforcePasswordPolicy] = useState(true);
  const [randomizeQuestions, setRandomizeQuestions] = useState(true);
  const [negativeMarking, setNegativeMarking] = useState(false);
  const [examReminderEmails, setExamReminderEmails] = useState(true);
  const [resultSummaryEmails, setResultSummaryEmails] = useState(true);
  const [aiProctoring, setAiProctoring] = useState(false);
  const [recordWebcam, setRecordWebcam] = useState(false);

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-[#1F6FEB]">
          Admin Settings
        </h1>
        <p className="text-gray-500 mt-1">
          Configure platform behavior and security.
        </p>
      </div>

      {/* GENERAL SETTINGS */}
      <Section title="General Settings">
        <Input label="Platform Name" defaultValue="Industry Exam Portal" />
        <Input label="Support Email" defaultValue="support@industry.com" />
        <Toggle
          label="Allow new user registrations"
          state={allowRegistrations}
          setState={setAllowRegistrations}
        />
        <Toggle label="Maintenance Mode" state={maintenance} setState={setMaintenance} />
      </Section>

      {/* SECURITY SETTINGS */}
      <Section title="Security Settings">
        <Toggle label="Require MFA for Admins" state={mfa} setState={setMfa} />
        <Toggle
          label="Enforce strong password policy"
          state={enforcePasswordPolicy}
          setState={setEnforcePasswordPolicy}
        />
        <Input label="Session Timeout (minutes)" defaultValue="30" />
        <Input label="Max Login Attempts" defaultValue="5" />
        <Input label="Password expiry (days)" defaultValue="90" />
      </Section>

      {/* EXAM SETTINGS */}
      <Section title="Exam Configuration">
        <Input label="Default Exam Duration (mins)" defaultValue="60" />
        <Toggle
          label="Randomize Questions"
          state={randomizeQuestions}
          setState={setRandomizeQuestions}
        />
        <Toggle
          label="Enable Negative Marking"
          state={negativeMarking}
          setState={setNegativeMarking}
        />
      </Section>

      {/* NOTIFICATIONS & COMMUNICATION */}
      <Section title="Notifications & Communication">
        <Toggle
          label="Send exam reminder emails to candidates"
          state={examReminderEmails}
          setState={setExamReminderEmails}
        />
        <Toggle
          label="Send result summary emails after exam completion"
          state={resultSummaryEmails}
          setState={setResultSummaryEmails}
        />
      </Section>

      {/* PROCTORING & COMPLIANCE */}
      <Section title="Proctoring & Compliance">
        <Toggle
          label="Enable AI proctoring for online exams"
          state={aiProctoring}
          setState={setAiProctoring}
        />
        <Toggle
          label="Record webcam during proctored sessions"
          state={recordWebcam}
          setState={setRecordWebcam}
        />
        <Input label="Proctoring data retention (days)" defaultValue="30" />
      </Section>

      {/* SAVE BUTTON */}
      <div className="flex justify-end">
        <button className="px-6 py-2 bg-[#F37021] text-white rounded-xl">
          Save Changes
        </button>
      </div>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

type SectionProps = {
  title: string;
  children: ReactNode;
};

function Section({ title, children }: SectionProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow space-y-4">
      <h2 className="text-lg font-semibold text-[#1F6FEB]">{title}</h2>
      {children}
    </div>
  );
}

type InputProps = {
  label: string;
  defaultValue?: string;
};

function Input({ label, defaultValue }: InputProps) {
  return (
    <div>
      <label className="block text-sm text-gray-500 mb-1">{label}</label>
      <input
        type="text"
        defaultValue={defaultValue}
        className="w-full bg-gray-100 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1F6FEB]"
      />
    </div>
  );
}

type ToggleProps = {
  label: string;
  state?: boolean;
  setState?: Dispatch<SetStateAction<boolean>>;
};

function Toggle({ label, state = false, setState }: ToggleProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600">{label}</span>
      <button
        onClick={() => setState?.(!state)}
        className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
          state ? "bg-[#1F6FEB]" : "bg-gray-300"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
            state ? "translate-x-6" : ""
          }`}
        />
      </button>
    </div>
  );
}