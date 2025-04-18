"use client"

import type React from "react"

import { useState } from "react"
import type { ModuleContent } from "@/data/modules"
import { useUserProgress } from "@/context/user-progress-context"
import styles from "./module-content-renderer.module.css"

export default function ModuleContentRenderer({
  content,
  moduleId,
}: {
  content: ModuleContent
  moduleId: string
}) {
  const { updateModuleProgress, completeModule, earnBadge } = useUserProgress()
  const [quizState, setQuizState] = useState<{
    started: boolean
    currentQuestion: number
    answers: Record<string, string>
    submitted: boolean
    score: number
  }>({
    started: false,
    currentQuestion: 0,
    answers: {},
    submitted: false,
    score: 0,
  })

  // Mark this content as accessed when viewed
  useState(() => {
    if (content) {
      updateModuleProgress(moduleId, {
        id: moduleId,
        title: content.title,
        completed: false,
        score: 0,
        lastAccessed: new Date(),
      })
    }
  })

  const startQuiz = () => {
    setQuizState({
      ...quizState,
      started: true,
    })
  }

  // Fix the scrolling issue when selecting quiz options
  // Update the handleAnswerSelect function to prevent default behavior
  const handleAnswerSelect = (questionId: string, answer: string, event?: React.MouseEvent | React.ChangeEvent) => {
    // Prevent default behavior to avoid scrolling
    if (event) {
      event.preventDefault()
    }

    setQuizState({
      ...quizState,
      answers: {
        ...quizState.answers,
        [questionId]: answer,
      },
    })
  }

  const handleTextAnswer = (questionId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    setQuizState({
      ...quizState,
      answers: {
        ...quizState.answers,
        [questionId]: event.target.value,
      },
    })
  }

  const nextQuestion = () => {
    if (content.quizQuestions && quizState.currentQuestion < content.quizQuestions.length - 1) {
      setQuizState({
        ...quizState,
        currentQuestion: quizState.currentQuestion + 1,
      })
    }
  }

  const prevQuestion = () => {
    if (quizState.currentQuestion > 0) {
      setQuizState({
        ...quizState,
        currentQuestion: quizState.currentQuestion - 1,
      })
    }
  }

  const submitQuiz = () => {
    if (!content.quizQuestions) return

    let correctAnswers = 0

    content.quizQuestions.forEach((question) => {
      const userAnswer = quizState.answers[question.id]

      if (Array.isArray(question.correctAnswer)) {
        if (question.correctAnswer.includes(userAnswer)) {
          correctAnswers++
        }
      } else {
        if (userAnswer === question.correctAnswer) {
          correctAnswers++
        }
      }
    })

    const score = Math.round((correctAnswers / content.quizQuestions.length) * 100)

    setQuizState({
      ...quizState,
      submitted: true,
      score,
    })

    // Update progress in context
    completeModule(moduleId, score)

    // Award badges based on performance
    if (score === 100) {
      earnBadge("perfect-score")
    }
  }

  const renderContent = () => {
    switch (content.type) {
      case "reading":
      case "interactive":
        return (
          <div className={styles.contentContainer}>
            <h2 className={styles.contentTitle}>{content.title}</h2>
            <div className={styles.contentBody} dangerouslySetInnerHTML={{ __html: content.content }} />
          </div>
        )

      case "quiz":
        if (!content.quizQuestions || content.quizQuestions.length === 0) {
          return <div>No quiz questions available.</div>
        }

        if (!quizState.started) {
          return (
            <div className={styles.quizIntro}>
              <h2 className={styles.contentTitle}>{content.title}</h2>
              <p className={styles.quizDescription}>{content.content}</p>
              <p className={styles.quizInfo}>
                This quiz contains {content.quizQuestions.length} questions. You can navigate between questions and
                change your answers before submitting.
              </p>
              <button className={styles.startButton} onClick={startQuiz}>
                Start Quiz
              </button>
            </div>
          )
        }

        if (quizState.submitted) {
          return (
            <div className={styles.quizResults}>
              <h2 className={styles.contentTitle}>Quiz Results</h2>
              <div className={styles.scoreCard}>
                <div className={styles.scoreCircle}>
                  <span className={styles.scoreValue}>{quizState.score}%</span>
                </div>
                <p className={styles.scoreMessage}>
                  {quizState.score === 100
                    ? "Perfect score! Excellent work!"
                    : quizState.score >= 80
                      ? "Great job! You've mastered this content."
                      : quizState.score >= 60
                        ? "Good effort! Review the material to improve further."
                        : "Keep practicing! Review the material and try again."}
                </p>
              </div>

              <div className={styles.questionReview}>
                <h3>Review Your Answers</h3>
                {content.quizQuestions.map((question, index) => {
                  const userAnswer = quizState.answers[question.id] || ""
                  const isCorrect = Array.isArray(question.correctAnswer)
                    ? question.correctAnswer.includes(userAnswer)
                    : userAnswer === question.correctAnswer

                  return (
                    <div
                      key={question.id}
                      className={`${styles.reviewQuestion} ${isCorrect ? styles.correct : styles.incorrect}`}
                    >
                      <div className={styles.questionHeader}>
                        <span className={styles.questionNumber}>Question {index + 1}</span>
                        <span className={styles.questionResult}>{isCorrect ? "✓ Correct" : "✗ Incorrect"}</span>
                      </div>
                      <p className={styles.questionText}>{question.question}</p>
                      <div className={styles.answerReview}>
                        <p>
                          <strong>Your answer:</strong> {userAnswer || "(No answer provided)"}
                        </p>
                        <p>
                          <strong>Correct answer:</strong>{" "}
                          {Array.isArray(question.correctAnswer)
                            ? question.correctAnswer.join(", ")
                            : question.correctAnswer}
                        </p>
                      </div>
                      <div className={styles.explanation}>
                        <p>
                          <strong>Explanation:</strong> {question.explanation}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        }

        // Active quiz
        const currentQuestion = content.quizQuestions[quizState.currentQuestion]

        return (
          <div className={styles.quizContainer}>
            <div className={styles.quizProgress}>
              <div
                className={styles.progressBar}
                style={{
                  width: `${((quizState.currentQuestion + 1) / content.quizQuestions.length) * 100}%`,
                }}
              ></div>
            </div>

            <div className={styles.questionHeader}>
              <h3 className={styles.questionNumber}>
                Question {quizState.currentQuestion + 1} of {content.quizQuestions.length}
              </h3>
            </div>

            <div className={styles.questionContent}>
              <p className={styles.questionText}>{currentQuestion.question}</p>

              {currentQuestion.type === "multiple-choice" && currentQuestion.options && (
                <div className={styles.options}>
                  {currentQuestion.options.map((option) => (
                    <label
                      key={option}
                      className={`${styles.option} ${
                        quizState.answers[currentQuestion.id] === option ? styles.selected : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name={currentQuestion.id}
                        value={option}
                        checked={quizState.answers[currentQuestion.id] === option}
                        onChange={(e) => handleAnswerSelect(currentQuestion.id, option, e)}
                        className={styles.optionInput}
                        onClick={(e) => e.stopPropagation()} // Stop propagation to prevent double handling
                      />
                      <span className={styles.optionText}>{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {currentQuestion.type === "fill-in-blank" && (
                <div className={styles.fillBlank}>
                  <input
                    type="text"
                    value={quizState.answers[currentQuestion.id] || ""}
                    onChange={(e) => handleTextAnswer(currentQuestion.id, e)}
                    placeholder="Type your answer here..."
                    className={styles.fillBlankInput}
                  />
                </div>
              )}
            </div>

            <div className={styles.quizNavigation}>
              <button
                className={`${styles.navButton} ${quizState.currentQuestion === 0 ? styles.disabled : ""}`}
                onClick={prevQuestion}
                disabled={quizState.currentQuestion === 0}
              >
                Previous
              </button>

              {quizState.currentQuestion < content.quizQuestions.length - 1 ? (
                <button className={styles.navButton} onClick={nextQuestion}>
                  Next
                </button>
              ) : (
                <button
                  className={styles.submitButton}
                  onClick={submitQuiz}
                  disabled={Object.keys(quizState.answers).length < content.quizQuestions.length}
                >
                  Submit Quiz
                </button>
              )}
            </div>
          </div>
        )

      default:
        return <div>Unsupported content type</div>
    }
  }

  return <div className={styles.moduleContent}>{renderContent()}</div>
}
