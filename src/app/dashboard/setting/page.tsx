"use client";

import { useState, type Dispatch, type SetStateAction, type ReactNode } from "react";
import {
  Bell,
  Moon,
  ShieldCheck,
  Lock,
  CreditCard,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle2,
  Circle,
} from "lucide-react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [examNotif, setExamNotif] = useState(true);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showTimer, setShowTimer] = useState(true);
  const [autoSubmit, setAutoSubmit] = useState(true);
  const [focusMode, setFocusMode] = useState(false);
  const [leaderboardVisible, setLeaderboardVisible] = useState(true);
  const [shareAnalytics, setShareAnalytics] = useState(false);
  const [autoEnrollPractice, setAutoEnrollPractice] = useState(true);

  return (
    <div className="space-y-8">

      {/* PAGE TITLE */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Manage your profile, notifications, appearance, and security.
          </p>
        </div>
        {/* <div className="rounded-2xl bg-gradient-to-r from-[#f5f8ff] to-[#fff5ec] px-4 py-3 text-xs text-gray-600 max-w-xs">
          <p className="font-semibold text-[#0F6FFF]">Tip</p>
          <p className="mt-1">
            Keep your contact details updated so you never miss important exam alerts.
          </p>
        </div> */}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">

        {/* LEFT COLUMN */}
        <div className="space-y-6">
          {/* ACCOUNT SETTINGS */}
          <Section title="Account Settings">
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Input label="Full Name" defaultValue="Alok Kumar" />
                <Input label="Role" defaultValue="Frontend Engineer" />
              </div>
              <Input label="Email" defaultValue="alok@email.com" />
              <Input label="Phone Number" defaultValue="+91 9876543210" />

              <div className="flex flex-wrap gap-3 pt-2">
                <button className="bg-[#0F6FFF] text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-[#0057d3] transition">
                  Save changes
                </button>
                <button className="text-xs text-gray-500 hover:text-gray-700">
                  Reset
                </button>
              </div>
            </div>
          </Section>

          {/* NOTIFICATIONS */}
          <Section title="Notifications">
            <div className="space-y-3">
              <Toggle
                icon={<Bell size={18} />}
                label="Email notifications"
                state={emailNotif}
                setState={setEmailNotif}
              />

              <Toggle
                icon={<Bell size={18} />}
                label="Exam reminders"
                state={examNotif}
                setState={setExamNotif}
              />
            </div>
          </Section>

          {/* APPEARANCE */}
          <Section title="Appearance">
            <Toggle
              icon={<Moon size={18} />}
              label="Enable dark mode"
              state={darkMode}
              setState={setDarkMode}
            />
          </Section>

          {/* EXAM PREFERENCES */}
          <Section title="Exam preferences">
            <div className="space-y-3">
              <Toggle
                icon={<Bell size={18} />}
                label="Show timer during exams"
                state={showTimer}
                setState={setShowTimer}
              />
              <Toggle
                icon={<ShieldCheck size={18} />}
                label="Auto-submit when time is over"
                state={autoSubmit}
                setState={setAutoSubmit}
              />
              <Toggle
                icon={<Moon size={18} />}
                label="Enable focus mode (minimal distractions)"
                state={focusMode}
                setState={setFocusMode}
              />
            </div>
          </Section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* SECURITY */}
          <Section title="Security">
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setShowChangePassword(true)}
                className="flex w-full items-center justify-between gap-3 rounded-2xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm font-medium text-yellow-900 hover:bg-yellow-100 transition"
              >
                <span className="flex items-center gap-2">
                  <Lock size={18} />
                  Change password
                </span>
                <span className="text-[11px] uppercase tracking-wide">Recommended</span>
              </button>
{/* 
              <button className="flex w-full items-center justify-between gap-3 rounded-2xl border border-gray-800 bg-gray-900 px-4 py-3 text-sm font-medium text-white hover:bg-black transition">
                <span className="flex items-center gap-2">
                  <ShieldCheck size={18} />
                  Enable two-factor authentication
                </span>
                <span className="text-[11px] uppercase tracking-wide text-gray-300">Secure</span>
              </button> */}
            </div>
          </Section>

          {/* SUBSCRIPTION */}
          <Section title="Subscription Plan">
            <div className="flex flex-col gap-4 rounded-2xl bg-gradient-to-r from-[#f5f8ff] to-[#fff5ec] p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-gray-500 text-xs">Current plan</p>
                  <h3 className="text-xl font-bold text-[#0F6FFF]">Pro</h3>
                  <p className="mt-1 text-xs text-gray-500">Unlimited AI exams, detailed analytics, and priority support.</p>
                </div>
                <div className="text-right text-sm font-semibold text-gray-700">
                  ₹799<span className="text-xs text-gray-500">/month</span>
                </div>
              </div>

              <button className="flex items-center justify-center gap-2 bg-[#FF8A21] text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-[#ff7a00] transition">
                <CreditCard size={18} />
                Manage plan
              </button>
            </div>
          </Section>

          {/* PRIVACY & DATA */}
          <Section title="Privacy & data">
            <div className="space-y-3">
              <Toggle
                icon={<Eye size={18} />}
                label="Show my profile on leaderboards"
                state={leaderboardVisible}
                setState={setLeaderboardVisible}
              />
              <Toggle
                icon={<ShieldCheck size={18} />}
                label="Share anonymized performance data to improve exams"
                state={shareAnalytics}
                setState={setShareAnalytics}
              />
              <Toggle
                icon={<Bell size={18} />}
                label="Automatically enroll me in recommended practice tests"
                state={autoEnrollPractice}
                setState={setAutoEnrollPractice}
              />
            </div>
          </Section>

          {/* DANGER ZONE */}
          <Section title="Danger Zone">
            <p className="mb-3 text-xs text-gray-500">
              Deleting your account will permanently remove your profile, exam history, and analytics.
            </p>
            <button className="flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-red-700 transition">
              <Trash2 size={18} />
              Delete account
            </button>
          </Section>
        </div>
      </div>

      {showChangePassword && (
        <ChangePasswordModal onClose={() => setShowChangePassword(false)} />
      )}

    </div>
  );
}

