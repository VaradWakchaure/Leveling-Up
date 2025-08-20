import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/game/Badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Crown, Medal, Trophy, TrendingUp, Zap } from "lucide-react"

// Mock leaderboard data
const mockLeaderboard = [
  { rank: 1, name: "Sarah Chen", xp: 12450, level: 28, streak: 45, badges: 12, avatar: "SC" },
  { rank: 2, name: "Marcus Johnson", xp: 11280, level: 26, streak: 23, badges: 10, avatar: "MJ" },
  { rank: 3, name: "Alex Rivera", xp: 10950, level: 25, streak: 31, badges: 9, avatar: "AR" },
  { rank: 4, name: "Emily Zhang", xp: 10200, level: 24, streak: 18, badges: 11, avatar: "EZ" },
  { rank: 5, name: "David Kim", xp: 9850, level: 23, streak: 28, badges: 8, avatar: "DK" },
  { rank: 6, name: "Luna Martinez", xp: 9500, level: 22, streak: 15, badges: 7, avatar: "LM" },
  { rank: 7, name: "James Wilson", xp: 9200, level: 22, streak: 12, badges: 9, avatar: "JW" },
  { rank: 8, name: "Sophia Brown", xp: 8950, level: 21, streak: 20, badges: 6, avatar: "SB" },
  { rank: 9, name: "Michael Davis", xp: 8700, level: 21, streak: 9, badges: 8, avatar: "MD" },
  { rank: 10, name: "You", xp: 2850, level: 15, streak: 12, badges: 4, avatar: "AC", isCurrentUser: true },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
}

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="text-achievement" size={24} />
    case 2:
      return <Medal className="text-muted-foreground" size={24} />
    case 3:
      return <Trophy className="text-warning" size={20} />
    default:
      return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>
  }
}

const getRankColors = (rank: number, isCurrentUser?: boolean) => {
  if (isCurrentUser) {
    return "border-primary/50 bg-primary/5 shadow-glow"
  }
  
  switch (rank) {
    case 1:
      return "border-achievement/50 bg-achievement/5 shadow-achievement"
    case 2:
      return "border-muted-foreground/30 bg-muted/20"
    case 3:
      return "border-warning/50 bg-warning/5"
    default:
      return "border-border/50 bg-card/50"
  }
}

export default function Leaderboard() {
  return (
    <motion.div 
      className="min-h-screen bg-background"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div 
        className="bg-gradient-to-br from-background via-card to-background px-6 py-12"
        variants={itemVariants}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Global Leaderboard</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            See how you stack up against the best coders worldwide
          </p>
          
          {/* Top 3 Podium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {mockLeaderboard.slice(0, 3).map((user, index) => (
              <motion.div
                key={user.rank}
                className="relative"
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`p-6 text-center ${getRankColors(user.rank)} card-interactive`}>
                  <div className="mb-4">
                    {getRankIcon(user.rank)}
                  </div>
                  
                  <Avatar className="w-16 h-16 mx-auto mb-4 border-2 border-white/20">
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground font-bold">
                      {user.avatar}
                    </AvatarFallback>
                  </Avatar>
                  
                  <h3 className="font-semibold text-lg mb-2">{user.name}</h3>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Level</span>
                      <span className="font-semibold">{user.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">XP</span>
                      <span className="font-semibold text-success">{user.xp.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Streak</span>
                      <span className="font-semibold text-warning">{user.streak} days</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Full Leaderboard */}
      <div className="px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <motion.div variants={itemVariants} className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Full Rankings</h2>
          </motion.div>
          
          <motion.div className="space-y-3" variants={containerVariants}>
            {mockLeaderboard.map((user, index) => (
              <motion.div
                key={user.rank}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className={`p-4 ${getRankColors(user.rank, user.isCurrentUser)} card-interactive`}>
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                      {getRankIcon(user.rank)}
                    </div>
                    
                    {/* Avatar */}
                    <Avatar className={`w-12 h-12 border-2 ${user.isCurrentUser ? 'border-primary' : 'border-white/20'}`}>
                      <AvatarFallback className="bg-gradient-secondary text-secondary-foreground font-semibold">
                        {user.avatar}
                      </AvatarFallback>
                    </Avatar>
                    
                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold ${user.isCurrentUser ? 'text-primary' : ''}`}>
                        {user.name}
                        {user.isCurrentUser && <span className="ml-2 text-xs text-primary">(You)</span>}
                      </h3>
                      <p className="text-sm text-muted-foreground">Level {user.level}</p>
                    </div>
                    
                    {/* Stats */}
                    <div className="hidden sm:flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <div className="flex items-center gap-1 text-success">
                          <TrendingUp size={14} />
                          <span className="font-semibold">{user.xp.toLocaleString()}</span>
                        </div>
                        <span className="text-muted-foreground">XP</span>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center gap-1 text-warning">
                          <Zap size={14} />
                          <span className="font-semibold">{user.streak}</span>
                        </div>
                        <span className="text-muted-foreground">Streak</span>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center gap-1 text-achievement">
                          <Trophy size={14} />
                          <span className="font-semibold">{user.badges}</span>
                        </div>
                        <span className="text-muted-foreground">Badges</span>
                      </div>
                    </div>
                    
                    {/* Mobile Stats */}
                    <div className="sm:hidden text-right">
                      <div className="text-lg font-bold text-success">
                        {user.xp.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">XP</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Load More */}
          <motion.div 
            className="text-center mt-8"
            variants={itemVariants}
          >
            <p className="text-muted-foreground">
              Showing top 10 • View your current rank: #{mockLeaderboard.find(u => u.isCurrentUser)?.rank}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}