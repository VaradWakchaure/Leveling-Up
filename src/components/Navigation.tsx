import { motion } from "framer-motion"
import { GameButton } from "@/components/ui/game-button"
import { Code, Home, Brain, Trophy, BarChart3, User, LogOut } from "lucide-react"
import { useLocation, Link } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { path: "/quiz", label: "Quiz", icon: Brain },
  { path: "/leaderboard", label: "Leaderboard", icon: Trophy },
]

export function Navigation() {
  const location = useLocation()
  const { user, signOut } = useAuth()
  
  // Don't show navigation on login page
  if (location.pathname === "/login") {
    return null
  }

  return (
    <motion.nav 
      className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
              <Code className="text-primary-foreground" size={20} />
            </div>
            <span className="text-xl font-bold gradient-text">Leveling Up</span>
          </Link>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <Link key={item.path} to={item.path}>
                  <GameButton
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className="gap-2"
                  >
                    <Icon size={16} />
                    {item.label}
                  </GameButton>
                </Link>
              )
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  {user.email}
                </span>
                <GameButton 
                  variant="outline" 
                  size="sm"
                  onClick={() => signOut()}
                >
                  <LogOut size={16} />
                  <span className="hidden sm:inline">Sign Out</span>
                </GameButton>
              </div>
            ) : (
              <Link to="/login">
                <GameButton variant="outline" size="sm">
                  <User size={16} />
                  <span className="hidden sm:inline">Sign In</span>
                </GameButton>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden mt-4 flex justify-center">
          <div className="flex gap-1 p-1 bg-muted/50 rounded-lg">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <Link key={item.path} to={item.path}>
                  <GameButton
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className="gap-1"
                  >
                    <Icon size={14} />
                    <span className="text-xs">{item.label}</span>
                  </GameButton>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}