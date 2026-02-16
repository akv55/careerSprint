"use client";

import { useState } from "react";

export default function AdminSettingsPage() {
  const [mfa, setMfa] = useState(true);
  const [maintenance, setMaintenance] = useState(false);

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
        <Toggle label="Maintenance Mode" state={maintenance} setState={setMaintenance} />
      </Section>

      {/* SECURITY SETTINGS */}
      <Section title="Security Settings">
        <Toggle label="Require MFA for Admins" state={mfa} setState={setMfa} />
        <Input label="Session Timeout (minutes)" defaultValue="30" />
        <Input label="Max Login Attempts" defaultValue="5" />
      </Section>

      {/* EXAM SETTINGS */}
      <Section title="Exam Configuration">
        <Input label="Default Exam Duration (mins)" defaultValue="60" />
        <Toggle label="Randomize Questions" state={true} />
        <Toggle label="Enable Negative Marking" state={false} />
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

function Section({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow space-y-4">
      <h2 className="text-lg font-semibold text-[#1F6FEB]">{title}</h2>
      {children}
    </div>
  );
}

function Input({ label, defaultValue }) {
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

function Toggle({ label, state = false, setState = () => {} }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600">{label}</span>
      <button
        onClick={() => setState(!state)}
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