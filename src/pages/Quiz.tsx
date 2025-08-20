import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { GameButton } from "@/components/ui/game-button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/game/Badge"
import { CheckCircle, XCircle, Clock, Trophy, Zap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock quiz data
const mockQuestions = [
  {
    id: 1,
    question: "What is the output of console.log(typeof null) in JavaScript?",
    options: ["null", "undefined", "object", "boolean"],
    correct: 2,
    explanation: "In JavaScript, typeof null returns 'object'. This is actually a well-known bug in JavaScript that has been kept for backwards compatibility."
  },
  {
    id: 2,
    question: "Which React hook is used for side effects?",
    options: ["useState", "useEffect", "useContext", "useReducer"],
    correct: 1,
    explanation: "useEffect is the React hook used for performing side effects in function components, such as data fetching, subscriptions, or DOM manipulation."
  },
  {
    id: 3,
    question: "What does CSS Grid's 'fr' unit represent?",
    options: ["Fixed ratio", "Fractional unit", "Font relative", "Flexible ratio"],
    correct: 1,
    explanation: "The 'fr' unit in CSS Grid represents a fractional unit that distributes available space proportionally among grid tracks."
  }
]

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [quizComplete, setQuizComplete] = useState(false)
  const { toast } = useToast()

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !quizComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      handleQuizComplete()
    }
  }, [timeLeft, quizComplete])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return
    
    const newAnswers = [...answers, selectedAnswer]
    setAnswers(newAnswers)
    
    const isCorrect = selectedAnswer === mockQuestions[currentQuestion].correct
    
    if (isCorrect) {
      toast({
        title: "Correct! 🎉",
        description: `+${50 + (timeLeft / 10)} XP earned`,
      })
    }

    setShowResult(true)
    
    setTimeout(() => {
      if (currentQuestion < mockQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      } else {
        handleQuizComplete()
      }
    }, 2000)
  }

  const handleQuizComplete = () => {
    setQuizComplete(true)
    const correctAnswers = answers.filter((answer, index) => answer === mockQuestions[index].correct).length
    const totalXP = correctAnswers * 50 + Math.floor(timeLeft / 5)
    
    toast({
      title: "Quiz Complete! 🚀",
      description: `You earned ${totalXP} XP and answered ${correctAnswers}/${mockQuestions.length} correctly!`,
    })
  }

  const calculateScore = () => {
    const correctAnswers = answers.filter((answer, index) => answer === mockQuestions[index].correct).length
    return { correct: correctAnswers, total: mockQuestions.length, percentage: Math.round((correctAnswers / mockQuestions.length) * 100) }
  }

  if (quizComplete) {
    const score = calculateScore()
    return (
      <motion.div 
        className="min-h-screen bg-background flex items-center justify-center p-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-2xl p-8 bg-gradient-card border-border/50 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <Trophy className="w-16 h-16 mx-auto mb-4 text-achievement" />
          </motion.div>
          
          <h1 className="text-3xl font-bold mb-4 gradient-text">Quiz Complete!</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="text-lg font-semibold text-success">Score</h3>
              <p className="text-3xl font-bold text-success">{score.percentage}%</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="text-lg font-semibold text-primary">Correct</h3>
              <p className="text-3xl font-bold text-primary">{score.correct}/{score.total}</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="text-lg font-semibold text-warning">XP Earned</h3>
              <p className="text-3xl font-bold text-warning">{score.correct * 50 + Math.floor(timeLeft / 5)}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GameButton size="lg" onClick={() => window.location.reload()}>
              Try Again
            </GameButton>
            <GameButton variant="outline" size="lg" onClick={() => window.history.back()}>
              Back to Dashboard
            </GameButton>
          </div>
        </Card>
      </motion.div>
    )
  }

  const question = mockQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / mockQuestions.length) * 100

  return (
    <motion.div 
      className="min-h-screen bg-background p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div>
            <h1 className="text-2xl font-bold">JavaScript Mastery Quiz</h1>
            <p className="text-muted-foreground">Question {currentQuestion + 1} of {mockQuestions.length}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-warning">
              <Clock size={20} />
              <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
            </div>
            <Badge type="streak" title="Streak" description="12 days" earned size="sm" />
          </div>
        </motion.div>

        {/* Progress */}
        <motion.div 
          className="mb-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Progress value={progress} className="h-2 bg-muted" />
        </motion.div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-8 bg-gradient-card border-border/50 mb-8">
              <h2 className="text-xl font-semibold mb-6 leading-relaxed">
                {question.question}
              </h2>

              <div className="grid gap-4">
                {question.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`p-4 text-left rounded-lg border-2 transition-all ${
                      selectedAnswer === index
                        ? showResult
                          ? index === question.correct
                            ? "border-success bg-success/10 text-success"
                            : "border-destructive bg-destructive/10 text-destructive"
                          : "border-primary bg-primary/10 text-primary"
                        : showResult && index === question.correct
                        ? "border-success bg-success/10 text-success"
                        : "border-border bg-card hover:border-primary/50 hover:bg-primary/5"
                    }`}
                    disabled={showResult}
                    whileHover={{ scale: showResult ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showResult && (
                        <>
                          {index === question.correct && <CheckCircle className="text-success" size={20} />}
                          {selectedAnswer === index && index !== question.correct && <XCircle className="text-destructive" size={20} />}
                        </>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-muted/50 rounded-lg"
                >
                  <h4 className="font-semibold mb-2">Explanation:</h4>
                  <p className="text-muted-foreground">{question.explanation}</p>
                </motion.div>
              )}
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Action Button */}
        <motion.div 
          className="text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <GameButton
            size="lg"
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null || showResult}
            className="min-w-48"
          >
            {showResult ? (
              <div className="flex items-center gap-2">
                <Zap size={20} />
                Loading...
              </div>
            ) : currentQuestion < mockQuestions.length - 1 ? (
              "Next Question"
            ) : (
              "Complete Quiz"
            )}
          </GameButton>
        </motion.div>
      </div>
    </motion.div>
  )
}