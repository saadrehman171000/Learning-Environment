"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Navigation from "@/components/navigation/navigation"
import NotificationToast from "@/components/ui/notification-toast"
import { useUserProgress } from "@/context/user-progress-context"
import styles from "./challenges.module.css"

type Challenge = {
  id: string
  title: string
  description: string
  difficulty: "easy" | "medium" | "hard"
  type: "daily" | "weekly" | "special"
  xpReward: number
  badgeReward?: string
  completed: boolean
  progress?: number
  deadline?: string
}

export default function ChallengesPage() {
  const { userProgress } = useUserProgress()
  const [activeTab, setActiveTab] = useState<"all" | "daily" | "weekly" | "special">("all")

  // Mock challenges data
  const challenges: Challenge[] = [
    {
      id: "daily-1",
      title: "Quiz Master",
      description: "Complete 3 quizzes with a score of at least 80%",
      difficulty: "easy",
      type: "daily",
      xpReward: 50,
      completed: false,
      progress: 1,
      deadline: "Today",
    },
    {
      id: "daily-2",
      title: "Study Session",
      description: "Spend at least 30 minutes learning today",
      difficulty: "easy",
      type: "daily",
      xpReward: 30,
      completed: true,
      deadline: "Today",
    },
    {
      id: "weekly-1",
      title: "Module Marathon",
      description: "Complete 2 full learning modules this week",
      difficulty: "medium",
      type: "weekly",
      xpReward: 150,
      badgeReward: "Module Master",
      completed: false,
      progress: 1,
      deadline: "5 days left",
    },
    {
      id: "weekly-2",
      title: "Perfect Score",
      description: "Get 100% on any quiz this week",
      difficulty: "medium",
      type: "weekly",
      xpReward: 100,
      completed: userProgress.badges.some((b) => b.id === "perfect-score" && b.earned),
      deadline: "5 days left",
    },
    {
      id: "special-1",
      title: "Community Contributor",
      description: "Post 3 helpful responses in the community forum",
      difficulty: "hard",
      type: "special",
      xpReward: 200,
      badgeReward: "Helpful Hand",
      completed: false,
      progress: 1,
      deadline: "Ongoing",
    },
    {
      id: "special-2",
      title: "Learning Streak",
      description: "Maintain a 7-day learning streak",
      difficulty: "hard",
      type: "special",
      xpReward: 250,
      badgeReward: "Dedicated Learner",
      completed: userProgress.streak >= 7,
      progress: userProgress.streak,
      deadline: "Ongoing",
    },
  ]

  const filteredChallenges =
    activeTab === "all" ? challenges : challenges.filter((challenge) => challenge.type === activeTab)

  const completedChallenges = filteredChallenges.filter((challenge) => challenge.completed)
  const completionRate = Math.round((completedChallenges.length / filteredChallenges.length) * 100) || 0

  return (
    <main className={styles.main}>
      <Navigation />
      <NotificationToast />

      <div className="page-container">
        <div className="container">
          <div className={styles.challengesHeader}>
            <div>
              <h1 className={styles.title}>Challenges</h1>
              <p className={styles.subtitle}>Complete challenges to earn XP, badges, and climb the leaderboard</p>
            </div>

            <div className={styles.progressOverview}>
              <div
                className={styles.progressCircle}
                style={{ "--progress": `${completionRate}%` } as React.CSSProperties}
              >
                <div className={styles.progressInner}>
                  <span className={styles.progressValue}>{completionRate}%</span>
                  <span className={styles.progressLabel}>Completed</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.challengesTabs}>
            <button
              className={`${styles.tab} ${activeTab === "all" ? styles.active : ""}`}
              onClick={() => setActiveTab("all")}
            >
              All Challenges
            </button>
            <button
              className={`${styles.tab} ${activeTab === "daily" ? styles.active : ""}`}
              onClick={() => setActiveTab("daily")}
            >
              Daily
            </button>
            <button
              className={`${styles.tab} ${activeTab === "weekly" ? styles.active : ""}`}
              onClick={() => setActiveTab("weekly")}
            >
              Weekly
            </button>
            <button
              className={`${styles.tab} ${activeTab === "special" ? styles.active : ""}`}
              onClick={() => setActiveTab("special")}
            >
              Special
            </button>
          </div>

          <div className={styles.challengesGrid}>
            {filteredChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className={`${styles.challengeCard} ${challenge.completed ? styles.completed : ""}`}
              >
                <div className={styles.challengeHeader}>
                  <div className={styles.challengeType}>
                    <span
                      className={`badge ${
                        challenge.type === "daily"
                          ? "badge-primary"
                          : challenge.type === "weekly"
                            ? "badge-secondary"
                            : "badge-accent"
                      }`}
                    >
                      {challenge.type}
                    </span>
                    <span
                      className={`badge ${
                        challenge.difficulty === "easy"
                          ? "badge-success"
                          : challenge.difficulty === "medium"
                            ? "badge-warning"
                            : "badge-accent"
                      }`}
                    >
                      {challenge.difficulty}
                    </span>
                  </div>
                  <div className={styles.challengeStatus}>
                    {challenge.completed ? (
                      <span className={styles.completedStatus}>✓ Completed</span>
                    ) : (
                      <span className={styles.pendingStatus}>In Progress</span>
                    )}
                  </div>
                </div>

                <h3 className={styles.challengeTitle}>{challenge.title}</h3>
                <p className={styles.challengeDescription}>{challenge.description}</p>

                {challenge.progress !== undefined && !challenge.completed && (
                  <div className={styles.challengeProgress}>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{ width: `${(challenge.progress / 3) * 100}%` }}
                      ></div>
                    </div>
                    <span className={styles.progressText}>{challenge.progress}/3</span>
                  </div>
                )}

                <div className={styles.challengeFooter}>
                  <div className={styles.challengeRewards}>
                    <div className={styles.xpReward}>
                      <span className={styles.xpIcon}>⭐</span>
                      <span>{challenge.xpReward} XP</span>
                    </div>
                    {challenge.badgeReward && (
                      <div className={styles.badgeReward}>
                        <span className={styles.badgeIcon}>🏆</span>
                        <span>{challenge.badgeReward}</span>
                      </div>
                    )}
                  </div>

                  <div className={styles.challengeDeadline}>
                    <span className={styles.deadlineIcon}>⏱️</span>
                    <span>{challenge.deadline}</span>
                  </div>
                </div>

                {!challenge.completed && (
                  <Link
                    href={challenge.type === "special" && challenge.id === "special-1" ? "/community" : "/learn"}
                    className={styles.challengeAction}
                  >
                    {challenge.type === "special" && challenge.id === "special-1"
                      ? "Go to Community"
                      : "Start Learning"}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
