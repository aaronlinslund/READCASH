"use client"

import Image from "next/image"
import { Star, Shield, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-background text-white px-3 sm:px-4 lg:px-8 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div className="md:col-span-2">
            <Image
              src="/images/readcash-logo.png"
              alt="ReadCash Logo"
              width={160}
              height={32}
              priority
              className="mb-3 sm:mb-4"
            />
            <p className="text-muted-foreground mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
              A maior plataforma de beta reading do Brasil. Transforme sua paixão por livros em renda extra de forma
              segura e confiável.
            </p>
          </div>
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-primary" />
              <span className="text-sm sm:text-base text-muted-foreground">Pagamentos Seguros</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-accent" />
              <span className="text-sm sm:text-base text-muted-foreground">Suporte 24/7</span>
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-yellow-400" />
              <span className="text-sm sm:text-base text-muted-foreground">Certificado de Qualidade</span>
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-6 sm:pt-8 text-center">
          <p className="text-muted-foreground text-sm sm:text-base">
            © 2024 Beta Reader Go. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
