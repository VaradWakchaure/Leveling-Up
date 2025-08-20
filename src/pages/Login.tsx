import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GameButton } from "@/components/ui/game-button"
import { Code, Mail, Lock, Github, Chrome } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "sonner"
import { Link, Navigate } from "react-router-dom"
import heroImage from "@/assets/hero-bg.jpg"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)
  const { signIn, signUp, loading, user } = useAuth()

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast.error("Please fill in all fields")
      return
    }

    try {
      const { error } = isSignUp 
        ? await signUp(email, password)
        : await signIn(email, password)

      if (error) {
        if (error.message === "Invalid login credentials") {
          toast.error("Invalid email or password")
        } else if (error.message === "User already registered") {
          toast.error("User already exists. Try signing in instead.")
          setIsSignUp(false)
        } else {
          toast.error(error.message)
        }
      } else if (isSignUp) {
        toast.success("Check your email for confirmation link!")
      }
    } catch (err) {
      toast.error("An unexpected error occurred")
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      {/* Background */}
      <div 
        className="absolute inset-0 opacity-5 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="p-8 bg-gradient-card border-border/50 shadow-elevated">
          {/* Logo */}
          <motion.div 
            className="text-center mb-8"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow">
              <Code className="text-primary-foreground" size={32} />
            </div>
            <h1 className="text-3xl font-bold mb-2">
              <span className="gradient-text">
                {isSignUp ? "Join" : "Welcome Back"}
              </span>
            </h1>
            <p className="text-muted-foreground">
              {isSignUp 
                ? "Create your account and start learning" 
                : "Sign in to continue your coding journey"
              }
            </p>
          </motion.div>

          {/* Auth Form */}
          <motion.form 
            className="space-y-6"
            onSubmit={handleSubmit}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="pl-10 bg-background/50 border-border/50 focus:border-primary/50 focus:bg-background"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isSignUp ? "Create a password" : "Enter your password"}
                  className="pl-10 bg-background/50 border-border/50 focus:border-primary/50 focus:bg-background"
                />
              </div>
            </div>

            <GameButton 
              type="submit" 
              size="lg" 
              className="w-full"
              disabled={loading}
            >
              {loading ? "Loading..." : (isSignUp ? "Sign Up" : "Sign In")}
            </GameButton>
          </motion.form>

          {/* Divider */}
          <motion.div 
            className="my-6"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-card text-muted-foreground">Or continue with</span>
              </div>
            </div>
          </motion.div>

          {/* Social Login */}
          <motion.div 
            className="grid grid-cols-2 gap-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <GameButton variant="outline" className="w-full">
              <Github size={18} />
              GitHub
            </GameButton>
            <GameButton variant="outline" className="w-full">
              <Chrome size={18} />
              Google
            </GameButton>
          </motion.div>

          {/* Links */}
          <motion.div 
            className="mt-6 text-center space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm text-muted-foreground">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button 
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-primary hover:text-primary-glow font-medium"
              >
                {isSignUp ? "Sign in" : "Sign up"}
              </button>
            </p>
            <p className="text-xs text-muted-foreground">
              <Link to="/" className="hover:text-foreground">
                ← Back to home
              </Link>
            </p>
          </motion.div>

          {/* Info Notice */}
          <motion.div 
            className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-sm text-center text-primary">
              {isSignUp 
                ? "📧 Check your email after signing up to confirm your account"
                : "🚀 Sign in to access your personalized dashboard"
              }
            </p>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  )
}