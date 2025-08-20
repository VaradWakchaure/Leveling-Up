import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { GameButton } from "@/components/ui/game-button"
import { XPBar } from "@/components/game/XPBar"
import { Badge } from "@/components/game/Badge"
import { ProgressRing } from "@/components/game/ProgressRing"
import { Zap, Brain, Trophy, Target, Calendar, TrendingUp } from "lucide-react"
import heroImage from "@/assets/hero-bg.jpg"

// Mock user data
const mockUser = {
  name: "Laukik Rathod",
  level: 1,
  currentXP: 0,
  nextLevelXP: 100,
  streak: 1,
  totalQuizzes: 3,
  accuracy: 89,
  badges: [
    { type: "streak", title: "Fire Streak", description: "7 days", earned: true },
    { type: "achievement", title: "Quiz Master", description: "100 quizzes", earned: true },
    { type: "level", title: "Level 15", description: "Reached", earned: true },
    { type: "xp", title: "XP Hunter", description: "5000 XP", earned: false },
  ],
  recentActivity: [
    { title: "JavaScript Fundamentals", xp: 250, time: "2 hours ago" },
    { title: "React Hooks Deep Dive", xp: 180, time: "Yesterday" },
    { title: "TypeScript Mastery", xp: 320, time: "2 days ago" },
  ]
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function Dashboard() {
  return (
    <motion.div 
      className="min-h-screen bg-background"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Section */}
      <motion.div 
        className="relative overflow-hidden bg-gradient-to-br from-background via-card to-background"
        variants={itemVariants}
      >
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative z-10 px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-4"
              variants={itemVariants}
            >
              Welcome back, <span className="gradient-text">{mockUser.name}</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground mb-8"
              variants={itemVariants}
            >
              Ready to level up your coding skills today?
            </motion.p>
            <motion.div variants={itemVariants}>
              <GameButton size="lg" className="mr-4">
                <Brain className="mr-2" />
                Start Quiz
              </GameButton>
              <GameButton variant="outline" size="lg">
                <TrendingUp className="mr-2" />
                View Progress
              </GameButton>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Main Dashboard Content */}
      <div className="px-6 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Stats Overview */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={itemVariants}
          >
            <Card className="p-6 bg-gradient-card border-border/50 card-interactive">
              <div className="flex items-center gap-4">
                <ProgressRing progress={89} size={60} color="primary">
                  <span className="text-sm font-bold">{mockUser.level}</span>
                </ProgressRing>
                <div>
                  <h3 className="font-semibold">Level</h3>
                  <p className="text-2xl font-bold text-primary">{mockUser.level}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card border-border/50 card-interactive">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-success rounded-full shadow-success">
                  <Target className="text-success-foreground" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold">Accuracy</h3>
                  <p className="text-2xl font-bold text-success">{mockUser.accuracy}%</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card border-border/50 card-interactive">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-secondary rounded-full shadow-[0_0_20px_hsl(var(--warning)/0.3)]">
                  <Zap className="text-warning-foreground" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold">Streak</h3>
                  <p className="text-2xl font-bold text-warning">{mockUser.streak} days</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card border-border/50 card-interactive">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-achievement rounded-full shadow-achievement">
                  <Trophy className="text-achievement-foreground" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold">Quizzes</h3>
                  <p className="text-2xl font-bold text-achievement">{mockUser.totalQuizzes}</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* XP Progress */}
          <motion.div variants={itemVariants}>
            <Card className="p-6 bg-gradient-card border-border/50">
              <h2 className="text-xl font-semibold mb-4">Experience Progress</h2>
              <XPBar 
                currentXP={mockUser.currentXP}
                nextLevelXP={mockUser.nextLevelXP}
                level={mockUser.level}
              />
            </Card>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Badges */}
            <motion.div variants={itemVariants}>
              <Card className="p-6 bg-gradient-card border-border/50">
                <h2 className="text-xl font-semibold mb-4">Achievements</h2>
                <div className="grid grid-cols-2 gap-4">
                  {mockUser.badges.map((badge, index) => (
                    <Badge
                      key={index}
                      type={badge.type as any}
                      title={badge.title}
                      description={badge.description}
                      earned={badge.earned}
                      size="md"
                    />
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div variants={itemVariants}>
              <Card className="p-6 bg-gradient-card border-border/50">
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  {mockUser.recentActivity.map((activity, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div>
                        <h4 className="font-medium">{activity.title}</h4>
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-success">+{activity.xp}</span>
                        <p className="text-sm text-muted-foreground">XP</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}