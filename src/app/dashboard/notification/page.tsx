'use client'

import { useState } from 'react'
import { Bell, CheckCircle, AlertTriangle, Sparkles } from 'lucide-react'
import clsx from 'clsx'

type Notification = {
  id: number
  title: string
  description: string
  time: string
  type: 'success' | 'warning' | 'ai' | 'info'
  read: boolean
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: 'Test Completed Successfully',
    description: 'You scored 82% in Frontend Fundamentals.',
    time: '2 hours ago',
    type: 'success',
    read: false,
  },
  {
    id: 2,
    title: 'AI Insight Generated',
    description: 'System Design skill needs improvement.',
    time: '5 hours ago',
    type: 'ai',
    read: false,
  },
  {
    id: 3,
    title: 'Cheating Risk Stable',
    description: 'Your proctoring metrics look normal.',
    time: 'Yesterday',
    type: 'info',
    read: true,
  },
  {
    id: 4,
    title: 'Time Limit Warning',
    description: 'You exceeded average completion time.',
    time: '2 days ago',
    type: 'warning',
    read: true,
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    )
  }

  const filteredNotifications =
    filter === 'unread'
      ? notifications.filter((n) => !n.read)
      : notifications

  const markOneAsRead = (id: number) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-green-500 w-5 h-5" />
      case 'warning':
        return <AlertTriangle className="text-orange-500 w-5 h-5" />
      case 'ai':
        return <Sparkles className="text-blue-500 w-5 h-5" />
      default:
        return <Bell className="text-gray-500 w-5 h-5" />
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="mt-1 text-xs text-base-content/60">
            {unreadCount === 0 ? 'You have no unread notifications.' : `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}.`}
          </p>
        </div>
        <button
          onClick={markAllAsRead}
          className="text-sm font-semibold text-blue-600 hover:text-orange-500 transition disabled:opacity-40 disabled:cursor-not-allowed"
          disabled={unreadCount === 0}
        >
          Mark all as read
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-3">
        {['all', 'unread'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab as any)}
            className={clsx(
              'px-4 py-2 rounded-lg text-sm font-medium transition',
              filter === tab
                ? 'bg-gradient-to-r from-blue-600 to-orange-500 text-white'
                : 'bg-base-200 text-base-content hover:bg-base-300'
            )}
          >
            {tab === 'all' ? 'All' : 'Unread'}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 && (
          <div className="rounded-xl border border-base-200 p-8 text-center text-base-content/60">
            🎉 You're all caught up!
          </div>
        )}

        {filteredNotifications.map((n) => (
          <div
            key={n.id}
            className={clsx(
              'flex items-start gap-4 p-4 rounded-xl border transition hover:shadow-md',
              n.read
                ? 'bg-base-100 border-base-200'
                : 'bg-blue-50/50 border-blue-200'
            )}
          >
            <div className="mt-1">{getIcon(n.type)}</div>

            <div className="flex-1">
              <div className="flex justify-between items-start gap-3">
                <div>
                  <h3 className="font-semibold">{n.title}</h3>
                  <p className="text-sm text-base-content/70 mt-1">
                    {n.description}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  {!n.read && (
                    <span className="w-2 h-2 bg-blue-600 rounded-full" aria-hidden="true"></span>
                  )}
                  {!n.read && (
                    <button
                      type="button"
                      onClick={() => markOneAsRead(n.id)}
                      className="text-[11px] font-medium text-blue-600 hover:text-orange-500"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
              <p className="text-xs text-base-content/50 mt-2">
                {n.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}