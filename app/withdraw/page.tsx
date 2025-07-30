"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Shield, Clock, CheckCircle, AlertTriangle } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function Withdraw() {
  const router = useRouter()
  const [userBalance, setUserBalance] = useState("R$ 0.00")
  const [userName, setUserName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const savedUserData = localStorage.getItem("betareader_user_data")
    if (savedUserData) {
      const userData = JSON.parse(savedUserData)
      setUserBalance(userData.balance || "R$ 0.00")
      setUserName(userData.name || "")
    }
  }, [])

  const handleActivateAccount = async () => {
    setIsLoading(true)

    try {
      // Capturar UTMs salvos
      let utmParams = ""
      const originalUtms = localStorage.getItem("betareader_original_utms")
      const hasValidUtms = localStorage.getItem("betareader_has_valid_utms")

      if (hasValidUtms === "true" && originalUtms) {
        try {
          const utmData = JSON.parse(originalUtms)
          const params = new URLSearchParams()

          if (utmData.utm_source) params.append("utm_source", utmData.utm_source)
          if (utmData.utm_medium) params.append("utm_medium", utmData.utm_medium)
          if (utmData.utm_campaign) params.append("utm_campaign", utmData.utm_campaign)
          if (utmData.utm_content) params.append("utm_content", utmData.utm_content)
          if (utmData.utm_term) params.append("utm_term", utmData.utm_term)
          if (utmData.xcod) params.append("xcod", utmData.xcod)

          utmParams = params.toString() ? `&${params.toString()}` : ""
          console.log("✅ UTMs capturados para checkout:", utmParams)
        } catch (error) {
          console.error("❌ Erro ao processar UTMs:", error)
        }
      }

      // URL do checkout MundPay
      const checkoutUrl = `https://pay.mundpay.com/01985d25-baa2-7213-9f1c-a96b491b23d8?ref=${utmParams}`

      console.log("🔗 Redirecionando para:", checkoutUrl)

      // Redirecionar para o checkout
      window.location.href = checkoutUrl
    } catch (error) {
      console.error("Erro ao redirecionar para checkout:", error)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/95 backdrop-blur-md border-b border-border shadow-sm sticky top-0 z-10">
        <nav className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors p-2"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              <span className="text-sm sm:text-base">Voltar</span>
            </Button>

            <div className="flex items-center">
              <Image src="/images/readcash-logo.png" alt="ReadCash Logo" width={120} height={24} priority />
            </div>
          </div>
        </nav>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Page Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Ativar Conta para Saque</h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Para liberar seus saques e começar a receber seus ganhos, você precisa ativar sua conta por apenas R$ 27,00.
          </p>
        </div>

        {/* Current Balance */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 shadow-lg mb-8">
          <CardContent className="p-6 text-center">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-foreground mb-2">Seu Saldo Atual</h2>
              <div className="text-3xl sm:text-4xl font-bold text-primary">{userBalance}</div>
              <p className="text-muted-foreground mt-2">Disponível após ativação da conta</p>
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-card/80 backdrop-blur-sm border-border shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Saques Ilimitados</h3>
                  <p className="text-muted-foreground">
                    Após a ativação, você poderá sacar seus ganhos quantas vezes quiser, sem taxas adicionais.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-border shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Shield className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Pagamento Seguro</h3>
                  <p className="text-muted-foreground">
                    Processamento seguro via PIX. Seus dados estão protegidos com criptografia de ponta.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-border shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Clock className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Ativação Instantânea</h3>
                  <p className="text-muted-foreground">
                    Sua conta é ativada automaticamente após a confirmação do pagamento via PIX.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-border shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Taxa Única</h3>
                  <p className="text-muted-foreground">
                    Pagamento único de R$ 27,00. Sem mensalidades ou taxas recorrentes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activation Card */}
        <Card className="bg-gradient-to-r from-green-500/10 to-green-600/10 border-green-500/20 shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Ativar Conta Agora</h2>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <span className="text-lg text-muted-foreground">Taxa de ativação:</span>
                <Badge className="bg-green-500 text-white text-lg px-4 py-2">R$ 27,00</Badge>
              </div>
              <p className="text-muted-foreground max-w-md mx-auto">
                Libere seus saques e comece a receber seus ganhos hoje mesmo!
              </p>
            </div>

            <Button
              onClick={handleActivateAccount}
              disabled={isLoading}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Redirecionando...
                </div>
              ) : (
                "ATIVAR CONTA - R$ 27,00"
              )}
            </Button>

            <p className="text-xs text-muted-foreground mt-4">Pagamento processado via PIX de forma segura</p>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card className="bg-card/60 backdrop-blur-sm border-border shadow-lg mt-8">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-foreground mb-6 text-center">Dúvidas Frequentes</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Por que preciso ativar minha conta?</h4>
                <p className="text-muted-foreground text-sm">
                  A ativação garante a segurança da plataforma e confirma sua identidade para processamento de
                  pagamentos.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Quando posso sacar após a ativação?</h4>
                <p className="text-muted-foreground text-sm">
                  Imediatamente após a confirmação do pagamento da taxa de ativação.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">A taxa é paga apenas uma vez?</h4>
                <p className="text-muted-foreground text-sm">
                  Sim, é um pagamento único. Não há mensalidades ou taxas recorrentes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
