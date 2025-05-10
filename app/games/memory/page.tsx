"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FloatingElements } from "@/components/floating-elements"
import { ArrowLeft, Brain, RefreshCw, Trophy, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@/contexts/user-context"
import { ConfettiEffect } from "@/components/confetti-effect"

// Memory card pairs - letters and their meanings
const memoryPairs = [
  { letter: "अ", meaning: "a" },
  { letter: "आ", meaning: "aa" },
  { letter: "इ", meaning: "i" },
  { letter: "ई", meaning: "ee" },
  { letter: "उ", meaning: "u" },
  { letter: "ऊ", meaning: "oo" },
  { letter: "ए", meaning: "e" },
  { letter: "ऐ", meaning: "ai" },
]

// Card type
type Card = {
  id: number
  content: string
  type: "letter" | "meaning"
  flipped: boolean
  matched: boolean
  pairId: number
}

export default function MemoryGamePage() {
  const [cards, setCards] = useState<Card[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState<number>(0)
  const [moves, setMoves] = useState<number>(0)
  const [gameStarted, setGameStarted] = useState<boolean>(false)
  const [gameCompleted, setGameCompleted] = useState<boolean>(false)
  const [timer, setTimer] = useState<number>(0)
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy")
  const [showConfetti, setShowConfetti] = useState<boolean>(false)

  const { toast } = useToast()
  const { addPoints, unlockAchievement } = useUser()

  // Initialize game
  useEffect(() => {
    if (gameStarted) {
      initializeGame()
    }
  }, [gameStarted, difficulty])

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (gameStarted && !gameCompleted) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1)
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [gameStarted, gameCompleted])

  // Check for game completion
  useEffect(() => {
    if (gameStarted && matchedPairs === getPairsCount()) {
      handleGameComplete()
    }
  }, [matchedPairs, gameStarted])

  // Check for matches when two cards are flipped
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCardId, secondCardId] = flippedCards
      const firstCard = cards.find((card) => card.id === firstCardId)
      const secondCard = cards.find((card) => card.id === secondCardId)

      if (firstCard && secondCard) {
        // Increment moves
        setMoves((prev) => prev + 1)

        // Check if cards match (same pairId but different types)
        if (firstCard.pairId === secondCard.pairId && firstCard.type !== secondCard.type) {
          // Match found
          setCards((prev) =>
            prev.map((card) =>
              card.id === firstCardId || card.id === secondCardId ? { ...card, matched: true } : card,
            ),
          )
          setMatchedPairs((prev) => prev + 1)
          setFlippedCards([])

          toast({
            title: "Match found!",
            description: `${firstCard.type === "letter" ? firstCard.content : secondCard.content} = ${firstCard.type === "meaning" ? firstCard.content : secondCard.content}`,
            variant: "success",
          })
        } else {
          // No match, flip cards back after delay
          setTimeout(() => {
            setCards((prev) =>
              prev.map((card) =>
                card.id === firstCardId || card.id === secondCardId ? { ...card, flipped: false } : card,
              ),
            )
            setFlippedCards([])
          }, 1000)
        }
      }
    }
  }, [flippedCards, cards, toast])

  const getPairsCount = () => {
    switch (difficulty) {
      case "easy":
        return 4
      case "medium":
        return 6
      case "hard":
        return 8
      default:
        return 4
    }
  }

  const initializeGame = () => {
    // Reset game state
    setFlippedCards([])
    setMatchedPairs(0)
    setMoves(0)
    setTimer(0)
    setGameCompleted(false)

    // Get pairs based on difficulty
    const pairsToUse = memoryPairs.slice(0, getPairsCount())

    // Create cards array with letters and meanings
    let newCards: Card[] = []
    pairsToUse.forEach((pair, index) => {
      newCards.push({
        id: index * 2,
        content: pair.letter,
        type: "letter",
        flipped: false,
        matched: false,
        pairId: index,
      })

      newCards.push({
        id: index * 2 + 1,
        content: pair.meaning,
        type: "meaning",
        flipped: false,
        matched: false,
        pairId: index,
      })
    })

    // Shuffle cards
    newCards = shuffleArray(newCards)

    setCards(newCards)
  }

  const shuffleArray = (array: Card[]) => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  const handleCardClick = (id: number) => {
    // Ignore click if already two cards flipped or card is already flipped/matched
    if (flippedCards.length >= 2) return

    const clickedCard = cards.find((card) => card.id === id)
    if (!clickedCard || clickedCard.flipped || clickedCard.matched) return

    // Flip the card
    setCards((prev) => prev.map((card) => (card.id === id ? { ...card, flipped: true } : card)))

    // Add to flipped cards
    setFlippedCards((prev) => [...prev, id])
  }

  const handleGameComplete = () => {
    setGameCompleted(true)
    setShowConfetti(true)

    // Calculate score based on moves and time
    const basePoints = difficulty === "easy" ? 50 : difficulty === "medium" ? 100 : 150
    const movesPenalty = moves > getPairsCount() * 2 ? Math.floor((moves - getPairsCount() * 2) / 2) : 0
    const timePenalty = Math.floor(timer / 10)
    const finalScore = Math.max(basePoints - movesPenalty - timePenalty, 10)

    // Add points to user account
    addPoints(finalScore)

    // Unlock achievement if applicable
    if (difficulty === "hard" && moves <= getPairsCount() * 3) {
      unlockAchievement("memory-master")
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
  }

  const restartGame = () => {
    initializeGame()
  }

  const changeDifficulty = (newDifficulty: "easy" | "medium" | "hard") => {
    setDifficulty(newDifficulty)
    if (gameStarted) {
      initializeGame()
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 via-indigo-300 to-blue-300 animate-gradient-x overflow-hidden relative pt-20">
      <FloatingElements />
      {showConfetti && <ConfettiEffect />}

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Link href="/games">
              <Button variant="outline" className="rounded-full bg-white/80 hover:bg-white border-purple-300">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Games
              </Button>
            </Link>
            <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center">
              <Brain className="h-8 w-8 mr-2 text-purple-600" />
              Memory Match
            </h1>
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border-4 border-purple-400 mb-8">
            {!gameStarted ? (
              <div className="text-center py-8">
                <h2 className="text-2xl font-bold mb-4 text-purple-700">Memory Match Game</h2>
                <p className="text-lg mb-8 text-gray-700 max-w-2xl mx-auto">
                  Match Devanagari letters with their pronunciation. Flip cards to find matching pairs and test your
                  memory!
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
                    Easy (4 Pairs)
                  </Button>
                  <Button
                    onClick={() => changeDifficulty("medium")}
                    className={`rounded-xl px-6 py-3 ${
                      difficulty === "medium"
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 border-2 border-blue-400"
                        : "bg-blue-100 text-blue-800 border border-blue-300"
                    }`}
                  >
                    Medium (6 Pairs)
                  </Button>
                  <Button
                    onClick={() => changeDifficulty("hard")}
                    className={`rounded-xl px-6 py-3 ${
                      difficulty === "hard"
                        ? "bg-gradient-to-r from-red-500 to-red-600 border-2 border-red-400"
                        : "bg-red-100 text-red-800 border border-red-300"
                    }`}
                  >
                    Hard (8 Pairs)
                  </Button>
                </div>

                <Button
                  onClick={startNewGame}
                  className="text-xl py-6 px-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-xl border-2 border-purple-400"
                >
                  Start Game
                </Button>
              </div>
            ) : (
              <>
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                  <div className="flex gap-4 mb-4 sm:mb-0">
                    <div className="bg-purple-100 rounded-lg px-4 py-2 border border-purple-300 flex items-center">
                      <Trophy className="h-5 w-5 mr-2 text-purple-600" />
                      <span className="font-medium text-purple-800">
                        Pairs: {matchedPairs}/{getPairsCount()}
                      </span>
                    </div>
                    <div className="bg-blue-100 rounded-lg px-4 py-2 border border-blue-300 flex items-center">
                      <RefreshCw className="h-5 w-5 mr-2 text-blue-600" />
                      <span className="font-medium text-blue-800">Moves: {moves}</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="bg-amber-100 rounded-lg px-4 py-2 border border-amber-300 flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-amber-600" />
                      <span className="font-medium text-amber-800">Time: {formatTime(timer)}</span>
                    </div>
                    <Button onClick={restartGame} className="rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Restart
                    </Button>
                  </div>
                </div>

                <div className="bg-blue-100 p-4 rounded-lg mb-4 text-center">
                  <p className="text-blue-800 font-medium">
                    Match each Devanagari letter with its pronunciation. Click on cards to flip them!
                  </p>
                </div>

                <div
                  className={`grid gap-4 mb-6 ${
                    difficulty === "easy"
                      ? "grid-cols-2 sm:grid-cols-4"
                      : difficulty === "medium"
                        ? "grid-cols-3 sm:grid-cols-4"
                        : "grid-cols-4"
                  }`}
                >
                  {cards.map((card) => (
                    <div
                      key={card.id}
                      className={`aspect-square rounded-xl cursor-pointer transition-all duration-300 ${
                        card.flipped || card.matched
                          ? ""
                          : "bg-gradient-to-r from-purple-500 to-indigo-500 hover:scale-105"
                      } ${
                        card.matched ? "bg-gradient-to-r from-green-300 to-green-400 border-2 border-green-500" : ""
                      }`}
                      onClick={() => handleCardClick(card.id)}
                    >
                      <div
                        className={`w-full h-full flex items-center justify-center rounded-xl ${
                          card.flipped || card.matched
                            ? card.type === "letter"
                              ? "bg-gradient-to-r from-pink-100 to-purple-100 border-2 border-purple-300"
                              : "bg-gradient-to-r from-blue-100 to-indigo-100 border-2 border-blue-300"
                            : ""
                        }`}
                      >
                        {(card.flipped || card.matched) && (
                          <span
                            className={`text-4xl font-bold ${
                              card.type === "letter" ? "text-purple-700" : "text-blue-700"
                            }`}
                          >
                            {card.content}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {gameCompleted && (
                  <div className="bg-gradient-to-r from-green-100 to-green-200 rounded-xl p-6 border-2 border-green-300 text-center">
                    <h3 className="text-2xl font-bold text-green-800 mb-2">Congratulations!</h3>
                    <p className="text-green-700 mb-4">
                      You completed the game in {moves} moves and {formatTime(timer)}!
                    </p>
                    <div className="flex justify-center gap-4">
                      <Button onClick={restartGame} className="rounded-xl bg-gradient-to-r from-green-500 to-green-600">
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

