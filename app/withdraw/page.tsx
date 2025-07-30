"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Clock,
  Shield,
  Zap,
  BookOpen,
  DollarSign,
  ArrowRight,
  Smartphone,
  Users,
  TrendingUp,
} from "lucide-react"

export default function WithdrawPage() {
  const [isRedirecting, setIsRedirecting] = useState(false)

  const handleActivateAccount = () => {
    setIsRedirecting(true)

    // Redirecionar para o checkout MundPay
    window.location.href = "https://pay.mundpay.com/01985d25-baa2-7213-9f1c-a96b491b23d8?ref="
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium">
              🚀 Ative sua conta agora
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Libere seu saque
              <span className="block text-primary">Leia e receba por PIX</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Transforme sua paixão por leitura em renda extra. Ative sua conta por apenas R$ 27,00 e comece a ganhar
              dinheiro lendo livros.
            </p>
          </div>

          {/* Hero Image */}
          <div className="flex justify-center mb-12">
            <div className="relative max-w-4xl w-full">
              <img
                src="https://sjc.microlink.io/MDhj8FD2NfMFMYEp-3xIWUtc_TG3Vex8AkjQ_WdooLf_RxXaWx1QiMkOOLgSMnxvd60NkO_T0s0hIHFrt2lPMQ.jpeg"
                alt="ReadCash - Ganhe dinheiro lendo livros via PIX"
                className="w-full h-auto rounded-2xl shadow-2xl border border-border"
              />
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Button
              onClick={handleActivateAccount}
              disabled={isRedirecting}
              size="lg"
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isRedirecting ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                  Redirecionando...
                </div>
              ) : (
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  ATIVAR CONTA - R$ 27,00
                  <ArrowRight className="w-5 h-5 ml-2" />
                </div>
              )}
            </Button>
            <p className="text-sm text-muted-foreground mt-4">💳 Pagamento seguro via PIX • ⚡ Ativação instantânea</p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Por que ativar sua conta ReadCash?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubra todos os benefícios de ser um leitor profissional
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-border hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-xl">Ganhe por Leitura</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Receba de R$ 30 a R$ 200 por cada livro lido e avaliado. Quanto mais você lê, mais você ganha.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Saque Instantâneo</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Receba seus ganhos diretamente via PIX. Saque disponível 24/7 sem taxas adicionais.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Livros Exclusivos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Acesso a uma biblioteca com centenas de livros inéditos de autores nacionais e internacionais.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle className="text-xl">Flexibilidade Total</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Leia no seu ritmo, quando e onde quiser. Sem metas obrigatórias ou prazos rígidos.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <CardTitle className="text-xl">100% Seguro</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Plataforma segura e confiável. Seus dados e pagamentos protegidos com criptografia avançada.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-teal-600" />
              </div>
              <CardTitle className="text-xl">Comunidade Ativa</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Faça parte de uma comunidade de leitores apaixonados e compartilhe suas experiências.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-muted/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Resultados que falam por si</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">R$ 2.5M+</div>
              <p className="text-muted-foreground">Pagos aos leitores</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">15.000+</div>
              <p className="text-muted-foreground">Leitores ativos</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">500+</div>
              <p className="text-muted-foreground">Livros disponíveis</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Perguntas Frequentes</h2>
        </div>

        <div className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                Como funciona o pagamento?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Você paga apenas R$ 27,00 uma única vez para ativar sua conta. Depois disso, ganha dinheiro lendo livros
                e fazendo avaliações. Os pagamentos são feitos via PIX instantaneamente.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                Quanto posso ganhar por livro?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Os valores variam de R$ 30 a R$ 200 por livro, dependendo do tamanho, complexidade e qualidade da sua
                avaliação. Leitores dedicados podem ganhar até R$ 3.000 por mês.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                Existe alguma taxa de saque?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Não! Todos os saques via PIX são gratuitos e instantâneos. Você recebe 100% do valor que ganhou lendo.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                Posso cancelar minha conta?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Sim, você pode cancelar a qualquer momento. Oferecemos garantia de 7 dias - se não ficar satisfeito,
                devolvemos seu dinheiro.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Pronto para começar a ganhar dinheiro lendo?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de leitores que já transformaram sua paixão em renda extra.
          </p>

          <Button
            onClick={handleActivateAccount}
            disabled={isRedirecting}
            size="lg"
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isRedirecting ? (
              <div className="flex items-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                Redirecionando...
              </div>
            ) : (
              <div className="flex items-center">
                <Smartphone className="w-5 h-5 mr-2" />
                ATIVAR CONTA AGORA - R$ 27,00
                <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            )}
          </Button>

          <p className="text-sm text-muted-foreground mt-4">
            ✅ Ativação instantânea • 🔒 Pagamento 100% seguro • 💰 Garantia de 7 dias
          </p>
        </div>
      </div>
    </div>
  )
}
