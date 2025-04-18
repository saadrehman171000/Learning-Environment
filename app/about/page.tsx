import Link from "next/link"
import Navigation from "@/components/navigation/navigation"
import styles from "./about.module.css"

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <Navigation />

      <div className={styles.container}>
        <h1 className={styles.title}>About This Learning Environment</h1>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Our Mission</h2>
          <p className={styles.paragraph}>
            Our mission is to create an engaging, personalized learning experience that motivates students to continue
            their educational journey. We believe that learning should be interactive, enjoyable, and tailored to each
            individual's needs and pace.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Learning Approach</h2>
          <p className={styles.paragraph}>This platform is built on several key educational theories:</p>
          <ul className={styles.list}>
            <li>
              <strong>Constructivism:</strong> We encourage active engagement with content, allowing learners to build
              their own understanding through exploration and discovery.
            </li>
            <li>
              <strong>Self-Determination Theory:</strong> Our platform supports autonomy, competence, and relatedness to
              foster intrinsic motivation.
            </li>
            <li>
              <strong>Gamification:</strong> We incorporate game elements like badges, levels, and progress tracking to
              increase engagement and motivation.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Features</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📚</div>
              <h3>Interactive Learning Modules</h3>
              <p>Engage with content through interactive elements, quizzes, and multimedia resources.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📊</div>
              <h3>Progress Tracking</h3>
              <p>Monitor your learning journey with detailed analytics and visualizations.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🎯</div>
              <h3>Personalized Learning</h3>
              <p>Receive recommendations based on your performance and learning patterns.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🏆</div>
              <h3>Achievements & Badges</h3>
              <p>Earn rewards for completing modules, maintaining streaks, and mastering content.</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Technology</h2>
          <p className={styles.paragraph}>This learning environment is built using modern web technologies:</p>
          <ul className={styles.list}>
            <li>
              <strong>Next.js:</strong> A React framework for server-side rendering and static site generation
            </li>
            <li>
              <strong>TypeScript:</strong> For type safety and improved developer experience
            </li>
            <li>
              <strong>CSS Modules:</strong> For component-scoped styling
            </li>
            <li>
              <strong>React Context API:</strong> For state management across the application
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Get Started</h2>
          <p className={styles.paragraph}>
            Ready to begin your learning journey? Explore our modules and start tracking your progress today.
          </p>
          <div className={styles.actions}>
            <Link href="/learn" className={styles.primaryButton}>
              Browse Modules
            </Link>
            <Link href="/" className={styles.secondaryButton}>
              Return Home
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
