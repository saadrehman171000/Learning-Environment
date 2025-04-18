"use client"

import { useState } from "react"
import Link from "next/link"
import Navigation from "@/components/navigation/navigation"
import NotificationToast from "@/components/ui/notification-toast"
import { useUserProgress } from "@/context/user-progress-context"
import { useTheme } from "@/context/theme-context"
import { useNotification } from "@/context/notification-context"
import styles from "./profile.module.css"

export default function ProfilePage() {
  const { userProgress, resetProgress } = useUserProgress()
  const { theme, setTheme } = useTheme()
  const { addNotification } = useNotification()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Passionate learner interested in web development and data science.",
    avatar: "JD",
  })

  const handleSaveProfile = () => {
    setIsEditing(false)
    addNotification({
      type: "success",
      title: "Profile Updated",
      message: "Your profile information has been updated successfully.",
      autoClose: true,
    })
  }

  const handleResetProgress = () => {
    if (window.confirm("Are you sure you want to reset all your progress? This action cannot be undone.")) {
      resetProgress()
      addNotification({
        type: "info",
        title: "Progress Reset",
        message: "Your learning progress has been reset successfully.",
        autoClose: true,
      })
    }
  }

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme)
    addNotification({
      type: "success",
      title: "Theme Changed",
      message: `Theme has been changed to ${newTheme}.`,
      autoClose: true,
    })
  }

  return (
    <main className={styles.main}>
      <Navigation />
      <NotificationToast />

      <div className="page-container">
        <div className="container">
          <div className={styles.profileHeader}>
            <h1 className={styles.title}>My Profile</h1>
            <p className={styles.subtitle}>Manage your account settings and view your learning progress</p>
          </div>

          <div className={styles.profileGrid}>
            <div className={styles.profileSidebar}>
              <div className={styles.profileCard}>
                <div className={styles.avatarLarge}>{profileData.avatar}</div>
                <h2 className={styles.profileName}>{profileData.name}</h2>
                <p className={styles.profileEmail}>{profileData.email}</p>
                <div className={styles.profileStats}>
                  <div className={styles.profileStat}>
                    <span className={styles.statValue}>{userProgress.level}</span>
                    <span className={styles.statLabel}>Level</span>
                  </div>
                  <div className={styles.profileStat}>
                    <span className={styles.statValue}>{userProgress.totalScore}</span>
                    <span className={styles.statLabel}>Points</span>
                  </div>
                  <div className={styles.profileStat}>
                    <span className={styles.statValue}>{userProgress.streak}</span>
                    <span className={styles.statLabel}>Day Streak</span>
                  </div>
                </div>
                <div className={styles.profileBio}>
                  <h3>About</h3>
                  <p>{profileData.bio}</p>
                </div>
                <button className={styles.editProfileButton} onClick={() => setIsEditing(!isEditing)}>
                  {isEditing ? "Cancel Editing" : "Edit Profile"}
                </button>
              </div>

              <div className={styles.profileLinks}>
                <Link href="/progress" className={styles.profileLink}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M18 20V10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 20V4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 20V14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  View Learning Progress
                </Link>
                <Link href="/challenges" className={styles.profileLink}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                  View Achievements
                </Link>
                <Link href="/tools" className={styles.profileLink}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Learning Tools
                </Link>
              </div>
            </div>

            <div className={styles.profileContent}>
              {isEditing ? (
                <div className={styles.editProfileForm}>
                  <h2>Edit Profile</h2>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className={styles.formInput}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className={styles.formInput}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="avatar">Avatar Initials</label>
                    <input
                      type="text"
                      id="avatar"
                      value={profileData.avatar}
                      onChange={(e) => setProfileData({ ...profileData, avatar: e.target.value.substring(0, 2) })}
                      className={styles.formInput}
                      maxLength={2}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="bio">Bio</label>
                    <textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      className={styles.formTextarea}
                      rows={4}
                    />
                  </div>
                  <div className={styles.formActions}>
                    <button className={styles.saveButton} onClick={handleSaveProfile}>
                      Save Changes
                    </button>
                    <button className={styles.cancelButton} onClick={() => setIsEditing(false)}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className={styles.settingsSection}>
                    <h2>Account Settings</h2>
                    <div className={styles.settingsCard}>
                      <h3>Theme Preferences</h3>
                      <p>Choose your preferred theme for the learning platform.</p>
                      <div className={styles.themeOptions}>
                        <button
                          className={`${styles.themeButton} ${theme === "light" ? styles.active : ""}`}
                          onClick={() => handleThemeChange("light")}
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 1V3"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 21V23"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M4.22 4.22L5.64 5.64"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M18.36 18.36L19.78 19.78"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M1 12H3"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M21 12H23"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M4.22 19.78L5.64 18.36"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M18.36 5.64L19.78 4.22"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          Light
                        </button>
                        <button
                          className={`${styles.themeButton} ${theme === "dark" ? styles.active : ""}`}
                          onClick={() => handleThemeChange("dark")}
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          Dark
                        </button>
                        <button
                          className={`${styles.themeButton} ${theme === "system" ? styles.active : ""}`}
                          onClick={() => handleThemeChange("system")}
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2 13.381h20M8.66 19.05V22m6.84-2.95V22m-8.955-8.57l-1.414 1.414M17.01 6.65l1.414 1.414M12 5.05V2m7.05 5.05l2.121-2.121M4.929 4.929L7.05 7.05M12 19.05H7.05a2 2 0 0 1-2-2V12m14 5.05H17a2 2 0 0 1-2-2V12m0 0V7a2 2 0 0 1 2-2h1.05M5.05 12V7a2 2 0 0 1 2-2h1.05"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          System
                        </button>
                      </div>
                    </div>

                    <div className={styles.settingsCard}>
                      <h3>Notification Preferences</h3>
                      <p>Manage how and when you receive notifications.</p>
                      <div className={styles.notificationOptions}>
                        <div className={styles.notificationOption}>
                          <div>
                            <h4>Learning Reminders</h4>
                            <p>Daily reminders to continue your learning journey</p>
                          </div>
                          <label className={styles.toggle}>
                            <input type="checkbox" defaultChecked />
                            <span className={styles.slider}></span>
                          </label>
                        </div>
                        <div className={styles.notificationOption}>
                          <div>
                            <h4>Achievement Alerts</h4>
                            <p>Notifications when you earn badges or complete milestones</p>
                          </div>
                          <label className={styles.toggle}>
                            <input type="checkbox" defaultChecked />
                            <span className={styles.slider}></span>
                          </label>
                        </div>
                        <div className={styles.notificationOption}>
                          <div>
                            <h4>New Content</h4>
                            <p>Updates when new courses or modules are available</p>
                          </div>
                          <label className={styles.toggle}>
                            <input type="checkbox" defaultChecked />
                            <span className={styles.slider}></span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className={styles.settingsCard}>
                      <h3>Privacy Settings</h3>
                      <p>Control your data and privacy preferences.</p>
                      <div className={styles.privacyOptions}>
                        <div className={styles.privacyOption}>
                          <div>
                            <h4>Public Profile</h4>
                            <p>Allow other learners to see your profile and progress</p>
                          </div>
                          <label className={styles.toggle}>
                            <input type="checkbox" defaultChecked />
                            <span className={styles.slider}></span>
                          </label>
                        </div>
                        <div className={styles.privacyOption}>
                          <div>
                            <h4>Leaderboard Visibility</h4>
                            <p>Show your name and score on public leaderboards</p>
                          </div>
                          <label className={styles.toggle}>
                            <input type="checkbox" defaultChecked />
                            <span className={styles.slider}></span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className={styles.dangerZone}>
                      <h3>Danger Zone</h3>
                      <div className={styles.dangerCard}>
                        <div>
                          <h4>Reset Learning Progress</h4>
                          <p>
                            This will reset all your progress, badges, and achievements. This action cannot be undone.
                          </p>
                        </div>
                        <button className={styles.dangerButton} onClick={handleResetProgress}>
                          Reset Progress
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
