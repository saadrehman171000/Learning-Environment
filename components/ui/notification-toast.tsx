"use client"

import { useEffect, useState, useRef } from "react"
import { useNotification, type Notification } from "@/context/notification-context"
import styles from "./notification-toast.module.css"

export default function NotificationToast() {
  const { notifications, removeNotification } = useNotification()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className={styles.notificationContainer}>
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  )
}

function NotificationItem({
  notification,
  onClose,
}: {
  notification: Notification
  onClose: () => void
}) {
  const [progress, setProgress] = useState(100)
  const { duration = 5000, autoClose = true } = notification
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!autoClose) return

    // Reset progress when notification changes
    setProgress(100)

    // Clear any existing interval
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }

    // Set up new interval for progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(interval)
          return 0
        }
        return prev - 100 / (duration / 100)
      })
    }, 100)

    progressIntervalRef.current = interval

    // Set timeout for auto-closing
    const timeout = setTimeout(() => {
      onClose()
    }, duration)

    // Clean up on unmount or when notification changes
    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [autoClose, duration, notification.id, onClose])

  const getIcon = () => {
    switch (notification.type) {
      case "success":
        return "✓"
      case "error":
        return "✕"
      case "warning":
        return "⚠"
      case "info":
        return "ℹ"
      default:
        return "ℹ"
    }
  }

  return (
    <div className={`${styles.notification} ${styles[notification.type]}`}>
      <div className={styles.iconContainer}>
        <div className={styles.icon}>{getIcon()}</div>
      </div>
      <div className={styles.content}>
        {notification.title && <h4 className={styles.title}>{notification.title}</h4>}
        <p className={styles.message}>{notification.message}</p>
      </div>
      <button className={styles.closeButton} onClick={onClose}>
        ✕
      </button>
      {autoClose && (
        <div className={styles.progressContainer}>
          <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
        </div>
      )}
    </div>
  )
}
