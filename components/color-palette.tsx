"use client"

interface ColorPaletteProps {
  onColorChange: (color: string) => void
  currentColor: string
}

export default function ColorPalette({ onColorChange, currentColor }: ColorPaletteProps) {
  // Reduced color palette with kid-friendly colors
  const colors = [
    "#000000", // Black
    "#9333ea", // Purple
    "#ef4444", // Red
    "#22c55e", // Green
    "#3b82f6", // Blue
  ]

  return (
    <div className="bg-white p-3 rounded-xl shadow-md border-2 border-purple-200">
      <p className="text-center font-medium mb-2 text-gray-700">Choose a Color:</p>
      <div className="flex justify-center gap-4">
        {colors.map((color) => (
          <button
            key={color}
            className={`w-10 h-10 rounded-full transition-all duration-200 ${
              currentColor === color ? "ring-4 ring-offset-2 ring-primary scale-110" : "hover:scale-105"
            }`}
            style={{ backgroundColor: color }}
            onClick={() => onColorChange(color)}
            aria-label={`Select ${color} color`}
          />
        ))}
      </div>
    </div>
  )
}

