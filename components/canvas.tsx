"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { useMobile } from "@/hooks/use-mobile"

interface CanvasProps {
  setCanvasRef: (ref: HTMLCanvasElement | null) => void
  penColor: string
  ghostLetter: string
}

const Canvas = ({ setCanvasRef, penColor, ghostLetter }: CanvasProps) => {
  const drawingCanvasRef = useRef<HTMLCanvasElement>(null)
  const silhouetteCanvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const isMobile = useMobile()

  // 🧠 Resize both canvases consistently
  const resizeCanvases = () => {
    const drawingCanvas = drawingCanvasRef.current
    const silhouetteCanvas = silhouetteCanvasRef.current
    const parent = drawingCanvas?.parentElement

    if (!drawingCanvas || !silhouetteCanvas || !parent) return

    drawingCanvas.width = parent.clientWidth
    drawingCanvas.height = 300
    silhouetteCanvas.width = parent.clientWidth
    silhouetteCanvas.height = 300
  }

  // 🖌️ Draw the silhouette ghost letter
  const drawGhostLetter = () => {
    const canvas = silhouetteCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.lineWidth = 20
    ctx.font = "270px sans-serif"
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(ghostLetter, canvas.width / 2, canvas.height / 2)
  }

  // 🧠 Resize + draw ghost on mount and on ghostLetter change
  useEffect(() => {
    resizeCanvases()
    drawGhostLetter()

    window.addEventListener("resize", () => {
      resizeCanvases()
      drawGhostLetter()
    })

    return () => {
      window.removeEventListener("resize", () => {
        resizeCanvases()
        drawGhostLetter()
      })
    }
  }, [ghostLetter])

  // ✅ Set drawing canvas reference + initialize it
  useEffect(() => {
    const canvas = drawingCanvasRef.current
    if (!canvas) return
  
    setCanvasRef(canvas)
  
    const ctx = canvas.getContext("2d")
    if (!ctx) return
  
    ctx.lineWidth = 20 // 👈 apply again!
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.strokeStyle = penColor
  }, [setCanvasRef, ghostLetter]) // 👈 add ghostLetter here
  

  // 🎨 Update pen color
  useEffect(() => {
    const ctx = drawingCanvasRef.current?.getContext("2d")
    if (ctx) ctx.strokeStyle = penColor
  }, [penColor])

  // ✍️ Drawing logic
  const startDrawing = (x: number, y: number) => {
    const ctx = drawingCanvasRef.current?.getContext("2d")
    if (!ctx) return
    setIsDrawing(true)
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (x: number, y: number) => {
    if (!isDrawing) return
    const ctx = drawingCanvasRef.current?.getContext("2d")
    if (!ctx) return
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    if (!isDrawing) return
    const ctx = drawingCanvasRef.current?.getContext("2d")
    if (!ctx) return
    ctx.closePath()
    setIsDrawing(false)
  }

  // 📍 Mouse/touch coordinate conversion
  const getCoordinates = (event: React.MouseEvent | React.TouchEvent) => {
    const canvas = drawingCanvasRef.current
    if (!canvas) return { x: 0, y: 0 }

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    if ("touches" in event) {
      return {
        x: (event.touches[0].clientX - rect.left) * scaleX,
        y: (event.touches[0].clientY - rect.top) * scaleY,
      }
    } else {
      return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY,
      }
    }
  }

  // 🖱️ Event Handlers
  const handleMouseDown = (event: React.MouseEvent) => {
    const { x, y } = getCoordinates(event)
    startDrawing(x, y)
  }

  const handleMouseMove = (event: React.MouseEvent) => {
    const { x, y } = getCoordinates(event)
    draw(x, y)
  }

  const handleTouchStart = (event: React.TouchEvent) => {
    event.preventDefault()
    const { x, y } = getCoordinates(event)
    startDrawing(x, y)
  }

  const handleTouchMove = (event: React.TouchEvent) => {
    event.preventDefault()
    const { x, y } = getCoordinates(event)
    draw(x, y)
  }

  return (
    <div className="relative w-full h-[300px]">
      {/* 👻 Silhouette Canvas */}
      <canvas
        ref={silhouetteCanvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />

      {/* ✍️ Drawing Canvas */}
      <canvas
        ref={drawingCanvasRef}
        className="absolute top-0 left-0 w-full h-full border-4 border-purple-400 rounded-lg bg-transparent touch-none shadow-lg"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={isMobile ? handleTouchStart : undefined}
        onTouchMove={isMobile ? handleTouchMove : undefined}
        onTouchEnd={isMobile ? stopDrawing : undefined}
      />
    </div>
  )
}

export default Canvas
