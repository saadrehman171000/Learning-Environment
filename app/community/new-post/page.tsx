"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Navigation from "@/components/navigation/navigation"
import NotificationToast from "@/components/ui/notification-toast"
import { useNotification } from "@/context/notification-context"
import styles from "./new-post.module.css"

export default function NewPostPage() {
  const router = useRouter()
  const { addNotification } = useNotification()
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    category: "questions",
    tags: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = [
    { id: "questions", name: "Questions", icon: "❓" },
    { id: "resources", name: "Resources", icon: "📚" },
    { id: "success-stories", name: "Success Stories", icon: "🏆" },
    { id: "study-groups", name: "Study Groups", icon: "👥" },
    { id: "tips", name: "Tips & Tricks", icon: "💡" },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setPostData({
      ...postData,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!postData.title.trim()) {
      addNotification({
        type: "error",
        message: "Please enter a post title",
        autoClose: true,
      })
      return
    }

    if (!postData.content.trim()) {
      addNotification({
        type: "error",
        message: "Please enter post content",
        autoClose: true,
      })
      return
    }

    // Show submitting state
    setIsSubmitting(true)

    // Simulate post creation (in a real app, this would be an API call)
    setTimeout(() => {
      addNotification({
        type: "success",
        title: "Post Created",
        message: "Your post has been published successfully!",
        autoClose: true,
      })

      // Redirect to community page
      router.push("/community")
    }, 1000)
  }

  return (
    <main className={styles.main}>
      <Navigation />
      <NotificationToast />

      <div className="page-container">
        <div className="container">
          <div className={styles.pageHeader}>
            <Link href="/community" className={styles.backLink}>
              ← Back to Community
            </Link>
            <h1 className={styles.title}>Create New Post</h1>
            <p className={styles.subtitle}>Share your questions, resources, or experiences with the community</p>
          </div>

          <div className={styles.formContainer}>
            <form className={styles.postForm} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="title" className={styles.formLabel}>
                  Post Title <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={postData.title}
                  onChange={handleInputChange}
                  placeholder="Enter a descriptive title for your post"
                  className={styles.formInput}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="category" className={styles.formLabel}>
                  Category <span className={styles.required}>*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={postData.category}
                  onChange={handleInputChange}
                  className={styles.formSelect}
                  required
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.icon} {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="content" className={styles.formLabel}>
                  Post Content <span className={styles.required}>*</span>
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={postData.content}
                  onChange={handleInputChange}
                  placeholder="Write your post content here..."
                  className={styles.formTextarea}
                  rows={10}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="tags" className={styles.formLabel}>
                  Tags <span className={styles.optional}>(optional)</span>
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={postData.tags}
                  onChange={handleInputChange}
                  placeholder="Enter tags separated by commas (e.g., javascript, beginner, help)"
                  className={styles.formInput}
                />
                <p className={styles.formHelp}>
                  Tags help others find your post. Add relevant keywords separated by commas.
                </p>
              </div>

              <div className={styles.formActions}>
                <Link href="/community" className={styles.cancelButton}>
                  Cancel
                </Link>
                <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                  {isSubmitting ? "Publishing..." : "Publish Post"}
                </button>
              </div>
            </form>

            <div className={styles.formSidebar}>
              <div className={styles.sidebarCard}>
                <h3>Posting Guidelines</h3>
                <ul className={styles.guidelinesList}>
                  <li>Be respectful and constructive in your posts</li>
                  <li>Use a clear, descriptive title</li>
                  <li>Include relevant details in your post</li>
                  <li>Add tags to help others find your post</li>
                  <li>Check for similar posts before creating a new one</li>
                </ul>
              </div>

              <div className={styles.sidebarCard}>
                <h3>Formatting Tips</h3>
                <div className={styles.formattingTips}>
                  <div className={styles.formattingTip}>
                    <span className={styles.tipCode}>**bold text**</span>
                    <span className={styles.tipResult}>Makes text bold</span>
                  </div>
                  <div className={styles.formattingTip}>
                    <span className={styles.tipCode}>*italic text*</span>
                    <span className={styles.tipResult}>Makes text italic</span>
                  </div>
                  <div className={styles.formattingTip}>
                    <span className={styles.tipCode}># Heading</span>
                    <span className={styles.tipResult}>Creates a heading</span>
                  </div>
                  <div className={styles.formattingTip}>
                    <span className={styles.tipCode}>- item</span>
                    <span className={styles.tipResult}>Creates a list item</span>
                  </div>
                  <div className={styles.formattingTip}>
                    <span className={styles.tipCode}>```code```</span>
                    <span className={styles.tipResult}>Formats as code</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
