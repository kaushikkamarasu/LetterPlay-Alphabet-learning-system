"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VideoPlayerProps {
  letter: string
}

// Define video sources for each letter
const letterVideos: Record<string, string> = {
  अ: "/videos/a.mp4",
  आ: "/videos/aa.mp4",
  इ: "/videos/e.mp4",
  ई: "/videos/ee.mp4",
  उ: "/videos/u.mp4",
  ऊ: "/videos/uu.mp4",
  ए: "/videos/ae.mp4",
  ऐ: "/videos/aee.mp4",
  ओ: "/videos/o.mp4",
  औ: "/videos/ou.mp4",
  // Add more letters as needed
  default: "/videos/default.mp4", // Default video if the letter is not found
};

export default function VideoPlayer({ letter }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  // Get the correct video for the current letter
  const videoSrc = letterVideos[letter] || letterVideos["default"]

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateProgress = () => {
      const percentage = (video.currentTime / video.duration) * 100
      setProgress(percentage)
    }

    if (isPlaying) {
      video.play()
      video.addEventListener("timeupdate", updateProgress)
    } else {
      video.pause()
      video.removeEventListener("timeupdate", updateProgress)
    }

    return () => {
      video.removeEventListener("timeupdate", updateProgress)
    }
  }, [isPlaying])

  const togglePlay = () => {
    setIsPlaying((prev) => !prev)
  }

  const resetVideo = () => {
    const video = videoRef.current
    if (!video) return
    video.pause()
    video.currentTime = 0
    setIsPlaying(false)
    setProgress(0)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 border-4 border-purple-300">
      <h3 className="text-lg font-bold mb-2 text-center text-primary">How to Draw "{letter}"</h3>

      <div className="relative">
        {/* Video Element */}
        <video ref={videoRef} width={200} height={200} className="w-full h-auto bg-black rounded-lg" src={videoSrc} />

        {/* Progress bar */}
        <div className="h-2 bg-gray-200 rounded-full mt-2">
          <div
            className="h-2 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex justify-center mt-3 space-x-2">
        <Button onClick={togglePlay} size="sm" className="rounded-full bg-primary hover:bg-primary/90">
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>

        <Button onClick={resetVideo} size="sm" variant="outline" className="rounded-full">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
