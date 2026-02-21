"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Award,
  BarChart2,
  CalendarClock,
  Target,
} from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState("Alok Kumar");
  const [role, setRole] = useState("Full Stack Developer");
  const [email, setEmail] = useState("alok@email.com");
  const [phone, setPhone] = useState("+91 9876543210");
  const [location, setLocation] = useState("India");

  return (
    <div className="space-y-10">

      {/*  PROFILE HEADER */}
      <div className="relative bg-gradient-to-r from-[#0F6FFF] to-[#FF8A21] rounded-3xl p-8 text-white shadow-xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-6">
            <img
              src="https://i.pravatar.cc/120"
              alt="avatar"
              className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold">{fullName}</h1>
              <p className="opacity-90">{role}</p>
              <p className="text-sm opacity-80 mt-1">Member since January 2026</p>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 md:items-end">
            <div className="rounded-2xl bg-white/10 px-4 py-2 text-xs backdrop-blur">
              <p className="font-semibold">Profile completeness</p>
              <div className="mt-1 flex items-center gap-3">
                <div className="h-1.5 w-24 rounded-full bg-white/20">
                  <div className="h-1.5 w-20 rounded-full bg-emerald-300" />
                </div>
                <span className="text-sm font-semibold">80%</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-white/15 px-3 py-1">Actively preparing for interviews</span>
              <span className="rounded-full bg-white/15 px-3 py-1">Target: Senior Engineer</span>
            </div>
          </div>
        </div>
      </div>

      {/*  PERSONAL INFORMATION */}
      <Section title="Personal Information">
        {isEditing ? (
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setIsEditing(false);
            }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
                  Full name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#0F6FFF] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
                  Role / title
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#0F6FFF] focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#0F6FFF] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
                  Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#0F6FFF] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#0F6FFF] focus:border-transparent"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="submit"
                className="bg-[#0F6FFF] text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-[#0057d3] transition"
              >
                Save changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-4 py-2 rounded-xl border border-white/60 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 transition">
                Download resume
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-6">
              <InfoItem icon={<User size={18} />} label="Full Name" value={fullName} />
              <InfoItem icon={<Mail size={18} />} label="Email" value={email} />
              <InfoItem icon={<Phone size={18} />} label="Phone" value={phone} />
              <InfoItem icon={<MapPin size={18} />} label="Location" value={location} />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="bg-[#0F6FFF] text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-[#0057d3] transition"
              >
                Edit profile
              </button>
              <button className="px-4 py-2 rounded-xl border border-white/60 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 transition">
                Download resume
              </button>
            </div>
          </>
        )}
      </Section>

      {/*  CAREER OVERVIEW */}
      <Section title="Career overview">
        <div className="grid gap-6 md:grid-cols-3">
          <InfoItem icon={<Briefcase size={18} />} label="Current role" value="Full Stack Developer" />
          <InfoItem icon={<Award size={18} />} label="Experience" value="3–5 years" />
          <InfoItem icon={<Target size={18} />} label="Target role" value="Senior Frontend Engineer" />
        </div>

        {/* <p className="mt-6 text-sm text-gray-600 leading-relaxed">
          Passionate about building scalable, user-centric products. Comfortable across the stack with a
          strong focus on modern frontend architectures, performance, and developer experience. Enjoys
          mentoring juniors and collaborating closely with product and design.
        </p> */}
      </Section>

      {/*  EXAM & PRACTICE SNAPSHOT */}
      <Section title="Exam & practice snapshot">
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard label="Exams completed" value="12" subtitle="Last 90 days" />
          <StatCard label="Best score" value="92%" subtitle="System design" />
          <StatCard label="Avg. score" value="78%" subtitle="Across all attempts" />
          <StatCard label="Practice streak" value="7 days" subtitle="Keep it going" />
        </div>
      </Section>

      {/*  UPCOMING & RECENT ACTIVITY */}
      <Section title="Upcoming & recent activity">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <CalendarClock className="h-4 w-4 text-[#0F6FFF]" />
              Upcoming exams
            </h3>
            <div className="space-y-3 text-sm">
              <ActivityItem
                title="Frontend System Design"
                meta="24 Feb · 60 mins · Intermediate"
                badge="Scheduled"
              />
              <ActivityItem
                title="DSA Timed Round"
                meta="28 Feb · 45 mins · Advanced"
                badge="Planned"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <BarChart2 className="h-4 w-4 text-[#0F6FFF]" />
              Recent activity
            </h3>
            <div className="space-y-3 text-sm">
              <ActivityItem
                title="Completed AI mock interview"
                meta="Scored 88% · Focus: React & Typescript"
                badge="Completed"
              />
              <ActivityItem
                title="CV analyzed"
                meta="Profile strength: Strong · Suggestions applied"
                badge="Updated"
              />
              <ActivityItem
                title="Created new exam playlist"
                meta="Frontend + System Design combo"
                badge="New"
              />
            </div>
          </div>
        </div>
      </Section>

    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-md">
      <h2 className="text-xl font-semibold mb-6">{title}</h2>
      {children}
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-2xl bg-gray-50">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#0F6FFF] shadow-sm">
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
        <p className="text-sm font-semibold text-gray-900 mt-0.5">{value}</p>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  subtitle,
}: {
  label: string;
  value: string;
  subtitle?: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-4">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
      {subtitle && <p className="mt-1 text-[11px] text-gray-500">{subtitle}</p>}
    </div>
  );
}

function ActivityItem({
  title,
  meta,
  badge,
}: {
  title: string;
  meta: string;
  badge: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3">
      <div>
        <p className="text-sm font-semibold text-gray-900">{title}</p>
        <p className="mt-1 text-xs text-gray-500">{meta}</p>
      </div>
      <span className="mt-1 rounded-full bg-white px-3 py-1 text-[11px] font-medium text-[#0F6FFF]">
        {badge}
      </span>
    </div>
  );
}


