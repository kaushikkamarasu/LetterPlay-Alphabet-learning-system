"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FloatingElements } from "@/components/floating-elements"
import { ArrowLeft, ArrowUpDown, RefreshCw, CheckCircle, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@/contexts/user-context"
import { ConfettiEffect } from "@/components/confetti-effect"

// Devanagari letters in correct order (vowels and consonants)
const orderedLetters = [
  // Vowels
  "अ",
  "आ",
  "इ",
  "ई",
  "उ",
  "ऊ",
  "ए",
  "ऐ",
  "ओ",
  "औ",
  // Consonants
  "क",
  "ख",
  "ग",
  "घ",
  "ङ",
  "च",
  "छ",
  "ज",
  "झ",
  "ञ",
  "ट",
  "ठ",
  "ड",
  "ढ",
  "ण",
  "त",
  "थ",
  "द",
  "ध",
  "न",
  "प",
  "फ",
  "ब",
  "भ",
  "म",
  "य",
  "र",
  "ल",
  "व",
  "श",
  "ष",
  "स",
  "ह",
]

export default function LetterSortPage() {
  const [currentLevel, setCurrentLevel] = useState(0)
  const [lettersToSort, setLettersToSort] = useState<string[]>([])
  const [userSortedLetters, setUserSortedLetters] = useState<string[]>([])
  const [showSuccess, setShowSuccess] = useState(false)
  const [score, setScore] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy")
  const [gameCompleted, setGameCompleted] = useState(false)
  const [draggedLetter, setDraggedLetter] = useState<string | null>(null)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const { toast } = useToast()
  const { addPoints, unlockAchievement } = useUser()

  // Initialize game
  useEffect(() => {
    if (gameStarted) {
      initializeLevel(currentLevel)
    }
  }, [gameStarted, currentLevel, difficulty])

  const initializeLevel = (level: number) => {
    setUserSortedLetters([])
    setShowSuccess(false)

    // Generate letters to sort based on difficulty and level
    let letters: string[] = []
    const levelOffset = level * 5 // Each level adds more letters

    if (difficulty === "easy") {
      // Easy: Sort 5-10 letters (vowels first, then consonants)
      const count = 5 + levelOffset
      letters = orderedLetters.slice(0, Math.min(count, 15))
    } else if (difficulty === "medium") {
      // Medium: Sort 10-15 letters (mix of vowels and consonants)
      const count = 10 + levelOffset
      letters = orderedLetters.slice(0, Math.min(count, 25))
    } else {
      // Hard: Sort 15-20 letters (including less common letters)
      const count = 15 + levelOffset
      letters = orderedLetters.slice(0, Math.min(count, orderedLetters.length))
    }

    // Shuffle the letters
    const shuffled = [...letters].sort(() => Math.random() - 0.5)
    setLettersToSort(shuffled)
  }

  const handleDragStart = (letter: string, index: number) => {
    setDraggedLetter(letter)
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()

    // If dragging over a different position, reorder
    if (draggedIndex !== null && draggedIndex !== index) {
      const newOrder = [...userSortedLetters]
      const [removed] = newOrder.splice(draggedIndex, 1)
      newOrder.splice(index, 0, removed)

      setUserSortedLetters(newOrder)
      setDraggedIndex(index)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDraggedLetter(null)
    setDraggedIndex(null)
  }

  const handleLetterClick = (letter: string) => {
    // Add letter to user sorted array
    setUserSortedLetters([...userSortedLetters, letter])

    // Remove from available letters
    setLettersToSort(lettersToSort.filter((l) => l !== letter))
  }

  const handleRemoveLetter = (index: number) => {
    // Get the letter to remove
    const letterToRemove = userSortedLetters[index]

    // Remove from user sorted array
    const newSorted = [...userSortedLetters]
    newSorted.splice(index, 1)
    setUserSortedLetters(newSorted)

    // Add back to available letters
    setLettersToSort([...lettersToSort, letterToRemove])
  }

  const handleCheckOrder = () => {
    // Get the correct order for the current letters
    const correctOrder = orderedLetters.filter((letter) => userSortedLetters.includes(letter))

    // Check if user's order matches the correct order
    const isCorrect = userSortedLetters.every((letter, index) => letter === correctOrder[index])

    if (isCorrect) {
      handleCorrectAnswer()
    } else {
      handleWrongAnswer()
    }
  }

  const handleCorrectAnswer = () => {
    setShowSuccess(true)
    setShowConfetti(true)

    // Calculate score based on difficulty
    const basePoints = difficulty === "easy" ? 10 : difficulty === "medium" ? 20 : 30
    setScore((prev) => prev + basePoints)

    toast({
      title: "Correct!",
      description: `+${basePoints} points! You've sorted the letters correctly.`,
      variant: "success",
    })

    // Hide confetti after a few seconds
    setTimeout(() => {
      setShowConfetti(false)
    }, 3000)
  }

  const handleWrongAnswer = () => {
    toast({
      title: "Incorrect order",
      description: "Try again! The letters are not in the correct order.",
      variant: "warning",
    })
  }

  const handleNextLevel = () => {
    if (currentLevel < 4) {
      // 5 levels total (0-4)
      setCurrentLevel(currentLevel + 1)
    } else {
      // Game completed
      handleGameComplete()
    }
  }

  const handleGameComplete = () => {
    setGameCompleted(true)

    // Add points to user account
    addPoints(score)

    // Unlock achievement if applicable
    if (difficulty === "hard" && score >= 100) {
      unlockAchievement("sorting-master")
    }

    toast({
      title: "Game Completed!",
      description: `You scored ${score} points!`,
      variant: "success",
    })
  }

  const startNewGame = () => {
    setGameStarted(true)
    setCurrentLevel(0)
    setScore(0)
    setGameCompleted(false)
  }

  const changeDifficulty = (newDifficulty: "easy" | "medium" | "hard") => {
    setDifficulty(newDifficulty)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-rose-300 to-red-300 animate-gradient-x overflow-hidden relative pt-20">
      <FloatingElements />
      {showConfetti && <ConfettiEffect />}

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Link href="/games">
              <Button variant="outline" className="rounded-full bg-white/80 hover:bg-white border-pink-300">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Games
              </Button>
            </Link>
            <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600 flex items-center">
              <ArrowUpDown className="h-8 w-8 mr-2 text-pink-600" />
              Letter Sort
            </h1>
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border-4 border-pink-400 mb-8">
            {!gameStarted ? (
              <div className="text-center py-8">
                <h2 className="text-2xl font-bold mb-4 text-pink-700">Letter Sort Game</h2>
                <p className="text-lg mb-8 text-gray-700 max-w-2xl mx-auto">
                  Arrange Devanagari letters in their correct alphabetical order. Learn the sequence of the alphabet!
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                  <Button
                    onClick={() => changeDifficulty("easy")}
                    className={`rounded-xl px-6 py-3 ${
                      difficulty === "easy"
                        ? "bg-gradient-to-r from-green-500 to-green-600 border-2 border-green-400"
                        : "bg-green-100 text-green-800 border border-green-300"
                    }`}
                  >
                    Easy (5-10 Letters)
                  </Button>
                  <Button
                    onClick={() => changeDifficulty("medium")}
                    className={`rounded-xl px-6 py-3 ${
                      difficulty === "medium"
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 border-2 border-blue-400"
                        : "bg-blue-100 text-blue-800 border border-blue-300"
                    }`}
                  >
                    Medium (10-15 Letters)
                  </Button>
                  <Button
                    onClick={() => changeDifficulty("hard")}
                    className={`rounded-xl px-6 py-3 ${
                      difficulty === "hard"
                        ? "bg-gradient-to-r from-red-500 to-red-600 border-2 border-red-400"
                        : "bg-red-100 text-red-800 border border-red-300"
                    }`}
                  >
                    Hard (15-20 Letters)
                  </Button>
                </div>

                <Button
                  onClick={startNewGame}
                  className="text-xl py-6 px-10 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 shadow-xl border-2 border-pink-400"
                >
                  Start Game
                </Button>
              </div>
            ) : (
              <>
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                  <div className="flex gap-4 mb-4 sm:mb-0">
                    <div className="bg-pink-100 rounded-lg px-4 py-2 border border-pink-300 flex items-center">
                      <span className="font-medium text-pink-800">Level: {currentLevel + 1}/5</span>
                    </div>
                    <div className="bg-rose-100 rounded-lg px-4 py-2 border border-rose-300 flex items-center">
                      <span className="font-medium text-rose-800">Score: {score}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => initializeLevel(currentLevel)}
                      className="rounded-lg bg-red-500 hover:bg-red-600"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </div>

                {!gameCompleted && (
                  <>
                    <div className="bg-pink-100 p-4 rounded-lg mb-4 text-center">
                      <p className="text-pink-800 font-medium">
                        Arrange the Devanagari letters in their correct alphabetical order.
                        {difficulty === "easy" && " Vowels come before consonants."}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-xl font-bold mb-3 text-pink-700 text-center">Your Sorted Letters</h3>
                      <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-4 border-2 border-dashed border-pink-300 min-h-16">
                        <div className="flex flex-wrap gap-2 justify-center">
                          {userSortedLetters.length === 0 ? (
                            <p className="text-pink-400 py-4">Click letters below to add them here...</p>
                          ) : (
                            userSortedLetters.map((letter, index) => (
                              <div
                                key={index}
                                className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-xl font-bold text-pink-800 cursor-pointer hover:bg-pink-100 transition-colors border border-pink-300 shadow-sm"
                                onClick={() => handleRemoveLetter(index)}
                                draggable
                                onDragStart={() => handleDragStart(letter, index)}
                                onDragOver={(e) => handleDragOver(e, index)}
                              >
                                {letter}
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>

                    {showSuccess ? (
                      <div className="mt-6 bg-gradient-to-r from-green-100 to-green-200 rounded-xl p-4 border-2 border-green-300 text-center">
                        <h3 className="text-xl font-bold text-green-800 mb-2">Correct Order!</h3>
                        <p className="text-green-700 mb-3">
                          You've successfully arranged the letters in the correct order.
                        </p>
                        <Button
                          onClick={handleNextLevel}
                          className="rounded-xl bg-gradient-to-r from-green-500 to-green-600"
                        >
                          <ArrowRight className="h-4 w-4 mr-2" />
                          Next Level
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="mb-6">
                          <h3 className="text-xl font-bold mb-3 text-pink-700 text-center">Available Letters</h3>
                          <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-xl p-4 border-2 border-pink-300">
                            <div className="flex flex-wrap gap-2 justify-center">
                              {lettersToSort.map((letter, index) => (
                                <div
                                  key={index}
                                  className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-xl font-bold text-pink-800 cursor-pointer hover:bg-pink-100 transition-colors border border-pink-300 shadow-sm"
                                  onClick={() => handleLetterClick(letter)}
                                >
                                  {letter}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-center">
                          <Button
                            onClick={handleCheckOrder}
                            className="text-lg py-4 px-8 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700"
                            disabled={userSortedLetters.length < 2}
                          >
                            <CheckCircle className="h-5 w-5 mr-2" />
                            Check Order
                          </Button>
                        </div>
                      </>
                    )}
                  </>
                )}

                {gameCompleted && (
                  <div className="bg-gradient-to-r from-green-100 to-green-200 rounded-xl p-6 border-2 border-green-300 text-center">
                    <h3 className="text-2xl font-bold text-green-800 mb-2">Congratulations!</h3>
                    <p className="text-green-700 mb-4">You've completed all levels with a score of {score}!</p>
                    <div className="flex justify-center gap-4">
                      <Button
                        onClick={startNewGame}
                        className="rounded-xl bg-gradient-to-r from-green-500 to-green-600"
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Play Again
                      </Button>
                      <Link href="/games">
                        <Button variant="outline" className="rounded-xl border-green-400">
                          Back to Games
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
