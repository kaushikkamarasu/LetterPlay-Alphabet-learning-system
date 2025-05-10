"use client"

import { useEffect } from "react"
import confetti from "canvas-confetti"

export function ConfettiEffect() {
  useEffect(() => {
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      // Since particles fall down, start a bit higher than random
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ["#9333EA", "#EC4899", "#3B82F6", "#10B981", "#F59E0B"],
        }),
      )
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ["#9333EA", "#EC4899", "#3B82F6", "#10B981", "#F59E0B"],
        }),
      )
    }, 250)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return null
}

