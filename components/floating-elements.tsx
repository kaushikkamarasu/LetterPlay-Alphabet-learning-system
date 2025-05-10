"use client"

import { useEffect, useState } from "react"

interface FloatingElement {
  id: number
  x: number
  y: number
  size: number
  speed: number
  color: string
  shape: "circle" | "square" | "triangle" | "star"
  rotation: number
  rotationSpeed: number
}

export function FloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([])

  useEffect(() => {
    // Generate random elements
    const shapes = ["circle", "square", "triangle", "star"]
    const colors = [
      "rgba(168, 85, 247, 0.4)", // Purple
      "rgba(236, 72, 153, 0.4)", // Pink
      "rgba(59, 130, 246, 0.4)", // Blue
      "rgba(16, 185, 129, 0.4)", // Emerald
      "rgba(245, 158, 11, 0.4)", // Amber
    ]

    const newElements: FloatingElement[] = []
    for (let i = 0; i < 20; i++) {
      newElements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 30 + 10,
        speed: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)] as any,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
      })
    }
    setElements(newElements)

    // Animation loop
    let animationFrameId: number
    let lastTime = 0

    const animate = (time: number) => {
      if (lastTime === 0) lastTime = time
      const deltaTime = time - lastTime
      lastTime = time

      setElements((prevElements) =>
        prevElements.map((el) => {
          // Update position
          let newY = el.y - el.speed * (deltaTime / 16)
          if (newY < -10) newY = 110 // Reset to bottom when it goes off the top

          // Update rotation
          let newRotation = el.rotation + el.rotationSpeed * (deltaTime / 16)
          if (newRotation > 360) newRotation -= 360
          if (newRotation < 0) newRotation += 360

          return {
            ...el,
            y: newY,
            rotation: newRotation,
          }
        }),
      )

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  const renderShape = (element: FloatingElement) => {
    switch (element.shape) {
      case "circle":
        return (
          <div
            key={element.id}
            className="absolute rounded-full"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              width: `${element.size}px`,
              height: `${element.size}px`,
              backgroundColor: element.color,
              transform: `rotate(${element.rotation}deg)`,
              transition: "transform 0.1s linear",
            }}
          />
        )
      case "square":
        return (
          <div
            key={element.id}
            className="absolute rounded-md"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              width: `${element.size}px`,
              height: `${element.size}px`,
              backgroundColor: element.color,
              transform: `rotate(${element.rotation}deg)`,
              transition: "transform 0.1s linear",
            }}
          />
        )
      case "triangle":
        return (
          <div
            key={element.id}
            className="absolute"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              width: 0,
              height: 0,
              borderLeft: `${element.size / 2}px solid transparent`,
              borderRight: `${element.size / 2}px solid transparent`,
              borderBottom: `${element.size}px solid ${element.color}`,
              transform: `rotate(${element.rotation}deg)`,
              transition: "transform 0.1s linear",
            }}
          />
        )
      case "star":
        return (
          <div
            key={element.id}
            className="absolute text-center flex items-center justify-center"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              fontSize: `${element.size}px`,
              color: element.color,
              transform: `rotate(${element.rotation}deg)`,
              transition: "transform 0.1s linear",
              height: `${element.size}px`,
              width: `${element.size}px`,
            }}
          >
            ★
          </div>
        )
      default:
        return null
    }
  }

  return <div className="absolute inset-0 overflow-hidden">{elements.map(renderShape)}</div>
}

