"use client"

interface LetterTableProps {
  letters: string[]
  selectedLetter: string
  onSelectLetter: (letter: string) => void
}

const LetterTable = ({ letters, selectedLetter, onSelectLetter }: LetterTableProps) => {
  return (
    <div className="grid grid-cols-5 gap-2">
      {letters.map((letter, index) => (
        <button
          key={index}
          className={`h-12 flex items-center justify-center text-lg rounded-xl transition-all duration-200 ${
            selectedLetter === letter
              ? "bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-md transform scale-110"
              : "bg-gradient-to-r from-blue-100 to-purple-100 hover:from-blue-200 hover:to-purple-200 text-gray-800 hover:scale-105"
          }`}
          onClick={() => onSelectLetter(letter)}
        >
          {letter}
        </button>
      ))}
    </div>
  )
}

export default LetterTable

