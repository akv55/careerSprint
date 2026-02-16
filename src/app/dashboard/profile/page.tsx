"use client";

import { User, Mail, Phone, MapPin} from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="space-y-10">

      {/*  PROFILE HEADER */}
      <div className="relative bg-gradient-to-r from-[#0F6FFF] to-[#FF8A21] rounded-3xl p-8 text-white shadow-xl">
        <div className="flex items-center gap-6">
          <img
            src="https://i.pravatar.cc/120"
            alt="avatar"
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
          />
          <div>
            <h1 className="text-3xl font-bold">Alok Kumar</h1>
            <p className="opacity-90">Full Stack Developer</p>
            <p className="text-sm opacity-80 mt-1">
              Member since January 2026
            </p>
          </div>
        </div>
      </div>

      {/*  PERSONAL INFORMATION */}
      <Section title="Personal Information">
        <div className="grid md:grid-cols-2 gap-6">
          <InfoItem icon={<User size={18} />} label="Full Name" value="Alok Kumar" />
          <InfoItem icon={<Mail size={18} />} label="Email" value="alok@email.com" />
          <InfoItem icon={<Phone size={18} />} label="Phone" value="+91 9876543210" />
          <InfoItem icon={<MapPin size={18} />} label="Location" value="India" />
        </div>

        <button className="mt-6 bg-[#0F6FFF] text-white px-6 py-2 rounded-xl hover:bg-[#0057d3] transition">
          Edit Profile
        </button>
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

