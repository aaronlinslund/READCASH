"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LoginModal } from "@/components/login-modal"
import { RegisterModal } from "@/components/register-modal"

export function Header() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)

  const switchToRegister = () => {
    setShowLoginModal(false)
    setShowRegisterModal(true)
  }

  const switchToLogin = () => {
    setShowRegisterModal(false)
    setShowLoginModal(true)
  }

  const closeAllModals = () => {
    setShowLoginModal(false)
    setShowRegisterModal(false)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
        <nav className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <Link href="/" className="flex items-center">
              <Image src="/images/readcash-logo.png" alt="ReadCash Logo" width={160} height={32} priority />
            </Link>

            {/* Desktop Navigation */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button
                variant="ghost"
                className="text-white hover:text-primary hover:bg-primary/10 transition-all duration-200 text-sm px-2 py-1 sm:text-base sm:px-4 sm:py-2 h-8 sm:h-auto"
                onClick={() => setShowLoginModal(true)}
              >
                Entrar
              </Button>
              <Button
                className="bg-[#10B981] hover:bg-[#34D399] text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 text-sm px-3 py-1 sm:text-base sm:px-4 sm:py-2 h-8 sm:h-auto rounded-md"
                onClick={() => setShowRegisterModal(true)}
              >
                Cadastrar
              </Button>
            </div>
          </div>
        </nav>
      </header>

      <LoginModal isOpen={showLoginModal} onClose={closeAllModals} onSwitchToRegister={switchToRegister} />
      <RegisterModal isOpen={showRegisterModal} onClose={closeAllModals} onSwitchToLogin={switchToLogin} />
    </>
  )
}
