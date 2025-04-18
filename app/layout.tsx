import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { UserProgressProvider } from "@/context/user-progress-context"
import { ThemeProvider } from "@/context/theme-context"
import { NotificationProvider } from "@/context/notification-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EduVerse - Interactive Learning Environment",
  description: "A technology-enhanced learning environment focused on student engagement and motivation",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <NotificationProvider>
            <UserProgressProvider>{children}</UserProgressProvider>
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
