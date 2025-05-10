"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FloatingElements } from "@/components/floating-elements"
import { ArrowLeft, Keyboard, RefreshCw, Volume2, CheckCircle, X, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@/contexts/user-context"
import { ConfettiEffect } from "@/components/confetti-effect"

// Sample words with their pronunciations
const wordsList = [
  { word: "नमस्ते", meaning: "Hello", pronunciation: "namaste" },
  { word: "धन्यवाद", meaning: "Thank you", pronunciation: "dhanyavaad" },
  { word: "भारत", meaning: "India", pronunciation: "bhaarat" },
  { word: "माता", meaning: "Mother", pronunciation: "maataa" },
  { word: "पिता", meaning: "Father", pronunciation: "pitaa" },
  { word: "पानी", meaning: "Water", pronunciation: "paanee" },
  { word: "खाना", meaning: "Food", pronunciation: "khaanaa" },
  { word: "स्कूल", meaning: "School", pronunciation: "skool" },
]

// Available Devanagari letters for the keyboard
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
  "्",
  "ा",
  "ि",
  "ी",
  "ु",
  "ू",
  "े",
  "ै",
  "ो",
  "ौ",
  "ं",
  "ः",
]

export default function SpellingBeePage() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [userInput, setUserInput] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy")
  const [showHint, setShowHint] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { toast } = useToast()
  const { addPoints, unlockAchievement } = useUser()

  const currentWord = wordsList[currentWordIndex]

  // Initialize game
  useEffect(() => {
    if (gameStarted) {
      initializeGame()
    }
  }, [gameStarted, currentWordIndex, difficulty])

  const initializeGame = () => {
    setUserInput("")
    setShowSuccess(false)
    setShowError(false)
    setShowHint(false)
    setAttempts(0)
  }

  const handleLetterClick = (letter: string) => {
    setUserInput(userInput + letter)
  }

  const handleBackspace = () => {
    setUserInput(userInput.slice(0, -1))
  }

  const handleClear = () => {
    setUserInput("")
  }

  const handleSubmit = () => {
    setAttempts(attempts + 1)

    if (userInput === currentWord.word) {
      // Correct answer
      handleCorrectAnswer()
    } else {
      // Wrong answer
      handleWrongAnswer()
    }
  }

  const handleCorrectAnswer = () => {
    setShowSuccess(true)
    setShowConfetti(true)

    // Calculate score based on difficulty and attempts
    const basePoints = difficulty === "easy" ? 10 : difficulty === "medium" ? 20 : 30
    const attemptsMultiplier = Math.max(1, 3 - attempts) / 3
    const pointsEarned = Math.round(basePoints * attemptsMultiplier)

    setScore((prev) => prev + pointsEarned)

    toast({
      title: "Correct!",
      description: `+${pointsEarned} points! "${currentWord.word}" means "${currentWord.meaning}"`,
      variant: "success",
    })

    // Hide confetti after a few seconds
    setTimeout(() => {
      setShowConfetti(false)
    }, 3000)
  }

  const handleWrongAnswer = () => {
    setShowError(true)

    toast({
      title: "Incorrect spelling",
      description: difficulty === "easy" ? "Try again! Check your spelling." : "Try again!",
      variant: "warning",
    })

    // Show hint after 2 failed attempts in easy mode
    if (difficulty === "easy" && attempts >= 1) {
      setShowHint(true)
    }

    // Auto-hide error message after 2 seconds
    setTimeout(() => {
      setShowError(false)
    }, 2000)
  }

  const handleNextWord = () => {
    if (currentWordIndex < wordsList.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1)
      initializeGame()
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
    if (difficulty === "hard" && score >= 150) {
      unlockAchievement("spelling-master")
    }

    toast({
      title: "Game Completed!",
      description: `You scored ${score} points!`,
      variant: "success",
    })
  }

  const playPronunciation = () => {
    // In a real implementation, you would play the actual audio file
    // For now, we'll use speech synthesis as a fallback
    if (isPlaying) return

    setIsPlaying(true)

    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(currentWord.pronunciation)
      utterance.lang = "hi-IN"
      utterance.onend = () => setIsPlaying(false)
      window.speechSynthesis.speak(utterance)
    } else {
      // Fallback to a beep sound
      const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2566/2566-preview.mp3")
      audio.onended = () => setIsPlaying(false)
      audio.play().catch((error) => {
        console.error("Error playing sound:", error)
        setIsPlaying(false)
      })
    }
  }

  const startNewGame = () => {
    setGameStarted(true)
    setCurrentWordIndex(0)
    setScore(0)
    setGameCompleted(false)
    initializeGame()
  }

  const changeDifficulty = (newDifficulty: "easy" | "medium" | "hard") => {
    setDifficulty(newDifficulty)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-amber-300 to-orange-300 animate-gradient-x overflow-hidden relative pt-20">
      <FloatingElements />
      {showConfetti && <ConfettiEffect />}

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Link href="/games">
              <Button variant="outline" className="rounded-full bg-white/80 hover:bg-white border-yellow-300">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Games
              </Button>
            </Link>
            <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-amber-600 flex items-center">
              <Keyboard className="h-8 w-8 mr-2 text-yellow-600" />
              Spelling Bee
            </h1>
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border-4 border-yellow-400 mb-8">
            {!gameStarted ? (
              <div className="text-center py-8">
                <h2 className="text-2xl font-bold mb-4 text-yellow-700">Spelling Bee Game</h2>
                <p className="text-lg mb-8 text-gray-700 max-w-2xl mx-auto">
                  Listen to the pronunciation and spell the word correctly using Devanagari letters!
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
                    Easy (With Hints)
                  </Button>
                  <Button
                    onClick={() => changeDifficulty("medium")}
                    className={`rounded-xl px-6 py-3 ${
                      difficulty === "medium"
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 border-2 border-blue-400"
                        : "bg-blue-100 text-blue-800 border border-blue-300"
                    }`}
                  >
                    Medium (No Hints)
                  </Button>
                  <Button
                    onClick={() => changeDifficulty("hard")}
                    className={`rounded-xl px-6 py-3 ${
                      difficulty === "hard"
                        ? "bg-gradient-to-r from-red-500 to-red-600 border-2 border-red-400"
                        : "bg-red-100 text-red-800 border border-red-300"
                    }`}
                  >
                    Hard (Limited Attempts)
                  </Button>
                </div>

                <Button
                  onClick={startNewGame}
                  className="text-xl py-6 px-10 rounded-full bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 shadow-xl border-2 border-yellow-400"
                >
                  Start Game
                </Button>
              </div>
            ) : (
              <>
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                  <div className="flex gap-4 mb-4 sm:mb-0">
                    <div className="bg-yellow-100 rounded-lg px-4 py-2 border border-yellow-300 flex items-center">
                      <span className="font-medium text-yellow-800">
                        Word: {currentWordIndex + 1}/{wordsList.length}
                      </span>
                    </div>
                    <div className="bg-amber-100 rounded-lg px-4 py-2 border border-amber-300 flex items-center">
                      <span className="font-medium text-amber-800">Score: {score}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={playPronunciation}
                      className={`rounded-lg ${isPlaying ? "bg-green-500" : "bg-blue-500 hover:bg-blue-600"}`}
                      disabled={isPlaying}
                    >
                      <Volume2 className="h-4 w-4 mr-2" />
                      Listen
                    </Button>
                  </div>
                </div>

                {!gameCompleted && (
                  <>
                    <div className="bg-yellow-100 p-4 rounded-lg mb-4 text-center">
                      <p className="text-yellow-800 font-medium">
                        Listen to the pronunciation and spell the word in Devanagari.
                        {difficulty === "easy" && " Click 'Listen' to hear it again."}
                      </p>
                    </div>

                    <div className="mb-6">
                      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-4 border-2 border-dashed border-amber-300 min-h-16 flex items-center justify-center">
                        <p className="text-3xl font-bold text-amber-800 tracking-wide">
                          {userInput || <span className="text-amber-400">Type your answer...</span>}
                        </p>
                      </div>

                      {showHint && (
                        <div className="mt-2 bg-blue-100 p-2 rounded-lg text-center">
                          <p className="text-blue-800">
                            <span className="font-bold">Hint:</span> This word means "{currentWord.meaning}" in English
                          </p>
                        </div>
                      )}

                      {showSuccess && (
                        <div className="mt-4 bg-gradient-to-r from-green-100 to-green-200 rounded-xl p-4 border-2 border-green-300 text-center">
                          <h3 className="text-xl font-bold text-green-800 mb-2">Correct!</h3>
                          <p className="text-green-700 mb-3">
                            "{currentWord.word}" means "{currentWord.meaning}" in English
                          </p>
                          <Button
                            onClick={handleNextWord}
                            className="rounded-xl bg-gradient-to-r from-green-500 to-green-600"
                          >
                            <ArrowRight className="h-4 w-4 mr-2" />
                            Next Word
                          </Button>
                        </div>
                      )}

                      {showError && (
                        <div className="mt-4 bg-gradient-to-r from-red-100 to-red-200 rounded-xl p-4 border-2 border-red-300 text-center">
                          <h3 className="text-xl font-bold text-red-800 mb-2">
                            <X className="h-5 w-5 inline-block mr-1" />
                            Incorrect
                          </h3>
                          <p className="text-red-700">Try again! Check your spelling.</p>
                        </div>
                      )}
                    </div>

                    <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl p-4 border-2 border-amber-300 mb-6">
                      <div className="grid grid-cols-10 gap-2 mb-4">
                        {availableLetters.slice(0, 30).map((letter, index) => (
                          <Button
                            key={index}
                            className="h-12 bg-white hover:bg-amber-50 text-amber-800 border border-amber-300"
                            onClick={() => handleLetterClick(letter)}
                          >
                            {letter}
                          </Button>
                        ))}
                      </div>
                      <div className="grid grid-cols-10 gap-2">
                        {availableLetters.slice(30, 50).map((letter, index) => (
                          <Button
                            key={index}
                            className="h-12 bg-white hover:bg-amber-50 text-amber-800 border border-amber-300"
                            onClick={() => handleLetterClick(letter)}
                          >
                            {letter}
                          </Button>
                        ))}
                        <Button
                          className="h-12 col-span-2 bg-red-500 hover:bg-red-600 text-white"
                          onClick={handleBackspace}
                        >
                          ←
                        </Button>
                        <Button
                          className="h-12 col-span-3 bg-gray-500 hover:bg-gray-600 text-white"
                          onClick={handleClear}
                        >
                          Clear
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <Button
                        onClick={handleSubmit}
                        className="text-lg py-4 px-8 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700"
                        disabled={userInput.length === 0 || showSuccess}
                      >
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Check Spelling
                      </Button>
                    </div>
                  </>
                )}

                {gameCompleted && (
                  <div className="bg-gradient-to-r from-green-100 to-green-200 rounded-xl p-6 border-2 border-green-300 text-center">
                    <h3 className="text-2xl font-bold text-green-800 mb-2">Congratulations!</h3>
                    <p className="text-green-700 mb-4">You've completed all words with a score of {score}!</p>
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
