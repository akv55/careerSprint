"use client";

import { useState } from "react";
import { Bell, AlertTriangle, CheckCircle2, ShieldAlert, Server, Users } from "lucide-react";
import clsx from "clsx";

type AdminNotification = {
  id: number;
  title: string;
  description: string;
  time: string;
  type: "incident" | "usage" | "security" | "info";
  read: boolean;
};

const initialAdminNotifications: AdminNotification[] = [
  {
    id: 1,
    title: "High cheating risk detected",
    description: "3 candidates flagged with high-risk proctoring signals in the last exam batch.",
    time: "20 min ago",
    type: "security",
    read: false,
  },
  {
    id: 2,
    title: "Exam creation spike",
    description: "Exam creations are 35% higher than the same time last week.",
    time: "1 hour ago",
    type: "usage",
    read: false,
  },
  {
    id: 3,
    title: "Billing limit approaching",
    description: "You have used 80% of this month's AI analysis quota.",
    time: "Today",
    type: "incident",
    read: true,
  },
  {
    id: 4,
    title: "New organization onboarded",
    description: "Acme Corp added 24 new candidates to the platform.",
    time: "Yesterday",
    type: "info",
    read: true,
  },
];

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState(initialAdminNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markOneAsRead = (id: number) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const filteredNotifications =
    filter === "unread" ? notifications.filter((n) => !n.read) : notifications;

  const getIcon = (type: AdminNotification["type"]) => {
    switch (type) {
      case "incident":
        return <Server className="text-orange-500 w-5 h-5" />;
      case "usage":
        return <Users className="text-blue-500 w-5 h-5" />;
      case "security":
        return <ShieldAlert className="text-red-500 w-5 h-5" />;
      default:
        return <Bell className="text-gray-500 w-5 h-5" />;
    }
  };

  const getTypeLabel = (type: AdminNotification["type"]) => {
    switch (type) {
      case "incident":
        return "Billing & limits";
      case "usage":
        return "Usage";
      case "security":
        return "Security";
      default:
        return "General";
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-base-content">Admin notifications</h1>
          <p className="mt-1 text-xs text-base-content/60">
            {unreadCount === 0
              ? "No critical alerts at the moment."
              : `${unreadCount} alert${unreadCount > 1 ? "s" : ""} require your attention.`}
          </p>
        </div>
        <button
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
          className="text-sm font-semibold text-primary hover:text-accent transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Mark all as read
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-3">
        {["all", "unread"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab as "all" | "unread")}
            className={clsx(
              "px-4 py-2 rounded-lg text-sm font-medium transition",
              filter === tab
                ? "bg-gradient-to-r from-primary to-accent text-white"
                : "bg-base-200 text-base-content hover:bg-base-300"
            )}
          >
            {tab === "all" ? "All" : "Unread"}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 && (
          <div className="rounded-xl border border-base-200 p-8 text-center text-base-content/60">
            <CheckCircle2 className="mx-auto mb-2 h-6 w-6 text-emerald-500" />
            All caught up  there are no admin alerts.
          </div>
        )}

        {filteredNotifications.map((n) => (
          <div
            key={n.id}
            className={clsx(
              "flex items-start gap-4 p-4 rounded-xl border transition hover:shadow-md",
              n.read
                ? "bg-base-100 border-base-200"
                : "bg-yellow-50/60 border-yellow-200"
            )}
          >
            <div className="mt-1 flex items-center justify-center h-9 w-9 rounded-full bg-base-100">
              {getIcon(n.type)}
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start gap-3">
                <div>
                  <h3 className="font-semibold text-base-content">{n.title}</h3>
                  <p className="text-sm text-base-content/70 mt-1">{n.description}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="inline-flex items-center rounded-full bg-base-200 px-2 py-0.5 text-[11px] font-medium text-base-content/70">
                    {getTypeLabel(n.type)}
                  </span>
                  {!n.read && (
                    <button
                      type="button"
                      onClick={() => markOneAsRead(n.id)}
                      className="text-[11px] font-medium text-primary hover:text-accent"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
              <p className="text-xs text-base-content/50 mt-2">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
