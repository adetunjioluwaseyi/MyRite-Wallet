"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { X, Check, AlertCircle, Info } from "lucide-react"

interface Notification {
  id: string
  type: "success" | "warning" | "info" | "error"
  title: string
  message: string
  timestamp: string
  read: boolean
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "success",
      title: "New clients from daily wallets",
      message: "5 new users joined the Daily Savings group",
      timestamp: "18 OCT 7:20 AM",
      read: false,
    },
    {
      id: "2",
      type: "warning",
      title: "New clients from weekly wallets",
      message: "3 new users joined the Weekly Savings group",
      timestamp: "19 OCT 11:21 PM",
      read: false,
    },
    {
      id: "3",
      type: "info",
      title: "Payments Approval for Flexible",
      message: "2 pending payment approvals waiting",
      timestamp: "21 OCT 9:28 PM",
      read: true,
    },
    {
      id: "4",
      type: "success",
      title: "Payments Approval for Target Achievers",
      message: "3 payments have been approved successfully",
      timestamp: "30 OCT 3:52 PM",
      read: true,
    },
    {
      id: "5",
      type: "warning",
      title: "Account suspended",
      message: "User account has been suspended due to inactivity",
      timestamp: "02 NOV 2:15 PM",
      read: false,
    },
  ])

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <div className="w-3 h-3 bg-green-500 rounded-full" />
      case "warning":
        return <AlertCircle size={20} className="text-yellow-500" />
      case "error":
        return <div className="w-3 h-3 bg-red-500 rounded-full" />
      case "info":
        return <Info size={20} className="text-blue-500" />
      default:
        return null
    }
  }

  const getBgColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-l-4 border-green-500"
      case "warning":
        return "bg-yellow-50 border-l-4 border-yellow-500"
      case "error":
        return "bg-red-50 border-l-4 border-red-500"
      case "info":
        return "bg-blue-50 border-l-4 border-blue-500"
      default:
        return "bg-gray-50"
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-foreground">Notifications & Complains</h1>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {notifications.filter((n) => !n.read).length} unread
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg ${getBgColor(notification.type)} ${!notification.read ? "ring-1 ring-offset-0 ring-primary/20" : ""}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1">{getIcon(notification.type)}</div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{notification.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">{notification.timestamp}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                          title="Mark as read"
                        >
                          <Check size={18} className="text-primary" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <X size={18} className="text-destructive" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {notifications.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No notifications at this time</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
