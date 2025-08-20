import { cn } from "@/lib/utils"

interface ProgressRingProps {
  progress: number // 0-100
  size?: number
  strokeWidth?: number
  className?: string
  children?: React.ReactNode
  color?: "primary" | "success" | "warning" | "achievement"
}

export function ProgressRing({ 
  progress, 
  size = 120, 
  strokeWidth = 8, 
  className, 
  children,
  color = "primary"
}: ProgressRingProps) {
  const normalizedRadius = (size - strokeWidth) / 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (progress / 100) * circumference

  const colorClasses = {
    primary: "stroke-primary",
    success: "stroke-success", 
    warning: "stroke-warning",
    achievement: "stroke-achievement"
  }

  const glowClasses = {
    primary: "drop-shadow-[0_0_10px_hsl(var(--primary)/0.5)]",
    success: "drop-shadow-[0_0_10px_hsl(var(--success)/0.5)]",
    warning: "drop-shadow-[0_0_10px_hsl(var(--warning)/0.5)]",
    achievement: "drop-shadow-[0_0_10px_hsl(var(--achievement)/0.5)]"
  }

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={normalizedRadius}
          strokeWidth={strokeWidth}
          className="stroke-muted fill-transparent"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={normalizedRadius}
          strokeWidth={strokeWidth}
          className={cn(
            "fill-transparent progress-ring",
            colorClasses[color],
            glowClasses[color]
          )}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  )
}