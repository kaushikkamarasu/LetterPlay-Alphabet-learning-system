"use client"

import { useState, useEffect } from "react"
import Canvas from "./canvas"
import ProgressBar from "./progress-bar"
import LetterTable from "./letter-table"
import { Button } from "@/components/ui/button"
import axios from "axios"

// Sample Devanagari letters (would be replaced with actual letters)
const devanagariLetters = [
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

interface LetterPlayProps {
  mode: "practice" | "custom"
}

const LetterPlay = ({ mode }: LetterPlayProps) => {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0)
  const [selectedLetter, setSelectedLetter] = useState(devanagariLetters[0])
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null)
  const [prediction, setPrediction] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (mode === "practice") {
      setSelectedLetter(devanagariLetters[currentLetterIndex])
    }
  }, [currentLetterIndex, mode])

  const handlePrevious = () => {
    if (currentLetterIndex > 0) {
      setCurrentLetterIndex(currentLetterIndex - 1)
    }
  }

  const handleNext = () => {
    if (currentLetterIndex < devanagariLetters.length - 1) {
      setCurrentLetterIndex(currentLetterIndex + 1)
    }
  }

  const handleLetterSelect = (letter: string) => {
    setSelectedLetter(letter)
  }

  const handleClearCanvas = () => {
    if (canvasRef) {
      const context = canvasRef.getContext("2d")
      if (context) {
        context.clearRect(0, 0, canvasRef.width, canvasRef.height)
        setPrediction(null)
      }
    }
  }

  const handleCheckLetter = async () => {
    if (!canvasRef) return

    try {
      setIsLoading(true)
      setPrediction(null)

      // Get the canvas data as a PNG
      const imageData = canvasRef.toDataURL("image/png")

      // Download locally (for demonstration)
      const link = document.createElement("a")
      link.href = imageData
      link.download = "drawn-letter.png"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Send to backend for prediction
      const response = await axios.post("/api/check-letter", {
        image: imageData.split(",")[1], // Remove the data:image/png;base64, part
      })

      setPrediction(response.data.prediction)
    } catch (error) {
      console.error("Error checking letter:", error)
      setPrediction("Error processing image")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left side - Letter selection (in Custom Mode) */}
      <div
        className={`w-full lg:w-1/3 transition-all duration-300 ${mode === "custom" ? "opacity-100" : "opacity-0 lg:hidden"}`}
      >
        {mode === "custom" && (
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 border border-white/20">
            <h2 className="text-xl font-semibold mb-4 text-primary">Select a Letter</h2>
            <LetterTable
              letters={devanagariLetters}
              selectedLetter={selectedLetter}
              onSelectLetter={handleLetterSelect}
            />
          </div>
        )}
      </div>

      {/* Right side - Drawing area */}
      <div className={`w-full ${mode === "custom" ? "lg:w-2/3" : "lg:w-full"}`}>
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-white/20">
          {mode === "practice" && (
            <div className="mb-6">
              <ProgressBar current={currentLetterIndex + 1} total={devanagariLetters.length} />
              <div className="flex justify-between mt-4">
                <Button
                  onClick={handlePrevious}
                  disabled={currentLetterIndex === 0}
                  variant="outline"
                  className="bg-blue-500 hover:bg-blue-600 text-white border-blue-600"
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={currentLetterIndex === devanagariLetters.length - 1}
                  variant="outline"
                  className="bg-green-500 hover:bg-green-600 text-white border-green-600"
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-6 items-center">
            {/* Reference Canvas */}
            <div className="w-full md:w-1/3">
              <h3 className="text-lg font-bold mb-2 text-primary">Reference Letter</h3>
              <div className="bg-gradient-to-r from-indigo-100 to-purple-100 border-4 border-indigo-300 rounded-lg flex items-center justify-center h-48 text-6xl shadow-md">
                {selectedLetter}
              </div>
            </div>

            {/* Drawing Canvas */}
            <div className="w-full md:w-2/3">
              <h3 className="text-lg font-medium mb-2 text-primary">Draw Here</h3>
              <Canvas setCanvasRef={setCanvasRef} penColor="black" ghostLetter={selectedLetter}/>

              <div className="flex justify-between mt-4">
                <Button
                  onClick={handleClearCanvas}
                  variant="outline"
                  className="bg-red-500 hover:bg-red-600 text-white border-red-600"
                >
                  Clear
                </Button>

                <Button onClick={handleCheckLetter} disabled={isLoading} className="bg-secondary hover:bg-secondary/90">
                  {isLoading ? "Checking..." : "Check Letter"}
                </Button>
              </div>

              {prediction && (
                <div
                  className="mt-4 p-4 rounded-lg"
                  style={{
                    background:
                      prediction === selectedLetter
                        ? "linear-gradient(to right, #a7f3d0, #6ee7b7)"
                        : "linear-gradient(to right, #fecaca, #f87171)",
                  }}
                >
                  <p className="font-bold">
                    Predicted Letter: <span className="text-xl">{prediction}</span>
                  </p>
                  <p className="text-sm mt-1 font-medium">
                    {prediction === selectedLetter
                      ? "✅ Great job! Your handwriting is correct."
                      : "❌ Try again. Your handwriting needs improvement."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LetterPlay

