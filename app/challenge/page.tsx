"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Canvas from "@/components/canvas"
import { FloatingElements } from "@/components/floating-elements"
import { ConfettiEffect } from "@/components/confetti-effect"
import { Zap, Clock, CheckCircle, RefreshCw, Trophy, ArrowLeft } from "lucide-react"
import { useUser } from "@/contexts/user-context"
import { useToast } from "@/hooks/use-toast"
import axios from "axios"
// Sample Devanagari letters for the challenge
const challengeLetters = ["क", "ख", "ग", "घ", "ङ", "च", "छ", "ज"]

export default function ChallengePage() {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [score, setScore] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [prediction, setPrediction] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [penColor, setPenColor] = useState("#9333ea")
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const { addPoints, updateAchievementProgress } = useUser()
  const { toast } = useToast()

  const currentLetter = challengeLetters[currentLetterIndex]

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0 && isPlaying) {
      endGame()
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [timeLeft, isPlaying])

  const startGame = () => {
    setIsPlaying(true)
    setScore(0)
    setCurrentLetterIndex(0)
    setTimeLeft(60)
    setGameOver(false)

    toast({
      title: "Challenge started!",
      description: "Draw as many letters as you can before time runs out",
      variant: "info",
    })
  }

  const endGame = () => {
    setIsPlaying(false)
    setGameOver(true)
    if (timerRef.current) clearTimeout(timerRef.current)

    // Add points to user account
    addPoints(score)

    // Update achievement progress
    updateAchievementProgress("top-scorer", score, 500)

    toast({
      title: "Challenge complete!",
      description: `You scored ${score} points`,
      variant: "success",
    })
  }

  const handleClearCanvas = () => {
    if (canvasRef) {
      const context = canvasRef.getContext("2d")
      if (context) {
        context.clearRect(0, 0, canvasRef.width, canvasRef.height)
      }
    }
  }

  const handleSubmit = () => {
    if (!isPlaying) return

    // In a real app, we would check the drawing against the expected letter
    // For now, we'll just simulate a successful submission
    let isCorrect = false; // 70% chance of success for demo

    try {
      setIsLoading(true);
      setPrediction(null);
  
      // Create an offscreen canvas
      const tempCanvas = document.createElement("canvas");
      const ctx = tempCanvas.getContext("2d");
  
      if (!ctx || !canvasRef) return;
  
      // Set the same size as the original canvas
      tempCanvas.width = canvasRef.width;
      tempCanvas.height = canvasRef.height;
  
      // Fill with white background
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
  
      // Draw the original canvas (strokes) on top
      ctx.drawImage(canvasRef, 0, 0);
  
      // Convert the final image to a blob and send it
      tempCanvas.toBlob(async(blob) => {
        if (!blob) return;
  
        // ✅ 1. Automatically download the image locally
        // const downloadUrl = URL.createObjectURL(blob);
        // const a = document.createElement("a");
        // a.href = downloadUrl;
  
        // // // Generate file name like "अ_attempt.png"
        //  const safeLetter = currentLetter || "letter";
        //  a.download = `${safeLetter}_attempt.png`;
  
        // document.body.appendChild(a); // Required for Firefox
        //  a.click();
        // document.body.removeChild(a);
        //  URL.revokeObjectURL(downloadUrl); // Cleanup
  
        // ✅ 2. Send to backend as before
        const formData = new FormData();
        formData.append("image", blob, "image.png");
  
        const response = await axios.post("http://localhost:5000/predict", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        const predictedLetter = response.data.predicted_letter;
        setPrediction(predictedLetter);
        if(predictedLetter===currentLetter) isCorrect=true;
        
        console.log("RESULTS");
        console.log("Expected:", currentLetter);
        console.log("Predicted:", predictedLetter);
  
        if (isCorrect) {
          const pointsEarned = 10
          setScore(score + pointsEarned)
          setShowSuccess(true)
    
          toast({
            title: "Correct!",
            description: `+${pointsEarned} points`,
            variant: "success",
          })
    
          setTimeout(() => {
            setShowSuccess(false)
            handleClearCanvas()
    
            // Move to next letter or end game if all letters are done
            if (currentLetterIndex < challengeLetters.length - 1) {
              setCurrentLetterIndex(currentLetterIndex + 1)
            } else {
              // Add bonus time for completing all letters
              setTimeLeft((prev) => prev + 15)
              setCurrentLetterIndex(0) // Restart with the first letter but keep the score
    
              toast({
                title: "Bonus time!",
                description: "+15 seconds for completing all letters",
                variant: "info",
              })
            }
          }, 1000)
        } else {
          // Penalty for incorrect submission
          const penalty = 5
          setTimeLeft((prev) => Math.max(0, prev - penalty))
    
          toast({
            title: "Incorrect",
            description: `-${penalty} seconds penalty`,
            variant: "warning",
          })
        }
  
      }, "image/png"); // Ensure PNG format
  
    } catch (error) {
      console.error("Error checking letter:", error);
      setPrediction("Error processing image");
    } finally {
      setIsLoading(false);
    }
   
    
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-300 via-orange-300 to-red-300 animate-gradient-x overflow-hidden relative">
      <FloatingElements />
      {showSuccess && <ConfettiEffect />}

      <div className="container mx-auto py-8 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Link href="/dashboard">
              <Button variant="outline" className="rounded-full bg-white/80 hover:bg-white border-amber-300">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-red-600 flex items-center">
              <Zap className="h-8 w-8 mr-2 text-amber-600" />
              Time Challenge
            </h1>
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>

          {!isPlaying && !gameOver && (
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-amber-400 text-center">
              <h2 className="text-2xl font-bold mb-4 text-amber-700">Challenge Mode</h2>
              <p className="text-lg mb-6 text-gray-700">
                Draw as many letters as you can before time runs out! Each correct letter gives you 10 points.
              </p>
              <Button
                onClick={startGame}
                className="text-xl py-6 px-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-xl border-2 border-amber-400"
              >
                <Zap className="h-6 w-6 mr-2" />
                Start Challenge
              </Button>
            </div>
          )}

          {gameOver && (
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-amber-400 text-center">
              <h2 className="text-3xl font-bold mb-2 text-amber-700">Challenge Complete!</h2>
              <p className="text-xl mb-6 text-gray-700">
                Your final score: <span className="font-bold text-amber-600">{score}</span> points
              </p>
              <div className="flex justify-center gap-4 mb-6">
                <div className="bg-amber-100 rounded-xl p-4 border-2 border-amber-300 w-32 text-center">
                  <Trophy className="h-8 w-8 mx-auto text-amber-600 mb-1" />
                  <p className="text-sm text-amber-800">Score</p>
                  <p className="text-2xl font-bold text-amber-700">{score}</p>
                </div>
                <div className="bg-orange-100 rounded-xl p-4 border-2 border-orange-300 w-32 text-center">
                  <Clock className="h-8 w-8 mx-auto text-orange-600 mb-1" />
                  <p className="text-sm text-orange-800">Time</p>
                  <p className="text-2xl font-bold text-orange-700">30s</p>
                </div>
              </div>
              <div className="flex justify-center gap-4">
                <Button
                  onClick={startGame}
                  className="py-6 px-8 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-lg border-2 border-amber-400"
                >
                  <RefreshCw className="h-5 w-5 mr-2" />
                  Play Again
                </Button>
                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    className="py-6 px-8 rounded-xl bg-white hover:bg-gray-100 shadow-lg border-2 border-gray-300"
                  >
                    Back to Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {isPlaying && (
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border-4 border-amber-400">
              <div className="flex justify-between items-center mb-4">
                <div className="bg-amber-100 rounded-full px-4 py-2 border-2 border-amber-300">
                  <p className="font-bold text-amber-800">
                    Score: <span className="text-amber-600">{score}</span>
                  </p>
                </div>
                <div className="bg-red-100 rounded-full px-4 py-2 border-2 border-red-300 flex items-center">
                  <Clock className="h-5 w-5 mr-1 text-red-600" />
                  <p className="font-bold text-red-800">{timeLeft}</p>
                </div>
              </div>

              <Progress value={(timeLeft / 30) * 100} className="h-3 mb-6" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold mb-3 text-amber-700 text-center">Draw This Letter</h3>
                  <div className="bg-gradient-to-r from-amber-100 to-orange-100 border-4 border-amber-300 rounded-xl flex items-center justify-center h-48 text-8xl shadow-md">
                    {currentLetter}
                  </div>
                  <p className="text-center mt-2 text-gray-600">
                    Letter {currentLetterIndex + 1} of {challengeLetters.length}
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-bold text-amber-700">Your Drawing</h3>
                    <Button
                      onClick={handleClearCanvas}
                      className="rounded-full bg-red-500 hover:bg-red-600 text-white"
                      size="sm"
                    >
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Clear
                    </Button>
                  </div>

                  <Canvas setCanvasRef={setCanvasRef} penColor={penColor} ghostLetter={currentLetter}/>

                  <Button
                    onClick={handleSubmit}
                    className="w-full mt-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 py-4 text-lg"
                  >
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Submit
                  </Button>
                </div>
              </div>

              {showSuccess && (
                <div className="mt-4 p-4 rounded-xl text-center bg-gradient-to-r from-green-200 to-green-300 border-2 border-green-400 animate-pulse">
                  <p className="text-xl font-bold text-green-800">Correct! +10 points</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

