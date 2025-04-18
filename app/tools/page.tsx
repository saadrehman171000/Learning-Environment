"use client"

import { useState } from "react"
import Link from "next/link"
import Navigation from "@/components/navigation/navigation"
import NotificationToast from "@/components/ui/notification-toast"
import styles from "./tools.module.css"

type Tool = {
  id: string
  name: string
  description: string
  icon: string
  category: "study" | "productivity" | "reference" | "practice"
  isNew?: boolean
  isPremium?: boolean
}

export default function ToolsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")

  const tools: Tool[] = [
    {
      id: "flashcards",
      name: "Flashcards",
      description: "Create and study with digital flashcards to memorize key concepts and terms.",
      icon: "🗃️",
      category: "study",
      isNew: true,
    },
    {
      id: "notes",
      name: "Smart Notes",
      description: "Take organized notes with automatic categorization and search capabilities.",
      icon: "📝",
      category: "study",
    },
    {
      id: "pomodoro",
      name: "Pomodoro Timer",
      description: "Stay focused with timed study sessions and breaks using the Pomodoro technique.",
      icon: "⏱️",
      category: "productivity",
    },
    {
      id: "mindmap",
      name: "Mind Mapping",
      description: "Create visual mind maps to connect concepts and organize your thoughts.",
      icon: "🧠",
      category: "study",
      isPremium: true,
    },
    {
      id: "dictionary",
      name: "Learning Dictionary",
      description: "Look up definitions and explanations for course-specific terminology.",
      icon: "📚",
      category: "reference",
    },
    {
      id: "calculator",
      name: "Formula Calculator",
      description: "Solve complex equations and formulas with step-by-step explanations.",
      icon: "🧮",
      category: "reference",
    },
    {
      id: "quiz-generator",
      name: "Quiz Generator",
      description: "Generate practice quizzes based on your learning materials and past performance.",
      icon: "❓",
      category: "practice",
      isNew: true,
    },
    {
      id: "code-playground",
      name: "Code Playground",
      description: "Practice coding with an interactive editor that supports multiple programming languages.",
      icon: "💻",
      category: "practice",
    },
    {
      id: "study-planner",
      name: "Study Planner",
      description: "Plan your study sessions and track your progress with a customizable calendar.",
      icon: "📅",
      category: "productivity",
    },
    {
      id: "citation",
      name: "Citation Generator",
      description: "Generate properly formatted citations for your research and assignments.",
      icon: "📄",
      category: "reference",
      isPremium: true,
    },
  ]

  const categories = [
    { id: "all", name: "All Tools", icon: "🧰" },
    { id: "study", name: "Study Tools", icon: "📚" },
    { id: "productivity", name: "Productivity", icon: "⚡" },
    { id: "reference", name: "Reference", icon: "📖" },
    { id: "practice", name: "Practice", icon: "🏋️" },
  ]

  const filteredTools = tools.filter((tool) => {
    const matchesCategory = activeCategory === "all" || tool.category === activeCategory
    const matchesSearch =
      searchQuery === "" ||
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  return (
    <main className={styles.main}>
      <Navigation />
      <NotificationToast />

      <div className="page-container">
        <div className="container">
          <div className={styles.toolsHeader}>
            <h1 className={styles.title}>
              Learning <span className={styles.highlight}>Tools</span>
            </h1>
            <p className={styles.subtitle}>Enhance your learning experience with these specialized tools</p>
          </div>

          <div className={styles.toolsControls}>
            <div className={styles.searchBox}>
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            <div className={styles.categories}>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`${styles.categoryButton} ${activeCategory === category.id ? styles.active : ""}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <span className={styles.categoryIcon}>{category.icon}</span>
                  <span className={styles.categoryName}>{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.toolsGrid}>
            {filteredTools.map((tool) => (
              <Link href={`/tools/${tool.id}`} key={tool.id} className={styles.toolCard}>
                <div className={styles.toolHeader}>
                  <div className={styles.toolIcon}>{tool.icon}</div>
                  <div className={styles.toolBadges}>
                    {tool.isNew && <span className={`${styles.badge} ${styles.newBadge}`}>New</span>}
                    {tool.isPremium && <span className={`${styles.badge} ${styles.premiumBadge}`}>Premium</span>}
                  </div>
                </div>
                <h3 className={styles.toolName}>{tool.name}</h3>
                <p className={styles.toolDescription}>{tool.description}</p>
                <div className={styles.toolFooter}>
                  <span className={styles.toolCategory}>
                    {categories.find((c) => c.id === tool.category)?.icon}{" "}
                    {categories.find((c) => c.id === tool.category)?.name}
                  </span>
                  <span className={styles.toolAction}>Open →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
