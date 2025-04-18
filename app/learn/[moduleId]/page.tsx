import Link from "next/link"
import { notFound } from "next/navigation"
import Navigation from "@/components/navigation/navigation"
import styles from "./module.module.css"
import { LEARNING_MODULES } from "@/data/modules"
import ModuleContentRenderer from "@/components/module-content/module-content-renderer"

export function generateStaticParams() {
  return LEARNING_MODULES.map((module) => ({
    moduleId: module.id,
  }))
}

interface ModulePageProps {
  params: {
    moduleId: string
  }
}

export default async function ModulePage({ params }: ModulePageProps) {
  const { moduleId } = params

  if (!moduleId) {
    notFound()
  }

  const module = LEARNING_MODULES.find((m) => m.id === moduleId)

  if (!module) {
    notFound()
  }

  return (
    <main className={styles.main}>
      <Navigation />

      <div className={styles.container}>
        <div className={styles.header}>
          <Link href="/learn" className={styles.backLink}>
            ← Back to Modules
          </Link>
          <h1 className={styles.title}>{module.title}</h1>
          <div className={styles.moduleInfo}>
            <span className={styles.moduleIcon}>{module.icon}</span>
            <span className={styles.moduleDifficulty}>{module.difficulty}</span>
            <span className={styles.moduleTime}>{module.estimatedTime} min</span>
          </div>
          <p className={styles.description}>{module.description}</p>
        </div>

        <div className={styles.content}>
          <div className={styles.sidebar}>
            <h2 className={styles.sidebarTitle}>Module Content</h2>
            <ul className={styles.contentList}>
              {module.content.map((item, index) => (
                <li key={item.id} className={styles.contentItem}>
                  <a href={`#${item.id}`} className={styles.contentLink}>
                    <span className={styles.contentIndex}>{index + 1}</span>
                    <span className={styles.contentTitle}>{item.title}</span>
                    <span className={styles.contentType}>{item.type}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.mainContent}>
            {module.content.length > 0 ? (
              module.content.map((content) => (
                <div key={content.id} id={content.id} className={styles.contentSection}>
                  <ModuleContentRenderer content={content} moduleId={module.id} />
                </div>
              ))
            ) : (
              <div className={styles.emptyState}>
                <p>Content for this module is coming soon!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
