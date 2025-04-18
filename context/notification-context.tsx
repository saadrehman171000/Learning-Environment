"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type Notification = {
  id: string
  type: "success" | "error" | "info" | "warning"
  message: string
  title?: string
  autoClose?: boolean
  duration?: number
}

type NotificationContextType = {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, "id">) => void
  removeNotification: (id: string) => void
  clearAllNotifications: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  // Update the addNotification function to prevent duplicate notifications
  const addNotification = (notification: Omit<Notification, "id">) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newNotification = {
      id,
      autoClose: true,
      duration: 5000,
      ...notification,
    }

    setNotifications((prev) => {
      // Check if notification with same message already exists
      const exists = prev.some((n) => n.message === notification.message && n.type === notification.type)
      if (exists) return prev
      return [...prev, newNotification]
    })

    // Auto close notification is handled in the NotificationItem component now
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        clearAllNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider")
  }
  return context
}
