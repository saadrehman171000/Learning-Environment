"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, notFound } from "next/navigation"
import Navigation from "@/components/navigation/navigation"
import NotificationToast from "@/components/ui/notification-toast"
import { useNotification } from "@/context/notification-context"
import styles from "./tool.module.css"
import { ArrowLeft, Star, Clock, Users } from "lucide-react"

// Mock tool data - in a real app, this would come from a database
const TOOLS = {
  flashcards: {
    id: "flashcards",
    name: "Flashcards",
    description: "Create and study with digital flashcards to memorize key concepts and terms.",
    longDescription:
      "Flashcards are one of the most effective study tools for memorization and recall. Our digital flashcard system allows you to create, organize, and study flashcards across all your devices. With spaced repetition algorithms, we help you focus on the cards you need to review most.",
    icon: "🗃️",
    category: "study",
    features: [
      "Create unlimited flashcard decks",
      "Add text, images, and audio to cards",
      "Spaced repetition algorithm for optimal learning",
      "Study statistics and progress tracking",
      "Import and export flashcard decks",
      "Collaborative deck sharing",
    ],
    isNew: true,
  },
  notes: {
    id: "notes",
    name: "Smart Notes",
    description: "Take organized notes with automatic categorization and search capabilities.",
    longDescription:
      "Our Smart Notes tool helps you capture and organize your thoughts, lecture notes, and study materials in one place. With automatic categorization, powerful search, and rich formatting options, you'll never lose track of important information again.",
    icon: "📝",
    category: "study",
    features: [
      "Rich text editor with formatting options",
      "Automatic categorization and tagging",
      "Full-text search across all notes",
      "Attach files and images to notes",
      "Sync across all devices",
      "Export notes in multiple formats",
    ],
  },
  pomodoro: {
    id: "pomodoro",
    name: "Pomodoro Timer",
    description: "Stay focused with timed study sessions and breaks using the Pomodoro technique.",
    longDescription:
      "The Pomodoro Technique is a time management method that uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks. Our Pomodoro Timer helps you implement this technique to improve focus and productivity during your study sessions.",
    icon: "⏱️",
    category: "productivity",
    features: [
      "Customizable work and break intervals",
      "Session tracking and statistics",
      "Notification sounds and alerts",
      "Daily and weekly productivity reports",
      "Task integration with your to-do list",
      "Distraction blocking during work intervals",
    ],
  },
}

