"use client"

import { useState } from "react"
import { Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PronunciationButtonProps {
  letter: string
}

// Map of letters to their pronunciation audio files
const letterSounds: Record<string, string> = {
  अ: "/sounds/a.mp3",
  आ: "/sounds/aa.mp3",
  इ: "/sounds/e.mp3",
  ई: "/sounds/ee.mp3",
  उ: "/sounds/u.mp3",
  ऊ: "/sounds/uu.mp3",
  ए: "/sounds/e.mp3",
  ऐ: "/sounds/ai.mp3",
  ओ: "/sounds/o.mp3",
  औ: "/sounds/au.mp3",

  क: "/sounds/ka.mp3",
  ख: "/sounds/kha.mp3",
  ग: "/sounds/ga.mp3",
  घ: "/sounds/gha.mp3",
  ङ: "/sounds/nga.mp3",

  च: "/sounds/cha.mp3",
  छ: "/sounds/chha.mp3",
  ज: "/sounds/ja.mp3",
  झ: "/sounds/jha.mp3",
  ञ: "/sounds/nya.mp3",

  ट: "/sounds/tta.mp3",
  ठ: "/sounds/ttha.mp3",
  ड: "/sounds/dda.mp3",
  ढ: "/sounds/ddha.mp3",
  ण: "/sounds/na.mp3",

  त: "/sounds/ta.mp3",
  थ: "/sounds/tha.mp3",
  द: "/sounds/da.mp3",
  ध: "/sounds/dha.mp3",
  न: "/sounds/na.mp3",

  प: "/sounds/pa.mp3",
  फ: "/sounds/pha.mp3",
  ब: "/sounds/ba.mp3",
  भ: "/sounds/bha.mp3",
  म: "/sounds/ma.mp3",

  य: "/sounds/ya.mp3",
  र: "/sounds/ra.mp3",
  ल: "/sounds/la.mp3",
  व: "/sounds/va.mp3",

  श: "/sounds/sha.mp3",
  ष: "/sounds/ssha.mp3",
  स: "/sounds/sa.mp3",
  ह: "/sounds/ha.mp3",

  // Fallback sound for missing entries
  default: "https://assets.mixkit.co/active_storage/sfx/2566/2566-preview.mp3",
}



export default function PronunciationButton({ letter }: PronunciationButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const playSound = () => {
    if (isPlaying) return

    // Get the correct sound for the letter
    const soundUrl = letterSounds[letter] || letterSounds["default"]
    const audio = new Audio(soundUrl)

    // Set playing state
    setIsPlaying(true)

    // Play audio
    audio.play()
      .then(() => {
        audio.onended = () => setIsPlaying(false)
      })
      .catch((error) => {
        console.error("Error playing sound:", error)
        setIsPlaying(false)
      })
  }

  return (
    <Button
      onClick={playSound}
      className={`rounded-full ${
        isPlaying ? "bg-green-500 hover:bg-green-600 animate-pulse" : "bg-blue-500 hover:bg-blue-600"
      }`}
      size="sm"
    >
      <Volume2 className="h-5 w-5 mr-1" />
      <span>Hear It</span>
    </Button>
  )
}
