import { motion } from "framer-motion"
import { GameButton } from "@/components/ui/game-button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/game/Badge"
import { Code, Brain, Trophy, Zap, TrendingUp, Users, Target } from "lucide-react"
import { Link } from "react-router-dom"
import heroImage from "@/assets/hero-bg.jpg"

const features = [
  {
    icon: Brain,
    title: "Interactive Quizzes",
    description: "Challenge yourself with coding questions and earn XP for every correct answer."
  },
  {
    icon: Trophy,
    title: "Leaderboards",
    description: "Compete with developers worldwide and climb the global rankings."
  },
  {
    icon: Zap,
    title: "Streak Rewards",
    description: "Build daily coding habits and unlock special achievements."
  },
  {
    icon: Target,
    title: "Skill Progression",
    description: "Level up your coding skills across different programming languages."
  }
]

const stats = [
  { label: "Active Learners", value: "12", icon: Users },
  { label: "Quizzes Completed", value: "89", icon: Brain },
  { label: "XP Earned", value: "2k", icon: TrendingUp },
  { label: "Badges Unlocked", value: "15", icon: Trophy }
]

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

const Index = () => {
  return (
    <motion.div 
      className="min-h-screen bg-background"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Section */}
      <motion.section 
        className="relative overflow-hidden bg-gradient-to-br from-background via-card to-background py-20 px-6"
        variants={itemVariants}
      >
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div 
            className="mb-8"
            variants={itemVariants}
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-primary rounded-3xl flex items-center justify-center shadow-glow animate-float">
              <Code className="text-primary-foreground" size={40} />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Leveling Up</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Master coding through gamified learning. Earn XP, unlock achievements, and compete with developers worldwide.
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            variants={itemVariants}
          >
            <Link to="/dashboard">
              <GameButton size="xl" className="w-full sm:w-auto">
                <Brain className="mr-2" />
                Start Learning
              </GameButton>
            </Link>
            <Link to="/leaderboard">
              <GameButton variant="outline" size="xl" className="w-full sm:w-auto">
                <Trophy className="mr-2" />
                View Leaderboard
              </GameButton>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            variants={itemVariants}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-12 h-12 mx-auto mb-3 bg-gradient-secondary rounded-full flex items-center justify-center">
                    <Icon className="text-secondary-foreground" size={20} />
                  </div>
                  <div className="text-2xl font-bold text-success">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="py-20 px-6"
        variants={itemVariants}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="gradient-text">Leveling Up</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the most engaging way to learn coding with our gamified platform.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <Card className="p-6 bg-gradient-card border-border/50 card-interactive h-full">
                    <div className="w-14 h-14 mb-4 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow">
                      <Icon className="text-primary-foreground" size={24} />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Demo Badges Section */}
      <motion.section 
        className="py-20 px-6 bg-gradient-to-br from-card/50 to-background"
        variants={itemVariants}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Unlock <span className="gradient-text">Achievements</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Earn badges as you progress through your coding journey
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Badge type="streak" title="Fire Streak" description="7 days" earned size="lg" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Badge type="achievement" title="Quiz Master" description="100 quizzes" earned size="lg" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Badge type="level" title="Level 15" description="Reached" earned size="lg" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Badge type="master" title="Code Master" description="Expert level" earned={false} size="lg" />
            </motion.div>
          </motion.div>

          <motion.div 
            className="mt-12"
            variants={itemVariants}
          >
            <Link to="/dashboard">
              <GameButton size="lg">
                <Zap className="mr-2" />
                Start Your Journey
              </GameButton>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Index;
