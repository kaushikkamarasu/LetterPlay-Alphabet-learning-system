interface ProgressBarProps {
  current: number
  total: number
}

const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const percentage = (current / total) * 100

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2 text-base font-medium">
        <span className="text-primary">Progress</span>
        <span className="bg-primary/10 px-3 py-1 rounded-full text-primary">
          {current} of {total}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
        <div
          className="bg-gradient-to-r from-primary via-secondary to-accent h-4 rounded-full transition-all duration-300 relative"
          style={{ width: `${percentage}%` }}
        >
          {percentage > 10 && (
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProgressBar

