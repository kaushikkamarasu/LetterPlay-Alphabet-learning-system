"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FloatingElements } from "@/components/floating-elements"
import { ArrowLeft, Puzzle, RefreshCw, Check, X, Star, ArrowDown } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@/contexts/user-context"
import { ConfettiEffect } from "@/components/confetti-effect"

// Sample Devanagari letters for the word builder
const availableLetters = [
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

// Sample words with their meanings
const wordsList = [
  { word: "नमस्ते", meaning: "Hello", letters: ["न", "म", "स", "्", "त", "े"] },
  { word: "धन्यवाद", meaning: "Thank you", letters: ["ध", "न", "्", "य", "व", "ा", "द"] },
  { word: "भारत", meaning: "India", letters: ["भ", "ा", "र", "त"] },
  { word: "माता", meaning: "Mother", letters: ["म", "ा", "त", "ा"] },
  { word: "पिता", meaning: "Father", letters: ["प", "ि", "त", "ा"] },
  { word: "पानी", meaning: "Water", letters: ["प", "ा", "न", "ी"] },
  { word: "खाना", meaning: "Food", letters: ["ख", "ा", "न", "ा"] },
  { word: "स्कूल", meaning: "School", letters: ["स", "्", "क", "ू", "ल"] },
]

type DraggableLetter = {
  id: string
  letter: string
  position: number
}

export default function WordBuilderPage() {
  const [currentLevel, setCurrentLevel] = useState(0)
  const [availableLettersForLevel, setAvailableLettersForLevel] = useState<DraggableLetter[]>([])
  const [wordToForm, setWordToForm] = useState<string>("")
  const [wordMeaning, setWordMeaning] = useState<string>("")
  const [userWord, setUserWord] = useState<DraggableLetter[]>([])
  const [draggedLetter, setDraggedLetter] = useState<DraggableLetter | null>(null)
  const [score, setScore] = useState(0)
  const [showHint, setShowHint] = useState(true) // Always show hint by default
  const [gameStarted, setGameStarted] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy")
  const [showConfetti, setShowConfetti] = useState(false)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [highlightedLetter, setHighlightedLetter] = useState<string | null>(null)

  const dropAreaRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const { addPoints, unlockAchievement } = useUser()

  // Initialize game
  useEffect(() => {
    if (gameStarted) {
      initializeLevel(currentLevel)
    }
  }, [gameStarted, currentLevel, difficulty])

  // Highlight a letter to guide the user
  useEffect(() => {
    if (gameStarted && !gameCompleted && wordToForm) {
      // Find the next letter that should be added
      const currentWordLength = userWord.length
      if (currentWordLength < wordsList[currentLevel].letters.length) {
        const nextLetter = wordsList[currentLevel].letters[currentWordLength]
        setHighlightedLetter(nextLetter)
      } else {
        setHighlightedLetter(null)
      }
    }
  }, [gameStarted, gameCompleted, wordToForm, userWord.length, currentLevel])

  const initializeLevel = (level: number) => {
    // Reset state for new level
    setUserWord([])
    setShowHint(true) // Always show hint

    // Get word for current level
    const currentWord = wordsList[level]
    setWordToForm(currentWord.word)
    setWordMeaning(currentWord.meaning)

    // Create available letters based on difficulty
    let letters: DraggableLetter[] = []

    // Add the letters needed to form the word
    currentWord.letters.forEach((letter, index) => {
      letters.push({
        id: `word-${index}`,
        letter,
        position: index,
      })
    })

    // Add extra letters based on difficulty
    const extraLettersCount = difficulty === "easy" ? 4 : difficulty === "medium" ? 8 : 12

    for (let i = 0; i < extraLettersCount; i++) {
      // Get random letter that's not already in our letters array
      let randomLetter
      do {
        randomLetter = availableLetters[Math.floor(Math.random() * availableLetters.length)]
      } while (letters.some((l) => l.letter === randomLetter))

      letters.push({
        id: `extra-${i}`,
        letter: randomLetter,
        position: currentWord.letters.length + i,
      })
    }

    // Shuffle letters
    letters = shuffleArray(letters)

    // Update position after shuffle
    letters = letters.map((letter, index) => ({
      ...letter,
      position: index,
    }))

    setAvailableLettersForLevel(letters)

    // Set the first letter to highlight
    if (currentWord.letters.length > 0) {
      setHighlightedLetter(currentWord.letters[0])
    }
  }

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  const handleDragStart = (letter: DraggableLetter) => {
    setDraggedLetter(letter)
  }

  const handleDragEnd = () => {
    setDraggedLetter(null)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()

    if (!draggedLetter) return

    // Check if letter is from available letters or user word
    const isFromAvailable = availableLettersForLevel.some((l) => l.id === draggedLetter.id)

    if (isFromAvailable) {
      // Add to user word
      setUserWord((prev) => [...prev, draggedLetter])

      // Remove from available letters
      setAvailableLettersForLevel((prev) => prev.filter((l) => l.id !== draggedLetter.id))
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const removeLetter = (letter: DraggableLetter) => {
    // Remove from user word
    setUserWord((prev) => prev.filter((l) => l.id !== letter.id))

    // Add back to available letters
    setAvailableLettersForLevel((prev) => [...prev, letter])
  }

  const checkWord = () => {
    const formedWord = userWord.map((l) => l.letter).join("")

    if (formedWord === wordToForm) {
      // Correct word
      const pointsEarned = difficulty === "easy" ? 10 : difficulty === "medium" ? 20 : 30
      setScore((prev) => prev + pointsEarned)

      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)

      toast({
        title: "Correct!",
        description: `${wordToForm} means "${wordMeaning}" in English`,
        variant: "success",
      })

      // Move to next level or complete game
      if (currentLevel < wordsList.length - 1) {
        setTimeout(() => {
          setCurrentLevel((prev) => prev + 1)
        }, 1500)
      } else {
        handleGameComplete()
      }
    } else {
      // Incorrect word
      toast({
        title: "Incorrect",
        description: "Try rearranging the letters to form the correct word",
        variant: "warning",
      })
    }
  }

  const showWordHint = () => {
    setShowHint(true)
    setHintsUsed((prev) => prev + 1)

    toast({
      title: "Hint",
      description: `This word means "${wordMeaning}" in English`,
      variant: "info",
    })
  }

  const resetLevel = () => {
    initializeLevel(currentLevel)
  }

  const handleGameComplete = () => {
    setGameCompleted(true)
    setShowConfetti(true)

    // Calculate final score
    const hintPenalty = hintsUsed * 5
    const finalScore = Math.max(score - hintPenalty, 0)

    // Add points to user account
    addPoints(finalScore)

    // Unlock achievement if applicable
    if (difficulty === "hard" && hintsUsed <= 2) {
      unlockAchievement("word-master")
    }

    toast({
      title: "Game Completed!",
      description: `You scored ${finalScore} points!`,
      variant: "success",
    })

    // Hide confetti after a few seconds
    setTimeout(() => {
      setShowConfetti(false)
    }, 3000)
  }

  const startNewGame = () => {
    setGameStarted(true)
    setCurrentLevel(0)
    setScore(0)
    setHintsUsed(0)
    setGameCompleted(false)
  }

  const changeDifficulty = (newDifficulty: "easy" | "medium" | "hard") => {
    setDifficulty(newDifficulty)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-300 via-teal-300 to-cyan-300 animate-gradient-x overflow-hidden relative pt-20">
      <FloatingElements />
      {showConfetti && <ConfettiEffect />}

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Link href="/games">
              <Button variant="outline" className="rounded-full bg-white/80 hover:bg-white border-emerald-300">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Games
              </Button>
            </Link>
            <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 flex items-center">
              <Puzzle className="h-8 w-8 mr-2 text-emerald-600" />
              Word Builder
            </h1>
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border-4 border-emerald-400 mb-8">
            {!gameStarted ? (
              <div className="text-center py-8">
                <h2 className="text-2xl font-bold mb-4 text-emerald-700">Word Builder Game</h2>
                <p className="text-lg mb-8 text-gray-700 max-w-2xl mx-auto">
                  Drag and drop letters to form Devanagari words. Test your vocabulary and spelling skills!
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
                    Easy (Few Extra Letters)
                  </Button>
                  <Button
                    onClick={() => changeDifficulty("medium")}
                    className={`rounded-xl px-6 py-3 ${
                      difficulty === "medium"
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 border-2 border-blue-400"
                        : "bg-blue-100 text-blue-800 border border-blue-300"
                    }`}
                  >
                    Medium (More Letters)
                  </Button>
                  <Button
                    onClick={() => changeDifficulty("hard")}
                    className={`rounded-xl px-6 py-3 ${
                      difficulty === "hard"
                        ? "bg-gradient-to-r from-red-500 to-red-600 border-2 border-red-400"
                        : "bg-red-100 text-red-800 border border-red-300"
                    }`}
                  >
                    Hard (Many Extra Letters)
                  </Button>
                </div>

                <Button
                  onClick={startNewGame}
                  className="text-xl py-6 px-10 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-xl border-2 border-emerald-400"
                >
                  Start Game
                </Button>
              </div>
            ) : (
              <>
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                  <div className="flex gap-4 mb-4 sm:mb-0">
                    <div className="bg-emerald-100 rounded-lg px-4 py-2 border border-emerald-300 flex items-center">
                      <Star className="h-5 w-5 mr-2 text-emerald-600" />
                      <span className="font-medium text-emerald-800">Score: {score}</span>
                    </div>
                    <div className="bg-blue-100 rounded-lg px-4 py-2 border border-blue-300 flex items-center">
                      <span className="font-medium text-blue-800">
                        Level: {currentLevel + 1}/{wordsList.length}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={resetLevel} className="rounded-lg bg-red-500 hover:bg-red-600">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </div>

                {!gameCompleted && (
                  <>
                    <div className="bg-amber-100 rounded-lg p-4 border border-amber-300 mb-4 text-center">
                      <p className="text-amber-800 font-bold text-lg mb-1">
                        Build the word: <span className="text-2xl">{wordToForm}</span>
                      </p>
                      <p className="text-amber-700">Meaning: "{wordMeaning}" in English</p>
                      <p className="mt-2 text-amber-800 flex items-center justify-center">
                        <ArrowDown className="h-5 w-5 mr-1 animate-bounce" />
                        Drag the highlighted letters to the box below
                      </p>
                    </div>

                    <div
                      ref={dropAreaRef}
                      className="min-h-32 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 border-2 border-dashed border-emerald-300 mb-6 flex flex-wrap gap-2 items-center justify-center"
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                    >
                      {userWord.length === 0 ? (
                        <p className="text-emerald-500 text-lg">Drag letters here to form a word</p>
                      ) : (
                        userWord.map((letter, index) => (
                          <div
                            key={letter.id}
                            className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-emerald-200 to-teal-200 rounded-lg flex items-center justify-center text-2xl font-bold text-emerald-800 cursor-pointer hover:bg-emerald-300 transition-colors relative"
                            onClick={() => removeLetter(letter)}
                          >
                            {letter.letter}
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                              <X className="h-3 w-3" />
                            </span>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl p-4 border-2 border-emerald-300 mb-6">
                      <h3 className="text-lg font-bold text-emerald-800 mb-3 text-center">Available Letters</h3>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {availableLettersForLevel.map((letter) => (
                          <div
                            key={letter.id}
                            className={`w-10 h-10 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center text-xl font-bold cursor-grab shadow-md hover:shadow-lg transition-shadow ${
                              highlightedLetter === letter.letter
                                ? "bg-yellow-200 border-2 border-yellow-400 animate-pulse"
                                : "bg-white"
                            } ${highlightedLetter === letter.letter ? "text-emerald-800" : "text-emerald-800"}`}
                            draggable
                            onDragStart={() => handleDragStart(letter)}
                            onDragEnd={handleDragEnd}
                          >
                            {letter.letter}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <Button
                        onClick={checkWord}
                        className="text-lg py-4 px-8 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                        disabled={userWord.length === 0}
                      >
                        <Check className="h-5 w-5 mr-2" />
                        Check Word
                      </Button>
                    </div>
                  </>
                )}

                {gameCompleted && (
                  <div className="bg-gradient-to-r from-green-100 to-green-200 rounded-xl p-6 border-2 border-green-300 text-center">
                    <h3 className="text-2xl font-bold text-green-800 mb-2">Congratulations!</h3>
                    <p className="text-green-700 mb-4">
                      You completed all words with a score of {score - hintsUsed * 5}!
                    </p>
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

