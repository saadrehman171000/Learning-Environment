"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type ModuleProgress = {
  id: string
  title: string
  completed: boolean
  score: number
  lastAccessed: Date
}

export type Badge = {
  id: string
  title: string
  description: string
  earned: boolean
  earnedDate?: Date
}

export type UserProgress = {
  completedModules: string[]
  moduleProgress: Record<string, ModuleProgress>
  totalScore: number
  level: number
  badges: Badge[]
  streak: number
  lastActive: Date
}

type UserProgressContextType = {
  userProgress: UserProgress
  updateModuleProgress: (moduleId: string, progress: Partial<ModuleProgress>) => void
  completeModule: (moduleId: string, score: number) => void
  earnBadge: (badgeId: string) => void
  resetProgress: () => void
}

const defaultUserProgress: UserProgress = {
  completedModules: [],
  moduleProgress: {},
  totalScore: 0,
  level: 1,
  badges: [],
  streak: 0,
  lastActive: new Date(),
}

const UserProgressContext = createContext<UserProgressContextType | undefined>(undefined)

export function UserProgressProvider({ children }: { children: ReactNode }) {
  const [userProgress, setUserProgress] = useState<UserProgress>(defaultUserProgress)

  // Load progress from localStorage on initial render
  useEffect(() => {
    const savedProgress = localStorage.getItem("userProgress")
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress)
        // Convert string dates back to Date objects
        if (parsed.lastActive) {
          parsed.lastActive = new Date(parsed.lastActive)
        }
        if (parsed.moduleProgress) {
          Object.keys(parsed.moduleProgress).forEach((key) => {
            if (parsed.moduleProgress[key].lastAccessed) {
              parsed.moduleProgress[key].lastAccessed = new Date(parsed.moduleProgress[key].lastAccessed)
            }
          })
        }
        if (parsed.badges) {
          parsed.badges.forEach((badge: Badge) => {
            if (badge.earnedDate) {
              badge.earnedDate = new Date(badge.earnedDate)
            }
          })
        }
        setUserProgress(parsed)
      } catch (error) {
        console.error("Failed to parse saved progress:", error)
      }
    }
  }, [])

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("userProgress", JSON.stringify(userProgress))
  }, [userProgress])

  // Update streak based on daily activity
  useEffect(() => {
    const today = new Date()
    const lastActive = userProgress.lastActive

    // Check if last active was yesterday
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (lastActive.toDateString() === yesterday.toDateString()) {
      // User was active yesterday, increment streak
      setUserProgress((prev) => ({
        ...prev,
        streak: prev.streak + 1,
        lastActive: today,
      }))
    } else if (lastActive.toDateString() !== today.toDateString()) {
      // User wasn't active yesterday or today yet, reset streak
      setUserProgress((prev) => ({
        ...prev,
        streak: 1,
        lastActive: today,
      }))
    }
  }, [])

  const updateModuleProgress = (moduleId: string, progress: Partial<ModuleProgress>) => {
    setUserProgress((prev) => {
      const currentModuleProgress = prev.moduleProgress[moduleId] || {
        id: moduleId,
        title: "",
        completed: false,
        score: 0,
        lastAccessed: new Date(),
      }

      return {
        ...prev,
        moduleProgress: {
          ...prev.moduleProgress,
          [moduleId]: {
            ...currentModuleProgress,
            ...progress,
            lastAccessed: new Date(),
          },
        },
      }
    })
  }

  const completeModule = (moduleId: string, score: number) => {
    setUserProgress((prev) => {
      // Check if module was already completed
      const alreadyCompleted = prev.completedModules.includes(moduleId)
      const oldScore = alreadyCompleted && prev.moduleProgress[moduleId] ? prev.moduleProgress[moduleId].score : 0

      // Calculate new total score
      const scoreDifference = score - oldScore
      const newTotalScore = prev.totalScore + scoreDifference

      // Calculate new level (1 level per 100 points)
      const newLevel = Math.floor(newTotalScore / 100) + 1

      return {
        ...prev,
        completedModules: alreadyCompleted ? prev.completedModules : [...prev.completedModules, moduleId],
        moduleProgress: {
          ...prev.moduleProgress,
          [moduleId]: {
            ...prev.moduleProgress[moduleId],
            id: moduleId,
            completed: true,
            score,
            lastAccessed: new Date(),
          },
        },
        totalScore: newTotalScore,
        level: newLevel,
        lastActive: new Date(),
      }
    })
  }

  const earnBadge = (badgeId: string) => {
    setUserProgress((prev) => {
      // Check if badge already exists
      const existingBadgeIndex = prev.badges.findIndex((b) => b.id === badgeId)

      if (existingBadgeIndex >= 0 && prev.badges[existingBadgeIndex].earned) {
        // Badge already earned, no change
        return prev
      }

      // Get badge details from predefined list (in a real app, this would come from a database)
      const badgeDetails = AVAILABLE_BADGES.find((b) => b.id === badgeId)

      if (!badgeDetails) {
        console.error(`Badge with ID ${badgeId} not found`)
        return prev
      }

      const updatedBadges = [...prev.badges]

      if (existingBadgeIndex >= 0) {
        // Update existing badge
        updatedBadges[existingBadgeIndex] = {
          ...updatedBadges[existingBadgeIndex],
          earned: true,
          earnedDate: new Date(),
        }
      } else {
        // Add new badge
        updatedBadges.push({
          ...badgeDetails,
          earned: true,
          earnedDate: new Date(),
        })
      }

      return {
        ...prev,
        badges: updatedBadges,
      }
    })
  }

  const resetProgress = () => {
    setUserProgress(defaultUserProgress)
    localStorage.removeItem("userProgress")
  }

  return (
    <UserProgressContext.Provider
      value={{
        userProgress,
        updateModuleProgress,
        completeModule,
        earnBadge,
        resetProgress,
      }}
    >
      {children}
    </UserProgressContext.Provider>
  )
}

export function useUserProgress() {
  const context = useContext(UserProgressContext)
  if (context === undefined) {
    throw new Error("useUserProgress must be used within a UserProgressProvider")
  }
  return context
}

// Predefined badges (in a real app, these would come from a database)
const AVAILABLE_BADGES = [
  {
    id: "first-module",
    title: "First Steps",
    description: "Complete your first learning module",
    earned: false,
  },
  {
    id: "perfect-score",
    title: "Perfect Score",
    description: "Get 100% on a quiz",
    earned: false,
  },
  {
    id: "streak-3",
    title: "On Fire",
    description: "Maintain a 3-day learning streak",
    earned: false,
  },
  {
    id: "streak-7",
    title: "Dedicated Learner",
    description: "Maintain a 7-day learning streak",
    earned: false,
  },
  {
    id: "five-modules",
    title: "Knowledge Seeker",
    description: "Complete 5 learning modules",
    earned: false,
  },
]
