"use client"

import { useState } from "react"
import Navigation from "@/components/navigation/navigation"
import { useUserProgress } from "@/context/user-progress-context"
import { LEARNING_MODULES } from "@/data/modules"
import styles from "./progress.module.css"

export default function ProgressPage() {
  const { userProgress } = useUserProgress()
  const [activeTab, setActiveTab] = useState<"overview" | "modules" | "badges">("overview")

  // Calculate overall completion percentage
  const totalModules = LEARNING_MODULES.length
  const completedModules = userProgress.completedModules.length
  const completionPercentage = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0

  // Get modules with progress
  const modulesWithProgress = LEARNING_MODULES.map((module) => {
    const progress = userProgress.moduleProgress[module.id] || {
      completed: false,
      score: 0,
      lastAccessed: new Date(0),
    }

    return {
      ...module,
      progress,
    }
  })

  // Sort modules by last accessed
  const sortedModules = [...modulesWithProgress].sort((a, b) => {
    return new Date(b.progress.lastAccessed).getTime() - new Date(a.progress.lastAccessed).getTime()
  })

  return (
    <main className={styles.main}>
      <Navigation />

      <div className={styles.container}>
        <h1 className={styles.title}>My Learning Progress</h1>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === "overview" ? styles.active : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`${styles.tab} ${activeTab === "modules" ? styles.active : ""}`}
            onClick={() => setActiveTab("modules")}
          >
            Modules
          </button>
          <button
            className={`${styles.tab} ${activeTab === "badges" ? styles.active : ""}`}
            onClick={() => setActiveTab("badges")}
          >
            Badges
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === "overview" && (
            <div className={styles.overview}>
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <h3 className={styles.statTitle}>Level</h3>
                  <div className={styles.statValue}>{userProgress.level}</div>
                  <div className={styles.statDescription}>{userProgress.totalScore} total points</div>
                </div>

                <div className={styles.statCard}>
                  <h3 className={styles.statTitle}>Completion</h3>
                  <div className={styles.statValue}>{completionPercentage}%</div>
                  <div className={styles.statDescription}>
                    {completedModules} of {totalModules} modules
                  </div>
                </div>

                <div className={styles.statCard}>
                  <h3 className={styles.statTitle}>Streak</h3>
                  <div className={styles.statValue}>{userProgress.streak}</div>
                  <div className={styles.statDescription}>days in a row</div>
                </div>

                <div className={styles.statCard}>
                  <h3 className={styles.statTitle}>Badges</h3>
                  <div className={styles.statValue}>{userProgress.badges.filter((b) => b.earned).length}</div>
                  <div className={styles.statDescription}>earned so far</div>
                </div>
              </div>

              <div className={styles.recentActivity}>
                <h2 className={styles.sectionTitle}>Recent Activity</h2>
                {sortedModules.length > 0 ? (
                  <div className={styles.activityList}>
                    {sortedModules.slice(0, 5).map((module) => (
                      <div key={module.id} className={styles.activityItem}>
                        <div className={styles.activityIcon}>{module.icon}</div>
                        <div className={styles.activityDetails}>
                          <h3 className={styles.activityTitle}>{module.title}</h3>
                          <p className={styles.activityStatus}>
                            {module.progress.completed
                              ? `Completed with score: ${module.progress.score}%`
                              : "In progress"}
                          </p>
                        </div>
                        <div className={styles.activityDate}>{formatDate(module.progress.lastAccessed)}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.emptyState}>
                    <p>No activity yet. Start learning to see your progress!</p>
                  </div>
                )}
              </div>

              <div className={styles.recommendations}>
                <h2 className={styles.sectionTitle}>Recommended Next Steps</h2>
                <div className={styles.recommendationList}>
                  {getRecommendations(userProgress, LEARNING_MODULES).map((module) => (
                    <div key={module.id} className={styles.recommendationItem}>
                      <div className={styles.recommendationIcon}>{module.icon}</div>
                      <div className={styles.recommendationDetails}>
                        <h3 className={styles.recommendationTitle}>{module.title}</h3>
                        <p className={styles.recommendationReason}>{module.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "modules" && (
            <div className={styles.modules}>
              <div className={styles.moduleList}>
                {LEARNING_MODULES.map((module) => {
                  const moduleProgress = userProgress.moduleProgress[module.id]
                  const isCompleted = userProgress.completedModules.includes(module.id)

                  return (
                    <div key={module.id} className={styles.moduleItem}>
                      <div className={styles.moduleHeader}>
                        <div className={styles.moduleIcon}>{module.icon}</div>
                        <h3 className={styles.moduleTitle}>{module.title}</h3>
                        <div className={`${styles.moduleStatus} ${isCompleted ? styles.completed : ""}`}>
                          {isCompleted ? "Completed" : "Not completed"}
                        </div>
                      </div>

                      <div className={styles.moduleProgressBar}>
                        <div className={styles.progressFill} style={{ width: `${moduleProgress?.score || 0}%` }}></div>
                      </div>

                      <div className={styles.moduleDetails}>
                        <div className={styles.moduleDetail}>
                          <span className={styles.detailLabel}>Score:</span>
                          <span className={styles.detailValue}>{moduleProgress?.score || 0}%</span>
                        </div>
                        <div className={styles.moduleDetail}>
                          <span className={styles.detailLabel}>Last accessed:</span>
                          <span className={styles.detailValue}>
                            {moduleProgress?.lastAccessed ? formatDate(moduleProgress.lastAccessed) : "Never"}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {activeTab === "badges" && (
            <div className={styles.badges}>
              <div className={styles.badgeGrid}>
                {userProgress.badges
                  .filter((badge) => badge.earned)
                  .map((badge) => (
                    <div key={badge.id} className={styles.badgeCard}>
                      <div className={styles.badgeIcon}>🏆</div>
                      <h3 className={styles.badgeTitle}>{badge.title}</h3>
                      <p className={styles.badgeDescription}>{badge.description}</p>
                      <div className={styles.badgeEarned}>Earned on {formatDate(badge.earnedDate!)}</div>
                    </div>
                  ))}

                {userProgress.badges.filter((badge) => badge.earned).length === 0 && (
                  <div className={styles.emptyState}>
                    <p>You haven't earned any badges yet. Complete modules and quizzes to earn badges!</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

// Helper function to format dates
function formatDate(date: Date): string {
  if (!date) return "Unknown"

  const now = new Date()
  const diff = now.getTime() - new Date(date).getTime()

  // Less than a day
  if (diff < 24 * 60 * 60 * 1000) {
    return "Today"
  }

  // Less than 2 days
  if (diff < 2 * 24 * 60 * 60 * 1000) {
    return "Yesterday"
  }

  // Less than a week
  if (diff < 7 * 24 * 60 * 60 * 1000) {
    return `${Math.floor(diff / (24 * 60 * 60 * 1000))} days ago`
  }

  // Format as date
  return new Date(date).toLocaleDateString()
}

// Helper function to generate personalized recommendations
function getRecommendations(userProgress: any, modules: any[]) {
  const recommendations: any[] = []

  // Find modules not started yet
  const notStartedModules = modules.filter((module) => !userProgress.moduleProgress[module.id])

  // Find modules in progress
  const inProgressModules = modules.filter(
    (module) => userProgress.moduleProgress[module.id] && !userProgress.completedModules.includes(module.id),
  )

  // Find modules with low scores
  const lowScoreModules = modules.filter(
    (module) =>
      userProgress.moduleProgress[module.id] &&
      userProgress.moduleProgress[module.id].score < 70 &&
      userProgress.completedModules.includes(module.id),
  )

  // Add a module in progress
  if (inProgressModules.length > 0) {
    recommendations.push({
      ...inProgressModules[0],
      reason: "Continue where you left off",
    })
  }

  // Add a not started module
  if (notStartedModules.length > 0) {
    recommendations.push({
      ...notStartedModules[0],
      reason: "New content to explore",
    })
  }

  // Add a module to improve score
  if (lowScoreModules.length > 0) {
    recommendations.push({
      ...lowScoreModules[0],
      reason: "Improve your score on this module",
    })
  }

  // If we don't have 3 recommendations yet, add more not started modules
  while (
    recommendations.length < 3 &&
    notStartedModules.length > recommendations.length - inProgressModules.length - lowScoreModules.length
  ) {
    const nextModule = notStartedModules[recommendations.length - inProgressModules.length - lowScoreModules.length]
    if (nextModule && !recommendations.some((r) => r.id === nextModule.id)) {
      recommendations.push({
        ...nextModule,
        reason: "Suggested based on your interests",
      })
    } else {
      break
    }
  }

  return recommendations
}