export default function ToolPage() {
  const params = useParams()
  const { addNotification } = useNotification()
  const toolId = params.toolId as string

  // Check if tool exists
  if (!TOOLS[toolId]) {
    notFound()
  }

  const tool = TOOLS[toolId]

  // For flashcards tool
  const [flashcards, setFlashcards] = useState([
    {
      id: 1,
      front: "What is HTML?",
      back: "HyperText Markup Language - the standard markup language for creating web pages",
    },
    {
      id: 2,
      front: "What is CSS?",
      back: "Cascading Style Sheets - used for describing the presentation of a document written in HTML",
    },
    { id: 3, front: "What is JavaScript?", back: "A programming language that enables interactive web pages" },
  ])
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [newCardFront, setNewCardFront] = useState("")
  const [newCardBack, setNewCardBack] = useState("")

  // For notes tool
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Introduction to Web Development",
      content: "Web development involves creating and maintaining websites...",
      tags: ["web", "programming"],
    },
    {
      id: 2,
      title: "CSS Flexbox Notes",
      content: "Flexbox is a one-dimensional layout method for arranging items...",
      tags: ["css", "layout"],
    },
  ])
  const [activeNote, setActiveNote] = useState(notes[0])

  // For pomodoro tool
  const [timerMinutes, setTimerMinutes] = useState(25)
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [timerMode, setTimerMode] = useState<"work" | "break">("work")

  // Handle tool-specific actions
  const handleToolAction = () => {
    addNotification({
      type: "success",
      title: "Tool Action",
      message: `You've successfully used the ${tool.name} tool!`,
      autoClose: true,
    })
  }

  // Add a new flashcard
  const addFlashcard = () => {
    if (newCardFront.trim() === "" || newCardBack.trim() === "") {
      addNotification({
        type: "error",
        message: "Please fill in both sides of the flashcard",
        autoClose: true,
      })
      return
    }

    const newCard = {
      id: flashcards.length + 1,
      front: newCardFront,
      back: newCardBack,
    }

    setFlashcards([...flashcards, newCard])
    setNewCardFront("")
    setNewCardBack("")

    addNotification({
      type: "success",
      message: "Flashcard added successfully!",
      autoClose: true,
    })
  }

  // Render tool-specific content
  const renderToolContent = () => {
    switch (toolId) {
      case "flashcards":
        return (
          <div className={styles.flashcardsContainer}>
            <div className={styles.flashcardControls}>
              <button
                className={styles.controlButton}
                onClick={() => setCurrentCardIndex((prev) => (prev > 0 ? prev - 1 : flashcards.length - 1))}
                disabled={flashcards.length === 0}
              >
                Previous
              </button>
              <span className={styles.cardCounter}>
                {flashcards.length > 0 ? `${currentCardIndex + 1} / ${flashcards.length}` : "No cards"}
              </span>
              <button
                className={styles.controlButton}
                onClick={() => setCurrentCardIndex((prev) => (prev < flashcards.length - 1 ? prev + 1 : 0))}
                disabled={flashcards.length === 0}
              >
                Next
              </button>
            </div>

            {flashcards.length > 0 ? (
              <div
                className={`${styles.flashcard} ${isFlipped ? styles.flipped : ""}`}
                onClick={() => setIsFlipped(!isFlipped)}
              >
                <div className={styles.flashcardFront}>
                  <p>{flashcards[currentCardIndex].front}</p>
                  <span className={styles.flipPrompt}>Click to flip</span>
                </div>
                <div className={styles.flashcardBack}>
                  <p>{flashcards[currentCardIndex].back}</p>
                  <span className={styles.flipPrompt}>Click to flip</span>
                </div>
              </div>
            ) : (
              <div className={styles.emptyState}>
                <p>No flashcards yet. Create your first card below!</p>
              </div>
            )}

            <div className={styles.addCardForm}>
              <h3>Add New Flashcard</h3>
              <div className={styles.formGroup}>
                <label htmlFor="cardFront">Front (Question)</label>
                <textarea
                  id="cardFront"
                  value={newCardFront}
                  onChange={(e) => setNewCardFront(e.target.value)}
                  placeholder="Enter the question or term"
                  rows={3}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="cardBack">Back (Answer)</label>
                <textarea
                  id="cardBack"
                  value={newCardBack}
                  onChange={(e) => setNewCardBack(e.target.value)}
                  placeholder="Enter the answer or definition"
                  rows={3}
                />
              </div>
              <button className={styles.addButton} onClick={addFlashcard}>
                Add Flashcard
              </button>
            </div>
          </div>
        )

      case "notes":
        return (
          <div className={styles.notesContainer}>
            <div className={styles.notesSidebar}>
              <div className={styles.sidebarHeader}>
                <h3>Your Notes</h3>
                <button className={styles.newNoteButton}>+ New</button>
              </div>
              <div className={styles.notesList}>
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className={`${styles.noteItem} ${activeNote.id === note.id ? styles.active : ""}`}
                    onClick={() => setActiveNote(note)}
                  >
                    <h4>{note.title}</h4>
                    <p>{note.content.substring(0, 60)}...</p>
                    <div className={styles.noteTags}>
                      {note.tags.map((tag) => (
                        <span key={tag} className={styles.noteTag}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.noteEditor}>
              <div className={styles.editorHeader}>
                <input
                  type="text"
                  value={activeNote.title}
                  className={styles.noteTitle}
                  placeholder="Note title"
                  readOnly
                />
                <div className={styles.editorControls}>
                  <button className={styles.controlButton}>Save</button>
                  <button className={styles.controlButton}>Share</button>
                  <button className={styles.controlButton}>Delete</button>
                </div>
              </div>
              <textarea
                value={activeNote.content}
                className={styles.noteContent}
                placeholder="Start typing your note..."
                readOnly
              />
            </div>
          </div>
        )

      case "pomodoro":
        return (
          <div className={styles.pomodoroContainer}>
            <div className={styles.timerDisplay}>
              <div className={styles.timerMode}>{timerMode === "work" ? "Work Session" : "Break Time"}</div>
              <div className={styles.timerClock}>
                {String(timerMinutes).padStart(2, "0")}:{String(timerSeconds).padStart(2, "0")}
              </div>
              <div className={styles.timerControls}>
                <button
                  className={`${styles.timerButton} ${isTimerRunning ? styles.stop : styles.start}`}
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                >
                  {isTimerRunning ? "Pause" : "Start"}
                </button>
                <button
                  className={styles.timerButton}
                  onClick={() => {
                    setIsTimerRunning(false)
                    setTimerMinutes(timerMode === "work" ? 25 : 5)
                    setTimerSeconds(0)
                  }}
                >
                  Reset
                </button>
              </div>
            </div>

            <div className={styles.timerSettings}>
              <h3>Timer Settings</h3>
              <div className={styles.settingsGroup}>
                <div className={styles.settingItem}>
                  <label>Work Duration</label>
                  <div className={styles.durationControl}>
                    <button className={styles.durationButton}>-</button>
                    <span>25 min</span>
                    <button className={styles.durationButton}>+</button>
                  </div>
                </div>
                <div className={styles.settingItem}>
                  <label>Short Break</label>
                  <div className={styles.durationControl}>
                    <button className={styles.durationButton}>-</button>
                    <span>5 min</span>
                    <button className={styles.durationButton}>+</button>
                  </div>
                </div>
                <div className={styles.settingItem}>
                  <label>Long Break</label>
                  <div className={styles.durationControl}>
                    <button className={styles.durationButton}>-</button>
                    <span>15 min</span>
                    <button className={styles.durationButton}>+</button>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.pomodoroStats}>
              <h3>Today's Progress</h3>
              <div className={styles.statsGrid}>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>3</span>
                  <span className={styles.statLabel}>Completed Sessions</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>75</span>
                  <span className={styles.statLabel}>Minutes Focused</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>2</span>
                  <span className={styles.statLabel}>Breaks Taken</span>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className={styles.comingSoon}>
            <div className={styles.comingSoonIcon}>🚧</div>
            <h2>Tool Interface Coming Soon</h2>
            <p>We're still working on this tool. Check back soon for updates!</p>
          </div>
        )
    }
  }

  return (
    <main className={styles.main}>
      <Navigation />
      <NotificationToast />

      <div className={styles.container}>
        <Link href="/tools" className={styles.backLink}>
          <ArrowLeft size={20} />
          Back to Tools
        </Link>

        <div className={styles.toolHeader}>
          <div className={styles.toolInfo}>
            <div className={styles.toolIconLarge}>{tool.icon}</div>
            <div className={styles.toolDetails}>
              <h1 className={styles.toolName}>{tool.name}</h1>
              <p className={styles.toolDescription}>{tool.longDescription}</p>
              <div className={styles.toolMeta}>
                {tool.isNew && <span className={styles.newBadge}>New</span>}
                <div className={styles.metaInfo}>
                  <span className={styles.metaItem}>
                    <Star size={16} />
                    {tool.category}
                  </span>
                  <span className={styles.metaItem}>
                    <Clock size={16} />
                    Updated recently
                  </span>
                  <span className={styles.metaItem}>
                    <Users size={16} />
                    1000+ users
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.toolContent}>
          {renderToolContent()}
        </div>

        <section className={styles.toolFeatures}>
          <h2>Features & Capabilities</h2>
          <ul className={styles.featuresList}>
            {tool.features.map((feature, index) => (
              <li key={index} className={styles.featureItem}>
                <span className={styles.featureIcon}>{index + 1}</span>
                <span className={styles.featureText}>{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Add related tools section */}
        <section className={styles.relatedTools}>
          <h2>Related Tools</h2>
          <div className={styles.relatedToolsGrid}>
            {Object.values(TOOLS)
              .filter((t) => t.id !== tool.id && t.category === tool.category)
              .map((relatedTool) => (
                <Link href={`/tools/${relatedTool.id}`} key={relatedTool.id} className={styles.relatedToolCard}>
                  <span className={styles.relatedToolIcon}>{relatedTool.icon}</span>
                  <div className={styles.relatedToolInfo}>
                    <h3>{relatedTool.name}</h3>
                    <p>{relatedTool.description}</p>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </main>
  )
}
