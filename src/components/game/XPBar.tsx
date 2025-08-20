import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface XPBarProps {
  currentXP: number
  nextLevelXP: number
  level: number
  className?: string
  showLabel?: boolean
}

export function XPBar({ currentXP, nextLevelXP, level, className, showLabel = true }: XPBarProps) {
  const progress = (currentXP / nextLevelXP) * 100

  return (
    <div className={cn("space-y-2", className)}>
      {showLabel && (
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Level {level}</span>
          <span className="text-muted-foreground">
            {currentXP.toLocaleString()} / {nextLevelXP.toLocaleString()} XP
          </span>
        </div>
      )}
      <div className="relative">
        <Progress 
          value={progress} 
          className="h-3 bg-muted shadow-card"
        />
        <div className="absolute inset-0 bg-gradient-success rounded-full opacity-80" 
             style={{ width: `${progress}%` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full animate-pulse" 
             style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}