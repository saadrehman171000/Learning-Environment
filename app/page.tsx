import Link from "next/link"
import styles from "./page.module.css"
import Navigation from "@/components/navigation/navigation"
import NotificationToast from "@/components/ui/notification-toast"

export default function Home() {
  return (
    <main className={styles.main}>
      <Navigation />
      <NotificationToast />

      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1 className={styles.title}>
                Learn, Engage, <span className="gradient-text">Evolve</span>
              </h1>
              <p className={styles.description}>
                Welcome to EduVerse, where learning becomes an adventure. Engage with interactive content, track your
                progress, and connect with a community of learners.
              </p>
              <div className={styles.actions}>
                <Link href="/dashboard" className="btn btn-primary">
                  Start Your Journey
                </Link>
                <Link href="/learn" className="btn btn-outline">
                  Explore Courses
                </Link>
              </div>
              <div className={styles.stats}>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>50+</span>
                  <span className={styles.statLabel}>Interactive Courses</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>10k+</span>
                  <span className={styles.statLabel}>Active Learners</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>95%</span>
                  <span className={styles.statLabel}>Completion Rate</span>
                </div>
              </div>
            </div>
            <div className={styles.heroImage}>
              <img
                src="/placeholder.svg?height=500&width=500"
                alt="Learning illustration"
                className={styles.mainImage}
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className="container">
          <h2 className={styles.sectionTitle}>
            Discover the <span className="gradient-text">EduVerse</span> Experience
          </h2>
          <p className={styles.sectionDescription}>
            Our platform combines cutting-edge technology with proven learning methodologies to create an engaging and
            effective learning environment.
          </p>

          <div className={styles.featureGrid}>
            <div className={`${styles.featureCard} card`}>
              <div className={styles.featureIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M17 6H7C5.89543 6 5 6.89543 5 8V16C5 17.1046 5.89543 18 7 18H17C18.1046 18 19 17.1046 19 16V8C19 6.89543 18.1046 6 17 6Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 10L15 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 10L9 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3>Gamified Learning</h3>
              <p>Earn points, badges, and climb leaderboards as you master new skills and knowledge.</p>
            </div>
            <div className={`${styles.featureCard} card`}>
              <div className={styles.featureIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
              <h3>Adaptive Content</h3>
              <p>Our AI-powered system adapts to your learning style and pace for a personalized experience.</p>
            </div>
            <div className={`${styles.featureCard} card`}>
              <div className={styles.featureIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3>Social Learning</h3>
              <p>Connect with peers, join study groups, and participate in community discussions.</p>
            </div>
            <div className={`${styles.featureCard} card`}>
              <div className={styles.featureIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
              </div>
              <h3>Detailed Analytics</h3>
              <p>Track your progress with comprehensive insights and performance metrics.</p>
            </div>
            <div className={`${styles.featureCard} card`}>
              <div className={styles.featureIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8 6H21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 12H21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 18H21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 6H3.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 12H3.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 18H3.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3>Daily Challenges</h3>
              <p>Test your knowledge with daily challenges and compete with other learners.</p>
            </div>
            <div className={`${styles.featureCard} card`}>
              <div className={styles.featureIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3>Study Tools</h3>
              <p>Access flashcards, notes, and other tools to enhance your learning experience.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.pathways}>
        <div className="container">
          <h2 className={styles.sectionTitle}>
            Learning <span className="gradient-text">Pathways</span>
          </h2>
          <p className={styles.sectionDescription}>
            Choose from a variety of learning paths designed to help you achieve your goals.
          </p>

          <div className={styles.pathwayGrid}>
            <div className={styles.pathwayCard}>
              <div className={styles.pathwayHeader}>
                <div className={styles.pathwayIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M3 12H21"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 6H21"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 18H21"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3>Web Development</h3>
              </div>
              <p>Master the art of building modern websites and web applications.</p>
              <div className={styles.pathwayMeta}>
                <span className="badge badge-primary">12 Modules</span>
                <span className="badge badge-secondary">Beginner to Advanced</span>
              </div>
              <Link href="/learn?category=web-development" className={styles.pathwayLink}>
                Explore Path →
              </Link>
            </div>

            <div className={styles.pathwayCard}>
              <div className={styles.pathwayHeader}>
                <div className={styles.pathwayIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                </div>
                <h3>Data Science</h3>
              </div>
              <p>Learn to analyze data and extract meaningful insights.</p>
              <div className={styles.pathwayMeta}>
                <span className="badge badge-primary">10 Modules</span>
                <span className="badge badge-secondary">Intermediate</span>
              </div>
              <Link href="/learn?category=data-science" className={styles.pathwayLink}>
                Explore Path →
              </Link>
            </div>

            <div className={styles.pathwayCard}>
              <div className={styles.pathwayHeader}>
                <div className={styles.pathwayIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3>Creative Writing</h3>
              </div>
              <p>Develop your storytelling skills and craft compelling narratives.</p>
              <div className={styles.pathwayMeta}>
                <span className="badge badge-primary">8 Modules</span>
                <span className="badge badge-secondary">All Levels</span>
              </div>
              <Link href="/learn?category=creative-writing" className={styles.pathwayLink}>
                Explore Path →
              </Link>
            </div>

            <div className={styles.pathwayCard}>
              <div className={styles.pathwayHeader}>
                <div className={styles.pathwayIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M22 12H18L15 21L9 3L6 12H2"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3>Digital Marketing</h3>
              </div>
              <p>Master the strategies and tools for effective online marketing.</p>
              <div className={styles.pathwayMeta}>
                <span className="badge badge-primary">9 Modules</span>
                <span className="badge badge-secondary">Beginner Friendly</span>
              </div>
              <Link href="/learn?category=digital-marketing" className={styles.pathwayLink}>
                Explore Path →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.testimonials}>
        <div className="container">
          <h2 className={styles.sectionTitle}>
            What Our <span className="gradient-text">Learners</span> Say
          </h2>

          <div className={styles.testimonialGrid}>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <p>
                  "EduVerse transformed my learning experience. The interactive modules and gamification elements kept
                  me motivated throughout my journey."
                </p>
              </div>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar}>JD</div>
                <div className={styles.authorInfo}>
                  <h4>John Doe</h4>
                  <p>Web Development Graduate</p>
                </div>
              </div>
            </div>

            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <p>
                  "The personalized learning path and detailed analytics helped me focus on areas where I needed
                  improvement. Highly recommended!"
                </p>
              </div>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar}>JS</div>
                <div className={styles.authorInfo}>
                  <h4>Jane Smith</h4>
                  <p>Data Science Enthusiast</p>
                </div>
              </div>
            </div>

            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <p>
                  "The community features made learning a collaborative experience. I connected with like-minded
                  individuals and formed study groups that enhanced my learning."
                </p>
              </div>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar}>MJ</div>
                <div className={styles.authorInfo}>
                  <h4>Michael Johnson</h4>
                  <p>Creative Writing Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2>Ready to Start Your Learning Journey?</h2>
            <p>Join thousands of learners who are already experiencing the EduVerse difference.</p>
            <Link href="/dashboard" className="btn btn-primary">
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerContent}>
            <div className={styles.footerLogo}>
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
              <span className={styles.logoText}>EduVerse</span>
            </div>
            <p className={styles.footerTagline}>Transforming the way we learn</p>

            <div className={styles.footerLinks}>
              <div className={styles.footerLinkGroup}>
                <h3>Platform</h3>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/learn">Courses</Link>
                <Link href="/challenges">Challenges</Link>
                <Link href="/community">Community</Link>
              </div>

              <div className={styles.footerLinkGroup}>
                <h3>Resources</h3>
                <Link href="/tools">Learning Tools</Link>
                <Link href="/blog">Blog</Link>
                <Link href="/faq">FAQ</Link>
                <Link href="/support">Support</Link>
              </div>

              <div className={styles.footerLinkGroup}>
                <h3>Company</h3>
                <Link href="/about">About Us</Link>
                <Link href="/team">Our Team</Link>
                <Link href="/careers">Careers</Link>
                <Link href="/contact">Contact</Link>
              </div>

              <div className={styles.footerLinkGroup}>
                <h3>Legal</h3>
                <Link href="/terms">Terms of Service</Link>
                <Link href="/privacy">Privacy Policy</Link>
                <Link href="/cookies">Cookie Policy</Link>
              </div>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p>&copy; {new Date().getFullYear()} EduVerse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
