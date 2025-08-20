import { cn } from "@/lib/utils"
import { Award, Crown, Target, Zap, Trophy, Star } from "lucide-react"

interface BadgeProps {
  type: "streak" | "achievement" | "level" | "xp" | "master" | "first"
  title: string
  description?: string
  earned?: boolean
  className?: string
  size?: "sm" | "md" | "lg"
}

const badgeIcons = {
  streak: Zap,
  achievement: Award,
  level: Crown,
  xp: Target,
  master: Trophy,
  first: Star
}

const badgeStyles = {
  streak: "bg-gradient-to-br from-warning to-warning-glow shadow-[0_0_20px_hsl(var(--warning)/0.3)]",
  achievement: "bg-gradient-to-br from-achievement to-achievement-glow shadow-[0_0_20px_hsl(var(--achievement)/0.3)]",
  level: "bg-gradient-to-br from-secondary to-secondary-glow shadow-[0_0_20px_hsl(var(--secondary)/0.3)]",
  xp: "bg-gradient-to-br from-success to-success-glow shadow-[0_0_20px_hsl(var(--success)/0.3)]",
  master: "bg-gradient-to-br from-primary to-primary-glow shadow-[0_0_20px_hsl(var(--primary)/0.3)]",
  first: "bg-gradient-to-br from-achievement to-warning shadow-[0_0_20px_hsl(var(--achievement)/0.3)]"
}

export function Badge({ type, title, description, earned = false, className, size = "md" }: BadgeProps) {
  const Icon = badgeIcons[type]
  
  const sizeClasses = {
    sm: "w-12 h-12 text-xs",
    md: "w-16 h-16 text-sm",
    lg: "w-20 h-20 text-base"
  }

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  }

  return (
    <div className={cn(
      "relative flex flex-col items-center gap-2 group cursor-pointer",
      className
    )}>
      <div className={cn(
        "relative flex items-center justify-center rounded-full border-2 transition-all duration-300",
        sizeClasses[size],
        earned 
          ? `${badgeStyles[type]} border-white/20 hover:scale-110 pulse-achievement`
          : "bg-muted border-muted-foreground/20 grayscale hover:grayscale-0 hover:scale-105"
      )}>
        <Icon 
          size={iconSizes[size]} 
          className={earned ? "text-white drop-shadow-sm" : "text-muted-foreground"} 
        />
        {earned && (
          <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse" />
        )}
      </div>
      
      <div className="text-center space-y-1">
        <h4 className={cn(
          "font-medium leading-tight",
          earned ? "text-foreground" : "text-muted-foreground",
          size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base"
        )}>
          {title}
        </h4>
        {description && (
          <p className="text-xs text-muted-foreground max-w-20 leading-tight">
            {description}
          </p>
        )}
      </div>

      {earned && (
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center animate-bounce-in">
          <Star size={12} className="text-success-foreground" />
        </div>
      )}
    </div>
  )
}