/* ---------- REUSABLE COMPONENTS ---------- */

type SectionProps = {
  title: string;
  children: ReactNode;
};

function Section({ title, children }: SectionProps) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-base-200">
      <h2 className="text-base sm:text-lg font-semibold mb-4 text-base-content">{title}</h2>
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
      <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
        {label}
      </label>
      <input
        type="text"
        defaultValue={defaultValue}
        className="w-full bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F6FFF] focus:border-transparent"
      />
    </div>
  );
}

type ToggleProps = {
  icon: ReactNode;
  label: string;
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
};

function Toggle({ icon, label, state, setState }: ToggleProps) {
  return (
    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100">
      <div className="flex items-center gap-3">
        <div className="text-[#0F6FFF]">{icon}</div>
        <p className="text-sm font-medium text-base-content">{label}</p>
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

type ChangePasswordModalProps = {
  onClose: () => void;
};

function ChangePasswordModal({ onClose }: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const minLengthOk = newPassword.length >= 8;
  const hasUpper = /[A-Z]/.test(newPassword);
  const hasLower = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSpecial = /[^A-Za-z0-9]/.test(newPassword);
  const allRulesOk = minLengthOk && hasUpper && hasLower && hasNumber && hasSpecial;
  const confirmOk = confirmPassword.length > 0 && confirmPassword === newPassword;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    if (!allRulesOk) {
      setError("New password does not meet the strength requirements.");
      return;
    }

    // TODO: Wire up API call for password change.
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl border border-[#e4ecff]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            {/* <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0F6FFF] to-[#FF8A21] text-white shadow-md">
              <Lock className="h-4 w-4" />
            </div> */}
            <div className="item-center">
              <h2 className="text-lg font-semibold text-base-content">Change password</h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#0F6FFF] text-xs font-medium text-white hover:bg-[#0057d3] transition"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-sm">
          {/* Current password */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
              Old password
            </label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-[#0F6FFF] focus:border-transparent pr-10 ${
                  currentPassword
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowCurrent((v) => !v)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* New password with rules */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
              New password
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-[#0F6FFF] focus:border-transparent pr-10 ${
                  newPassword
                    ? allRulesOk
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-red-500 bg-red-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowNew((v) => !v)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <div className="mt-2 text-[11px]">
              <p className="mb-1 font-medium text-red-600" hidden={allRulesOk || !newPassword}>
                Please add all necessary characters to create a safe password.
              </p>
              <ul className="space-y-1">
                <PasswordRule
                  label="Minimum 8 characters"
                  active={!!newPassword}
                  ok={minLengthOk}
                />
                <PasswordRule
                  label="One uppercase character"
                  active={!!newPassword}
                  ok={hasUpper}
                />
                <PasswordRule
                  label="One lowercase character"
                  active={!!newPassword}
                  ok={hasLower}
                />
                <PasswordRule
                  label="One special character"
                  active={!!newPassword}
                  ok={hasSpecial}
                />
                <PasswordRule
                  label="One number"
                  active={!!newPassword}
                  ok={hasNumber}
                />
              </ul>
            </div>
          </div>

          {/* Confirm password */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
              Confirm new password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-[#0F6FFF] focus:border-transparent pr-10 ${
                  confirmPassword
                    ? confirmOk
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-red-500 bg-red-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-600 mt-1 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
              {error}
            </p>
          )}

          <div className="mt-4 flex justify-end gap-3 text-sm">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-base-200 text-xs font-medium text-base-content/70 hover:bg-base-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#0F6FFF] text-xs font-medium text-white hover:bg-[#0057d3] transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

type PasswordRuleProps = {
  label: string;
  active: boolean;
  ok: boolean;
};

function PasswordRule({ label, active, ok }: PasswordRuleProps) {
  const baseColor = !active ? "text-gray-400" : ok ? "text-emerald-600" : "text-red-600";

  return (
    <li className={`flex items-center gap-2 ${baseColor}`}>
      {ok ? (
        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
      ) : (
        <Circle className={`h-3 w-3 ${!active ? "text-gray-300" : "text-red-300"}`} />
      )}
      <span className={active && !ok ? "font-medium" : ""}>{label}</span>
    </li>
  );
}