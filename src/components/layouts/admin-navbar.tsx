"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, Bell, UserCircle2, User, KeyRound, LogOut, ChevronDown } from "lucide-react";
import Image from "next/image";
export default function AdminNavbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8">
      {/* Left: Logo / brand */}
      <Link href="/admin/adminDashboard" className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="CareerSprint Admin"
          width={200}
          height={40}
          priority
        />
      </Link>

      {/* Middle: Search */}
      <div className="flex-1 max-w-md mx-4 hidden md:flex">
        <div className="flex w-full items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-700 focus-within:ring-1 focus-within:ring-[#0F6FFF] focus-within:ring-offset-0">
          <Search className="h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search candidates, exams, or settings..."
            className="h-7 w-full border-none bg-transparent text-sm outline-none placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-full border border-blue-300 bg-blue-50 text-gray-500 hover:bg-gray-50"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute -top-0.5 -right-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
            3
          </span>
        </button>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors border border-orange-300 ${
              open
                ? "bg-gradient-to-r from-[#0F6FFF] to-[#FF8A21] text-white border-transparent"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
            }`}
          >
            <UserCircle2 className={`h-5 w-5 ${open ? "text-white" : "text-orange-300"}`} />
            {/* <span className="hidden sm:inline">Admin</span> */}
            <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : "rotate-0"}`} />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl border border-gray-200 bg-white py-1 shadow-lg z-50">
              <Link
                href="/dashboard/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <User className="h-4 w-4 text-gray-500" />
                <span>Profile</span>
              </Link>
              <Link
                href="/dashboard/setting"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <KeyRound className="h-4 w-4 text-gray-500" />
                <span>Change password</span>
              </Link>
              <Link
                href="/auth/login"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
