"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Star } from "lucide-react"

interface QuestionsModalProps {
  isOpen: boolean
  onClose: () => void
  bookTitle: string
  readingTimeSeconds: number
  baseValue: number
}

export function QuestionsModal({ isOpen, onClose, bookTitle, readingTimeSeconds, baseValue }: QuestionsModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [review, setReview] = useState("")
  const [rating, setRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) return null

  const questions = [
    {
      id: 1,
      question: "Qual foi sua impressão geral sobre o livro?",
      type: "textarea" as const,
      placeholder: "Descreva sua impressão geral sobre a história, personagens e narrativa...",
    },
    {
      id: 2,
      question: "O que mais chamou sua atenção na história?",
      type: "textarea" as const,
      placeholder: "Mencione elementos específicos que se destacaram para você...",
    },
    {
      id: 3,
      question: "Como você avaliaria o desenvolvimento dos personagens?",
      type: "textarea" as const,
      placeholder: "Comente sobre a profundidade e evolução dos personagens principais...",
    },
    {
      id: 4,
      question: "Você recomendaria este livro? Por quê?",
      type: "textarea" as const,
      placeholder: "Explique se recomendaria e para que tipo de leitor...",
    },
  ]

  const handleAnswerChange = (value: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = value
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simular envio da avaliação
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Calcular valor baseado no tempo de leitura e qualidade da avaliação
    const timeBonus = Math.min(readingTimeSeconds / 60, 30) // Máximo 30 minutos
    const qualityBonus = rating * 2 // Bonus baseado na avaliação
    const totalValue = baseValue + timeBonus + qualityBonus

    // Salvar avaliação no localStorage
    const userData = JSON.parse(localStorage.getItem("betareader_user_data") || "{}")
    const completedBooks = userData.completedBooks || []

    completedBooks.push({
      id: "eldoria",
      title: bookTitle,
      completedAt: new Date().toISOString(),
      readingTime: readingTimeSeconds,
      rating: rating,
      review: review,
      answers: answers,
      earnings: totalValue,
    })

    // Atualizar saldo
    const currentBalance = Number.parseFloat(userData.balance?.replace("R$ ", "").replace(",", ".") || "0")
    const newBalance = currentBalance + totalValue

    userData.completedBooks = completedBooks
    userData.balance = `R$ ${newBalance.toFixed(2).replace(".", ",")}`
    userData.booksRead = (userData.booksRead || 0) + 1
    userData.points = (userData.points || 0) + Math.floor(totalValue)

    localStorage.setItem("betareader_user_data", JSON.stringify(userData))

    setIsSubmitting(false)
    onClose()

    // Mostrar modal de ganhos
    // Aqui você pode implementar um modal de sucesso ou redirecionar
    alert(`Parabéns! Você ganhou R$ ${totalValue.toFixed(2).replace(".", ",")} por sua avaliação!`)
  }

  const currentQ = questions[currentQuestion]
  const isLastQuestion = currentQuestion === questions.length - 1

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-background rounded-2xl w-full max-w-2xl p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <button
            onClick={onClose}
            className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            <span className="text-sm sm:text-base">Voltar</span>
          </button>
          <div className="text-sm text-muted-foreground">
            {currentQuestion + 1} de {questions.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2 mb-6">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Avalie sua Leitura</h2>
          <p className="text-muted-foreground text-sm">{bookTitle}</p>
        </div>

        {/* Question */}
        <div className="mb-6">
          <Label className="text-foreground font-medium text-base mb-4 block">{currentQ.question}</Label>

          {currentQ.type === "textarea" && (
            <Textarea
              value={answers[currentQuestion] || ""}
              onChange={(e) => handleAnswerChange(e.target.value)}
              className="min-h-[120px] border-border focus:border-primary focus:ring-primary"
              placeholder={currentQ.placeholder}
            />
          )}
        </div>

        {/* Rating (only on last question) */}
        {isLastQuestion && (
          <div className="mb-6">
            <Label className="text-foreground font-medium text-base mb-4 block">
              Dê uma nota de 1 a 5 estrelas para o livro:
            </Label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setRating(star)} className="transition-colors">
                  <Star
                    className={`w-8 h-8 ${star <= rating ? "text-yellow-400 fill-current" : "text-muted-foreground"}`}
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Review (only on last question) */}
        {isLastQuestion && (
          <div className="mb-6">
            <Label className="text-foreground font-medium text-base mb-4 block">
              Escreva uma resenha completa (opcional):
            </Label>
            <Textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="min-h-[100px] border-border focus:border-primary focus:ring-primary"
              placeholder="Escreva uma resenha detalhada sobre o livro..."
            />
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-6 bg-transparent"
          >
            Anterior
          </Button>

          {isLastQuestion ? (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !answers[currentQuestion] || rating === 0}
              className="bg-primary hover:bg-primary/80 text-white px-8"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Enviando...
                </div>
              ) : (
                "Finalizar Avaliação"
              )}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!answers[currentQuestion]}
              className="bg-primary hover:bg-primary/80 text-white px-6"
            >
              Próxima
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
