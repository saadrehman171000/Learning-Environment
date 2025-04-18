"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Navigation from "@/components/navigation/navigation"
import NotificationToast from "@/components/ui/notification-toast"
import { useUserProgress } from "@/context/user-progress-context"
import { useNotification } from "@/context/notification-context"
import { LEARNING_MODULES } from "@/data/modules"
import styles from "./dashboard.module.css"

export default function DashboardPage() {
  const { userProgress } = useUserProgress()
  const { addNotification } = useNotification()
  const [greeting, setGreeting] = useState("Good day")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Set greeting based on time of day
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good morning")
    else if (hour < 18) setGreeting("Good afternoon")
    else setGreeting("Good evening")

    // Welcome notification - only show once when component mounts
    if (!mounted) {
      addNotification({
        type: "info",
        title: "Welcome back!",
        message: "Continue your learning journey where you left off.",
      })
    }
  }, [addNotification, mounted])

  if (!mounted) return null

  // Get recent modules
  const recentModules = LEARNING_MODULES.filter((module) => userProgress.moduleProgress[module.id])
    .sort((a, b) => {
      const dateA = new Date(userProgress.moduleProgress[a.id]?.lastAccessed || 0).getTime()
      const dateB = new Date(userProgress.moduleProgress[b.id]?.lastAccessed || 0).getTime()
      return dateB - dateA
    })
    .slice(0, 3)

  // Get recommended modules
  const recommendedModules = LEARNING_MODULES.filter(
    (module) => !userProgress.completedModules.includes(module.id),
  ).slice(0, 3)

  // Get daily challenges
  const dailyChallenges = [
    {
      id: "challenge-1",
      title: "Complete a quiz",
      description: "Take and complete any quiz in your learning modules",
      reward: "50 XP",
      completed: false,
    },
    {
      id: "challenge-2",
      title: "Study streak",
      description: "Log in for 3 consecutive days",
      reward: "Badge: Consistent Learner",
      completed: userProgress.streak >= 3,
    },
    {
      id: "challenge-3",
      title: "Perfect score",
      description: "Get 100% on any quiz",
      reward: "100 XP + Badge",
      completed: userProgress.badges.some((b) => b.id === "perfect-score" && b.earned),
    },
  ]

  return (
    <main className={styles.main}>
      <Navigation />
      <NotificationToast />

      <div className="page-container">
        <div className="container">
          <div className={styles.dashboardHeader}>
            <div className={styles.welcomeSection}>
              <h1 className={styles.greeting}>
                {greeting}, <span className="gradient-text">Learner</span>
              </h1>
              <p className={styles.welcomeMessage}>
                You're on a {userProgress.streak} day streak! Keep up the good work.
              </p>
            </div>

            <div className={styles.userStats}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className={styles.statInfo}>
                  <span className={styles.statValue}>{userProgress.totalScore}</span>
                  <span className={styles.statLabel}>Total Points</span>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2V2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className={styles.statInfo}>
                  <span className={styles.statValue}>{userProgress.completedModules.length}</span>
                  <span className={styles.statLabel}>Completed Modules</span>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className={styles.statInfo}>
                  <span className={styles.statValue}>{userProgress.badges.filter((b) => b.earned).length}</span>
                  <span className={styles.statLabel}>Badges Earned</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.dashboardGrid}>
            <div className={styles.mainContent}>
              <section className={styles.continueSection}>
                <div className={styles.sectionHeader}>
                  <h2>Continue Learning</h2>
                  <Link href="/learn" className={styles.viewAllLink}>
                    View All Courses
                  </Link>
                </div>

                {recentModules.length > 0 ? (
                  <div className={styles.moduleGrid}>
                    {recentModules.map((module) => {
                      const progress = userProgress.moduleProgress[module.id]
                      const isCompleted = userProgress.completedModules.includes(module.id)

                      return (
                        <Link href={`/learn/${module.id}`} key={module.id} className={styles.moduleCard}>
                          <div className={styles.moduleIcon}>
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 2L2 7L12 12L22 7L12 2Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M2 17L12 22L22 17"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M2 12L12 17L22 12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <div className={styles.moduleContent}>
                            <h3>{module.title}</h3>
                            <p>{module.description}</p>
                            <div className={styles.moduleProgress}>
                              <div className={styles.progressBar}>
                                <div
                                  className={styles.progressFill}
                                  style={{ width: `${isCompleted ? 100 : progress?.score || 0}%` }}
                                ></div>
                              </div>
                              <span className={styles.progressText}>
                                {isCompleted ? "Completed" : `${progress?.score || 0}% complete`}
                              </span>
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                ) : (
                  <div className={styles.emptyState}>
                    <p>You haven't started any modules yet. Begin your learning journey today!</p>
                    <Link href="/learn" className="btn btn-primary">
                      Browse Modules
                    </Link>
                  </div>
                )}
              </section>

              <section className={styles.recommendedSection}>
                <div className={styles.sectionHeader}>
                  <h2>Recommended For You</h2>
                </div>

                <div className={styles.recommendedGrid}>
                  {recommendedModules.map((module) => (
                    <Link href={`/learn/${module.id}`} key={module.id} className={styles.recommendedCard}>
                      <div className={styles.recommendedIcon}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M12 2L2 7L12 12L22 7L12 2Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2 17L12 22L22 17"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2 12L12 17L22 12"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className={styles.recommendedContent}>
                        <h3>{module.title}</h3>
                        <p>{module.description}</p>
                        <div className={styles.recommendedMeta}>
                          <span className="badge badge-primary">{module.lessons} lessons</span>
                          <span className="badge badge-secondary">{module.difficulty}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </div>

            <div className={styles.sidebar}>
              <section className={styles.challengesSection}>
                <h2>Daily Challenges</h2>

                <div className={styles.challengesList}>
                  {dailyChallenges.map((challenge) => (
                    <div key={challenge.id} className={styles.challengeCard}>
                      <div className={`${styles.challengeStatus} ${challenge.completed ? styles.completed : ""}`}>
                        {challenge.completed ? "✓" : "○"}
                      </div>
                      <div className={styles.challengeContent}>
                        <h3>{challenge.title}</h3>
                        <p>{challenge.description}</p>
                        <div className={styles.challengeReward}>
                          <span>Reward: {challenge.reward}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className={styles.leaderboardSection}>
                <h2>Leaderboard</h2>

                <div className={styles.leaderboardList}>
                  <div className={styles.leaderboardItem}>
                    <div className={styles.leaderboardRank}>1</div>
                    <div className={styles.leaderboardUser}>
                      <div className={styles.userAvatar}>JS</div>
                      <div className={styles.userName}>Jane Smith</div>
                    </div>
                    <div className={styles.leaderboardScore}>1250 pts</div>
                  </div>

                  <div className={styles.leaderboardItem}>
                    <div className={styles.leaderboardRank}>2</div>
                    <div className={styles.leaderboardUser}>
                      <div className={styles.userAvatar}>JD</div>
                      <div className={styles.userName}>John Doe</div>
                    </div>
                    <div className={styles.leaderboardScore}>1120 pts</div>
                  </div>

                  <div className={styles.leaderboardItem}>
                    <div className={styles.leaderboardRank}>3</div>
                    <div className={styles.leaderboardUser}>
                      <div className={styles.userAvatar}>MJ</div>
                      <div className={styles.userName}>Michael Johnson</div>
                    </div>
                    <div className={styles.leaderboardScore}>980 pts</div>
                  </div>

                  <div className={`${styles.leaderboardItem} ${styles.currentUser}`}>
                    <div className={styles.leaderboardRank}>12</div>
                    <div className={styles.leaderboardUser}>
                      <div className={styles.userAvatar}>ME</div>
                      <div className={styles.userName}>You</div>
                    </div>
                    <div className={styles.leaderboardScore}>{userProgress.totalScore} pts</div>
                  </div>
                </div>

                <Link href="/leaderboard" className={styles.viewAllLink}>
                  View Full Leaderboard
                </Link>
              </section>

              <section className={styles.upcomingSection}>
                <h2>Upcoming Events</h2>

                <div className={styles.eventsList}>
                  <div className={styles.eventCard}>
                    <div className={styles.eventDate}>
                      <span className={styles.eventDay}>15</span>
                      <span className={styles.eventMonth}>May</span>
                    </div>
                    <div className={styles.eventContent}>
                      <h3>Web Development Workshop</h3>
                      <p>Learn advanced React techniques with industry experts</p>
                      <Link href="/events/web-dev-workshop" className={styles.eventLink}>
                        Learn More
                      </Link>
                    </div>
                  </div>

                  <div className={styles.eventCard}>
                    <div className={styles.eventDate}>
                      <span className={styles.eventDay}>22</span>
                      <span className={styles.eventMonth}>May</span>
                    </div>
                    <div className={styles.eventContent}>
                      <h3>Data Science Challenge</h3>
                      <p>Compete with other learners in a 48-hour data challenge</p>
                      <Link href="/events/data-challenge" className={styles.eventLink}>
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
