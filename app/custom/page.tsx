"use client"

import { useState, useRef, useEffect } from "react"
import Canvas from "@/components/canvas"
import LetterTable from "@/components/letter-table"
import { Button } from "@/components/ui/button"
import VideoPlayer from "@/components/video-player"
import ColorPalette from "@/components/color-palette"
import PronunciationButton from "@/components/pronunciation-button"
import axios from "axios"
import { HelpCircle, RefreshCw, CheckCircle, Download, Star, Palette, Pencil } from "lucide-react"
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
// Sample Devanagari letters
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

export default function CustomPage() {
  const [selectedLetter, setSelectedLetter] = useState(devanagariLetters[0])
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null)
  const [prediction, setPrediction] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [penColor, setPenColor] = useState("#9333ea") // Default purple color
  const [showSuccess, setShowSuccess] = useState(false)
  const successSoundRef = useRef<HTMLAudioElement | null>(null)
  const pathname = usePathname();
    const router = useRouter();
  
    useEffect(() => {
      
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
      const openRoutes = ["/login", "/signup"]
  
      if (!isLoggedIn && !openRoutes.includes(pathname)) {
        router.push("/login")
      }
    }, [pathname]);
  // Initialize success sound
  useEffect(() => {
    successSoundRef.current = new Audio("/sounds/goodJob.mp3")
  }, [])
  const handleLetterSelect = (letter: string) => {
    setSelectedLetter(letter)
    setPrediction(null)
    setShowSuccess(false)
  }

  const handleClearCanvas = () => {
    if (canvasRef) {
      const context = canvasRef.getContext("2d")
      if (context) {
        context.clearRect(0, 0, canvasRef.width, canvasRef.height)
        setPrediction(null)
        setShowSuccess(false)
      }
    }
  }
  const currentLetter = selectedLetter;
 // console.log("This is the function i just created: " , currentLetter);
  
 const handleCheckLetter = async () => {
  if (!canvasRef) return;

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
    tempCanvas.toBlob(async (blob) => {
      if (!blob) return;

      // ✅ 1. Automatically download the image locally
      // const downloadUrl = URL.createObjectURL(blob);
      // const a = document.createElement("a");
      // a.href = downloadUrl;

      // // Generate file name like "अ_attempt.png"
      // const safeLetter = currentLetter || "letter";
      // a.download = `${safeLetter}_attempt.png`;

      // document.body.appendChild(a); // Required for Firefox
      // a.click();
      // document.body.removeChild(a);
      // URL.revokeObjectURL(downloadUrl); // Cleanup

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

      console.log("RESULTS");
      console.log("Expected:", currentLetter);
      console.log("Predicted:", predictedLetter);

      if (predictedLetter === currentLetter && successSoundRef.current) {
        successSoundRef.current.currentTime = 0;
        successSoundRef.current.play().catch((e) => console.error("Error playing sound:", e));
      }

    }, "image/png"); // Ensure PNG format

  } catch (error) {
    console.error("Error checking letter:", error);
    setPrediction("Error processing image");
  } finally {
    setIsLoading(false);
  }
};
  

  const toggleHelp = () => {
    setShowHelp(!showHelp)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 via-pink-300 to-yellow-200 animate-gradient-x py-6">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center text-primary flex items-center justify-center">
            <Palette className="h-8 w-8 mr-2 text-primary" />
            Custom Mode
            <Pencil className="h-8 w-8 ml-2 text-primary" />
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Letter Selection */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-4 border-purple-300">
              <h2 className="text-xl font-bold mb-4 text-primary text-center">Choose a Letter</h2>
              <LetterTable
                letters={devanagariLetters}
                selectedLetter={selectedLetter}
                onSelectLetter={handleLetterSelect}
              />
            </div>

            {/* Drawing Area */}
            <div className={`lg:col-span-2 ${showHelp ? "grid grid-cols-1 md:grid-cols-2 gap-6" : ""}`}>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-4 border-purple-300">
                {!showHelp && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left side - Reference and Help */}
                    <div>
                      {/* Reference Letter */}
                      <div className="w-5 flex justify-between items-center mb-3">
                        <h3 className="m-3 text-xl font-bold text-primary">Reference</h3>
                        <PronunciationButton letter={selectedLetter} />
                      </div>
                      <div className="bg-gradient-to-r from-indigo-100 to-purple-100 border-4 border-indigo-300 rounded-xl flex items-center justify-center h-40 text-7xl shadow-md mb-4">
                        {selectedLetter}
                      </div>

                      <Button
                        onClick={toggleHelp}
                        className="w-full rounded-full bg-yellow-500 hover:bg-yellow-600 text-white flex items-center justify-center gap-2"
                      >
                        <HelpCircle className="h-5 w-5" />
                        Show Help
                      </Button>
                    </div>

                    {/* Right side - Drawing Canvas */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-xl font-bold text-primary">Draw Here</h3>
                        <Button
                          onClick={() => handleClearCanvas()}
                          className="rounded-full bg-red-500 hover:bg-red-600 text-white"
                          size="sm"
                        >
                          <RefreshCw className="h-4 w-4 mr-1" />
                          <span>Clear</span>
                        </Button>
                      </div>

                      <Canvas setCanvasRef={setCanvasRef} penColor={penColor} ghostLetter={currentLetter}/>

                      <div className="mt-3 space-y-3">
                        <ColorPalette onColorChange={setPenColor} currentColor={penColor} />

                        <Button
                          onClick={handleCheckLetter}
                          disabled={isLoading}
                          className="w-full rounded-full bg-secondary hover:bg-secondary/90 flex items-center justify-center gap-2 py-4 text-lg"
                        >
                          {isLoading ? (
                            <>
                              <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent"></div>
                              <span>Checking...</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle className="h-5 w-5" />
                              <span>Check My Drawing</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {showHelp && (
                  <>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-xl font-bold text-primary">Reference</h3>
                      <div className="flex gap-2">
                        <PronunciationButton letter={selectedLetter} />
                        <Button
                          onClick={toggleHelp}
                          className="rounded-full bg-yellow-500 hover:bg-yellow-600 text-white"
                          size="sm"
                        >
                          <HelpCircle className="h-4 w-4 mr-1" />
                          Hide Help
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="bg-gradient-to-r from-indigo-100 to-purple-100 border-4 border-indigo-300 rounded-xl flex items-center justify-center h-40 text-7xl shadow-md mb-4">
                          {selectedLetter}
                        </div>

                        <VideoPlayer letter={selectedLetter} />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-xl font-bold text-primary">Draw Here</h3>
                          <Button
                            onClick={() => handleClearCanvas()}
                            className="rounded-full bg-red-500 hover:bg-red-600 text-white"
                            size="sm"
                          >
                            <RefreshCw className="h-4 w-4 mr-1" />
                            <span>Clear</span>
                          </Button>
                        </div>

                        <Canvas setCanvasRef={setCanvasRef} penColor={penColor} ghostLetter={currentLetter}/>

                        <div className="mt-3 space-y-3">
                          <ColorPalette onColorChange={setPenColor} currentColor={penColor} />

                          <Button
                            onClick={handleCheckLetter}
                            disabled={isLoading}
                            className="w-full rounded-full bg-secondary hover:bg-secondary/90 flex items-center justify-center gap-2 py-4 text-lg"
                          >
                            {isLoading ? (
                              <>
                                <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent"></div>
                                <span>Checking...</span>
                              </>
                            ) : (
                              <>
                                <CheckCircle className="h-5 w-5" />
                                <span>Check My Drawing</span>
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Success Message */}
                {showSuccess && (
                  <div className="mt-6 p-6 rounded-xl text-center bg-gradient-to-r from-green-200 to-green-300 border-4 border-green-400 animate-pulse">
                    <div className="flex justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-8 w-8 text-yellow-500 fill-yellow-500 animate-bounce"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        />
                      ))}
                    </div>
                    <h3 className="text-2xl font-bold text-green-800 mb-2">Great Job!</h3>
                    <p className="text-green-700">Your drawing has been saved!</p>
                    <Button
                      className="mt-3 bg-green-600 hover:bg-green-700 rounded-full"
                      onClick={() => {
                        if (canvasRef) {
                          const link = document.createElement("a")
                          link.href = canvasRef.toDataURL("image/png")
                          link.download = `letter-${selectedLetter}.png`
                          document.body.appendChild(link)
                          link.click()
                          document.body.removeChild(link)
                        }
                      }}
                    >
                      <Download className="h-5 w-5 mr-2" />
                      Download Again
                    </Button>
                  </div>
                )}

                {/* Prediction Result */}
                {prediction && (
  <div
    className="mt-6 p-6 rounded-xl text-center relative overflow-hidden"
    style={{
      background:
        prediction === currentLetter
          ? "linear-gradient(to right, #a7f3d0, #6ee7b7)"
          : "linear-gradient(to right, #fef2f2, #fecaca)",
    }}
  >
    {/* STARS FOR CORRECT PREDICTION */}
    {prediction === currentLetter && (
      <div className="flex justify-center mb-6">
        {[...Array(3)].map((_, i) => (
          <Star
            key={i}
            className="h-20 w-20 text-yellow-400 fill-yellow-400 mx-4 animate-bounce drop-shadow-[0_0_15px_gold]"
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: "1s",
            }}
          />
        ))}
      </div>
    )}

    {/* FRIENDLY EMOJIS FOR WRONG PREDICTION */}
    {prediction !== currentLetter && (
      <div className="flex justify-center mb-6">
        {["🙌", "👍"].map((icon, i) => (
          <div
            key={i}
            className="text-pink-600 text-6xl mx-4 animate-bounce"
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: "1s",
            }}
          >
            {icon}
          </div>
        ))}
      </div>
    )}

    <p
      className={`text-3xl font-extrabold mb-2 ${
        prediction === currentLetter ? "text-green-800" : "text-pink-700"
      }`}
    >
      {prediction === currentLetter ? "Great job! 🎉" : "Try Again! 💫"}
    </p>

    {prediction !== currentLetter && (
      <p className="mt-2 text-pink-600">
        Keep going! Look at the reference and give it another try. You're doing awesome! 🌈
      </p>
    )}
  </div>
)}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

