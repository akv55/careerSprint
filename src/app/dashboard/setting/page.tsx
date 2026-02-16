"use client";

import { useState } from "react";
import {
  Bell,
  Moon,
  ShieldCheck,
  Lock,
  CreditCard,
  Trash2,
} from "lucide-react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [examNotif, setExamNotif] = useState(true);

  return (
    <div className="space-y-10">

      {/* PAGE TITLE */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-500 mt-2">
          Manage your account preferences and security.
        </p>
      </div>

      {/* ACCOUNT SETTINGS */}
      <Section title="Account Settings">
        <div className="space-y-4">
          <Input label="Full Name" defaultValue="Alok Kumar" />
          <Input label="Email" defaultValue="alok@email.com" />
          <Input label="Phone Number" defaultValue="+91 9876543210" />

          <button className="bg-[#0F6FFF] text-white px-6 py-2 rounded-xl hover:bg-[#0057d3] transition">
            Save Changes
          </button>
        </div>
      </Section>

      {/* NOTIFICATIONS */}
      <Section title="Notifications">
        <Toggle
          icon={<Bell size={18} />}
          label="Email Notifications"
          state={emailNotif}
          setState={setEmailNotif}
        />

        <Toggle
          icon={<Bell size={18} />}
          label="Exam Reminders"
          state={examNotif}
          setState={setExamNotif}
        />
      </Section>

      {/* APPEARANCE */}
      <Section title="Appearance">
        <Toggle
          icon={<Moon size={18} />}
          label="Enable Dark Mode"
          state={darkMode}
          setState={setDarkMode}
        />
      </Section>

      {/* SECURITY */}
      <Section title="Security">
        <div className="space-y-4">
          <button className="flex items-center gap-2 bg-yellow-500 text-white px-5 py-2 rounded-xl hover:bg-yellow-600 transition">
            <Lock size={18} />
            Change Password
          </button>

          <button className="flex items-center gap-2 bg-gray-800 text-white px-5 py-2 rounded-xl hover:bg-black transition">
            <ShieldCheck size={18} />
            Enable Two-Factor Authentication
          </button>
        </div>
      </Section>

      {/* SUBSCRIPTION */}
      <Section title="Subscription Plan">
        <div className="flex items-center justify-between bg-gradient-to-r from-[#f5f8ff] to-[#fff5ec] p-6 rounded-2xl">
          <div>
            <p className="text-gray-500 text-sm">Current Plan</p>
            <h3 className="text-xl font-bold text-[#0F6FFF]">Pro Plan</h3>
          </div>

          <button className="flex items-center gap-2 bg-[#FF8A21] text-white px-5 py-2 rounded-xl hover:bg-[#ff7a00] transition">
            <CreditCard size={18} />
            Upgrade Plan
          </button>
        </div>
      </Section>

      {/* DANGER ZONE */}
      <Section title="Danger Zone">
        <button className="flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700 transition">
          <Trash2 size={18} />
          Delete Account
        </button>
      </Section>

    </div>
  );
}

/* ---------- REUSABLE COMPONENTS ---------- */

function Section({ title, children }) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-md">
      <h2 className="text-xl font-semibold mb-6">{title}</h2>
      {children}
    </div>
  );
}

function Input({ label, defaultValue }) {
  return (
    <div>
      <label className="block text-sm text-gray-500 mb-2">
        {label}
      </label>
      <input
        type="text"
        defaultValue={defaultValue}
        className="w-full bg-gray-100 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F6FFF]"
      />
    </div>
  );
}

function Toggle({ icon, label, state, setState }) {
  return (
    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
      <div className="flex items-center gap-3">
        <div className="text-[#0F6FFF]">{icon}</div>
        <p className="text-sm font-medium">{label}</p>
      </div>

      <button
        onClick={() => setState(!state)}
        className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
          state ? "bg-[#0F6FFF]" : "bg-gray-300"
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