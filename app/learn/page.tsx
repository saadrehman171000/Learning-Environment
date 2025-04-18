import Link from "next/link"
import Navigation from "@/components/navigation/navigation"
import styles from "./learn.module.css"
import { LEARNING_MODULES } from "@/data/modules"

export default function LearnPage() {
  return (
    <main className={styles.main}>
      <Navigation />

      <div className={styles.container}>
        <h1 className={styles.title}>Learning Modules</h1>
        <p className={styles.description}>
          Choose a module to start learning. Each module contains interactive content, quizzes, and activities to help
          you master the subject.
        </p>

        <div className={styles.moduleGrid}>
          {LEARNING_MODULES.map((module) => (
            <Link href={`/learn/${module.id}`} key={module.id} className={styles.moduleCard}>
              <div className={styles.moduleIcon}>{module.icon}</div>
              <h2 className={styles.moduleTitle}>{module.title}</h2>
              <p className={styles.moduleDescription}>{module.description}</p>
              <div className={styles.moduleDetails}>
                <span>{module.lessons} lessons</span>
                <span>{module.estimatedTime} min</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
