"use client"

import { useState } from "react"
import Link from "next/link"
import Navigation from "@/components/navigation/navigation"
import NotificationToast from "@/components/ui/notification-toast"
import { useNotification } from "@/context/notification-context"
import styles from "./community.module.css"

type Post = {
  id: string
  title: string
  content: string
  author: {
    name: string
    avatar: string
    level: number
  }
  category: string
  tags: string[]
  likes: number
  comments: number
  createdAt: string
  isLiked?: boolean
}

type Category = {
  id: string
  name: string
  icon: string
  count: number
}

export default function CommunityPage() {
  const { addNotification } = useNotification()
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "post-1",
      title: "How to approach the Web Development module?",
      content:
        "I'm finding the Web Development module quite challenging, especially the JavaScript section. Any tips on how to better understand the concepts?",
      author: {
        name: "John Doe",
        avatar: "JD",
        level: 12,
      },
      category: "questions",
      tags: ["web-development", "javascript", "beginner"],
      likes: 24,
      comments: 8,
      createdAt: "2 days ago",
    },
    {
      id: "post-2",
      title: "Resources for Data Science learning",
      content:
        "I've compiled a list of helpful resources for the Data Science module. These include free datasets, tutorials, and visualization tools that have helped me a lot.",
      author: {
        name: "Jane Smith",
        avatar: "JS",
        level: 18,
      },
      category: "resources",
      tags: ["data-science", "resources", "tools"],
      likes: 42,
      comments: 15,
      createdAt: "1 week ago",
    },
    {
      id: "post-3",
      title: "Just completed the Creative Writing course!",
      content:
        "I'm excited to share that I've completed the Creative Writing course with a perfect score! The storytelling techniques I learned have already improved my writing significantly.",
      author: {
        name: "Michael Johnson",
        avatar: "MJ",
        level: 9,
      },
      category: "success-stories",
      tags: ["creative-writing", "achievement", "storytelling"],
      likes: 36,
      comments: 12,
      createdAt: "3 days ago",
    },
    {
      id: "post-4",
      title: "Weekly study group for Web Development",
      content:
        "I'm organizing a weekly study group for the Web Development module. We'll meet every Saturday at 3 PM EST via Zoom. Anyone interested in joining?",
      author: {
        name: "Sarah Williams",
        avatar: "SW",
        level: 15,
      },
      category: "study-groups",
      tags: ["web-development", "study-group", "collaboration"],
      likes: 18,
      comments: 22,
      createdAt: "5 hours ago",
    },
    {
      id: "post-5",
      title: "Tips for maintaining a study streak",
      content:
        "I've maintained a 30-day study streak and wanted to share some tips that helped me stay consistent. Planning ahead and setting specific goals for each session has been key.",
      author: {
        name: "David Brown",
        avatar: "DB",
        level: 21,
      },
      category: "tips",
      tags: ["motivation", "consistency", "study-habits"],
      likes: 53,
      comments: 17,
      createdAt: "2 weeks ago",
    },
  ])

  const categories: Category[] = [
    { id: "all", name: "All Posts", icon: "📋", count: posts.length },
    { id: "questions", name: "Questions", icon: "❓", count: posts.filter((p) => p.category === "questions").length },
    { id: "resources", name: "Resources", icon: "📚", count: posts.filter((p) => p.category === "resources").length },
    {
      id: "success-stories",
      name: "Success Stories",
      icon: "🏆",
      count: posts.filter((p) => p.category === "success-stories").length,
    },
    {
      id: "study-groups",
      name: "Study Groups",
      icon: "👥",
      count: posts.filter((p) => p.category === "study-groups").length,
    },
    { id: "tips", name: "Tips & Tricks", icon: "💡", count: posts.filter((p) => p.category === "tips").length },
  ]

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = activeCategory === "all" || post.category === activeCategory
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesCategory && matchesSearch
  })

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const isLiked = post.isLiked || false
          return {
            ...post,
            likes: isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !isLiked,
          }
        }
        return post
      }),
    )

    addNotification({
      type: "success",
      message: "Post liked successfully!",
      autoClose: true,
      duration: 3000,
    })
  }

  return (
    <main className={styles.main}>
      <Navigation />
      <NotificationToast />

      <div className="page-container">
        <div className="container">
          <div className={styles.communityHeader}>
            <div>
              <h1 className={styles.title}>Community Forum</h1>
              <p className={styles.subtitle}>Connect with fellow learners, share resources, and get help</p>
            </div>

            <Link href="/community/new-post" className={`btn btn-primary ${styles.newPostButton}`}>
              Create New Post
            </Link>
          </div>

          <div className={styles.communityLayout}>
            <div className={styles.sidebar}>
              <div className={styles.searchBox}>
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>

              <div className={styles.categories}>
                <h3 className={styles.sidebarTitle}>Categories</h3>
                <ul className={styles.categoryList}>
                  {categories.map((category) => (
                    <li
                      key={category.id}
                      className={`${styles.categoryItem} ${activeCategory === category.id ? styles.active : ""}`}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      <span className={styles.categoryIcon}>{category.icon}</span>
                      <span className={styles.categoryName}>{category.name}</span>
                      <span className={styles.categoryCount}>{category.count}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.popularTags}>
                <h3 className={styles.sidebarTitle}>Popular Tags</h3>
                <div className={styles.tagCloud}>
                  <span className={styles.tag} onClick={() => setSearchQuery("web-development")}>
                    web-development
                  </span>
                  <span className={styles.tag} onClick={() => setSearchQuery("javascript")}>
                    javascript
                  </span>
                  <span className={styles.tag} onClick={() => setSearchQuery("data-science")}>
                    data-science
                  </span>
                  <span className={styles.tag} onClick={() => setSearchQuery("resources")}>
                    resources
                  </span>
                  <span className={styles.tag} onClick={() => setSearchQuery("study-habits")}>
                    study-habits
                  </span>
                  <span className={styles.tag} onClick={() => setSearchQuery("motivation")}>
                    motivation
                  </span>
                  <span className={styles.tag} onClick={() => setSearchQuery("beginner")}>
                    beginner
                  </span>
                </div>
              </div>

              <div className={styles.communityStats}>
                <h3 className={styles.sidebarTitle}>Community Stats</h3>
                <div className={styles.statsList}>
                  <div className={styles.statItem}>
                    <span className={styles.statIcon}>👥</span>
                    <div className={styles.statInfo}>
                      <span className={styles.statValue}>10,482</span>
                      <span className={styles.statLabel}>Members</span>
                    </div>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statIcon}>📝</span>
                    <div className={styles.statInfo}>
                      <span className={styles.statValue}>3,721</span>
                      <span className={styles.statLabel}>Posts</span>
                    </div>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statIcon}>💬</span>
                    <div className={styles.statInfo}>
                      <span className={styles.statValue}>15,908</span>
                      <span className={styles.statLabel}>Comments</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.content}>
              <div className={styles.postsHeader}>
                <h2>
                  {activeCategory === "all" ? "All Posts" : categories.find((c) => c.id === activeCategory)?.name}
                </h2>
                <div className={styles.sortOptions}>
                  <span className={styles.sortLabel}>Sort by:</span>
                  <select className={styles.sortSelect}>
                    <option value="recent">Most Recent</option>
                    <option value="popular">Most Popular</option>
                    <option value="comments">Most Comments</option>
                  </select>
                </div>
              </div>

              {filteredPosts.length > 0 ? (
                <div className={styles.postsList}>
                  {filteredPosts.map((post) => (
                    <div key={post.id} className={styles.postCard}>
                      <div className={styles.postHeader}>
                        <div className={styles.postAuthor}>
                          <div className={styles.authorAvatar}>{post.author.avatar}</div>
                          <div className={styles.authorInfo}>
                            <span className={styles.authorName}>{post.author.name}</span>
                            <span className={styles.authorLevel}>Level {post.author.level}</span>
                          </div>
                        </div>
                        <div className={styles.postMeta}>
                          <span className={styles.postCategory}>
                            {categories.find((c) => c.id === post.category)?.icon}{" "}
                            {categories.find((c) => c.id === post.category)?.name}
                          </span>
                          <span className={styles.postTime}>{post.createdAt}</span>
                        </div>
                      </div>

                      <Link href={`/community/post/${post.id}`} className={styles.postTitle}>
                        {post.title}
                      </Link>

                      <p className={styles.postContent}>{post.content}</p>

                      <div className={styles.postTags}>
                        {post.tags.map((tag) => (
                          <span key={tag} className={styles.postTag} onClick={() => setSearchQuery(tag)}>
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className={styles.postActions}>
                        <button
                          className={`${styles.actionButton} ${post.isLiked ? styles.liked : ""}`}
                          onClick={() => handleLike(post.id)}
                        >
                          <span className={styles.actionIcon}>❤️</span>
                          <span className={styles.actionCount}>{post.likes}</span>
                        </button>

                        <Link href={`/community/post/${post.id}`} className={styles.actionButton}>
                          <span className={styles.actionIcon}>💬</span>
                          <span className={styles.actionCount}>{post.comments}</span>
                        </Link>

                        <button className={styles.actionButton}>
                          <span className={styles.actionIcon}>🔖</span>
                          <span className={styles.actionText}>Save</span>
                        </button>

                        <button className={styles.actionButton}>
                          <span className={styles.actionIcon}>🔗</span>
                          <span className={styles.actionText}>Share</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>🔍</div>
                  <h3>No posts found</h3>
                  <p>Try adjusting your search or category filters</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
