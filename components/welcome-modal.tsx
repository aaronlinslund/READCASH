"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, HelpCircle, ArrowLeft, DollarSign, TrendingUp, UserX } from "lucide-react"

interface WelcomeModalProps {
  isOpen: boolean
  onClose: () => void
  userName: string
}

export function WelcomeModal({ isOpen, onClose, userName }: WelcomeModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedCommitment, setSelectedCommitment] = useState<string | null>(null)
  const [selectedIncome, setSelectedIncome] = useState<string | null>(null)
  const [shouldShow, setShouldShow] = useState(false)

  useEffect(() => {
    // Verificar se o usuário já respondeu as perguntas
    const savedUserData = localStorage.getItem("betareader_user_data")
    if (savedUserData) {
      const userData = JSON.parse(savedUserData)

      // Se já tem as respostas salvas, não mostrar o modal
      if (userData.onboardingCompleted) {
        setShouldShow(false)
        return
      }
    }

    // Se chegou até aqui, precisa mostrar o modal
    setShouldShow(true)
  }, [])

  if (!isOpen || !shouldShow) return null

  const handleContinueToStep2 = () => {
    if (selectedCommitment) {
      setCurrentStep(2)
      // Scroll para o topo do modal
      setTimeout(() => {
        const modalElement = document.querySelector('[data-modal="welcome"]')
        if (modalElement) {
          modalElement.scrollTop = 0
        }
      }, 50)
    }
  }

  const handleFinalize = () => {
    if (selectedIncome) {
      // Salvar as respostas no localStorage
      const savedUserData = localStorage.getItem("betareader_user_data")
      if (savedUserData) {
        const userData = JSON.parse(savedUserData)
        userData.onboardingCompleted = true
        userData.commitment = selectedCommitment
        userData.incomeRange = selectedIncome
        userData.onboardingDate = new Date().toISOString()
        localStorage.setItem("betareader_user_data", JSON.stringify(userData))
      }

      onClose()
    }
  }

  const handleBack = () => {
    setCurrentStep(1)
    // Scroll para o topo do modal
    setTimeout(() => {
      const modalElement = document.querySelector('[data-modal="welcome"]')
      if (modalElement) {
        modalElement.scrollTop = 0
      }
    }, 50)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-background rounded-2xl shadow-2xl" data-modal="welcome">
        <CardContent className="p-6">
          {currentStep === 1 ? (
            // Primeira pergunta - Comprometimento
            <>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">👋</span>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Bem-vindo, {userName}!</h2>
                <p className="text-muted-foreground">Vamos configurar seu perfil de beta reader</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Sua intenção é se comprometer e realmente trabalhar como um beta-reader?
                </h3>
                <p className="text-sm text-muted-foreground mb-4">Queremos entender seu nível de dedicação</p>

                <div className="space-y-3">
                  <button
                    onClick={() => setSelectedCommitment("committed")}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                      selectedCommitment === "committed"
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-start">
                      <CheckCircle
                        className={`w-5 h-5 mr-3 mt-0.5 ${
                          selectedCommitment === "committed" ? "text-primary" : "text-gray-400"
                        }`}
                      />
                      <div>
                        <div className="font-semibold text-foreground mb-1">Sim, estou comprometido(a)</div>
                        <div className="text-sm text-muted-foreground">Quero trabalhar seriamente como beta reader</div>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedCommitment("curious")}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                      selectedCommitment === "curious"
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-start">
                      <HelpCircle
                        className={`w-5 h-5 mr-3 mt-0.5 ${
                          selectedCommitment === "curious" ? "text-primary" : "text-gray-400"
                        }`}
                      />
                      <div>
                        <div className="font-semibold text-foreground mb-1">Não, apenas curiosidade</div>
                        <div className="text-sm text-muted-foreground">Quero explorar a plataforma primeiro</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              <Button
                onClick={handleContinueToStep2}
                disabled={!selectedCommitment}
                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-orange-600 hover:to-orange-700 text-white py-3 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continuar
              </Button>
            </>
          ) : (
            // Segunda pergunta - Faixa de renda
            <>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="text-white w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Bem-vindo, {userName}!</h2>
                <p className="text-muted-foreground">Vamos configurar seu perfil de beta reader</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">Qual sua faixa de renda mensal?</h3>
                <p className="text-sm text-muted-foreground mb-4">Isso nos ajuda a personalizar sua experiência</p>

                <div className="space-y-3">
                  <button
                    onClick={() => setSelectedIncome("1k-10k")}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                      selectedIncome === "1k-10k"
                        ? "border-accent bg-accent/10"
                        : "border-border hover:border-accent/50"
                    }`}
                  >
                    <div className="flex items-center">
                      <TrendingUp
                        className={`w-5 h-5 mr-3 ${selectedIncome === "1k-10k" ? "text-accent" : "text-gray-400"}`}
                      />
                      <div className="font-semibold text-foreground">R$ 1.000 - R$ 10.000</div>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedIncome("10k-50k")}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                      selectedIncome === "10k-50k"
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center">
                      <TrendingUp
                        className={`w-5 h-5 mr-3 ${selectedIncome === "10k-50k" ? "text-primary" : "text-gray-400"}`}
                      />
                      <div className="font-semibold text-foreground">R$ 10.000 - R$ 50.000</div>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedIncome("100k+")}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                      selectedIncome === "100k+"
                        ? "border-fuchsia-500 bg-fuchsia-50"
                        : "border-fuchsia-500 hover:border-fuchsia-300"
                    }`}
                  >
                    <div className="flex items-center">
                      <TrendingUp
                        className={`w-5 h-5 mr-3 ${selectedIncome === "100k+" ? "text-fuchsia-500" : "text-gray-400"}`}
                      />
                      <div className="font-semibold text-foreground">R$ 100.000+</div>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedIncome("unemployed")}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                      selectedIncome === "unemployed" ? "border-muted bg-muted/10" : "border-border hover:border-muted"
                    }`}
                  >
                    <div className="flex items-center">
                      <UserX
                        className={`w-5 h-5 mr-3 ${
                          selectedIncome === "unemployed" ? "text-muted-foreground" : "text-gray-400"
                        }`}
                      />
                      <div className="font-semibold text-foreground">Desempregado(a)</div>
                    </div>
                  </button>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="flex-1 border-border text-foreground hover:bg-card bg-transparent"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
                <Button
                  onClick={handleFinalize}
                  disabled={!selectedIncome}
                  className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-orange-600 hover:to-orange-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Finalizar
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
