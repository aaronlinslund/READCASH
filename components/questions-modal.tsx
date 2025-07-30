"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"

interface QuestionsModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
}

export function QuestionsModal({ isOpen, onClose, onComplete }: QuestionsModalProps) {
  const [formData, setFormData] = useState({
    favoriteGenre: "",
    readingFrequency: "",
    experience: "",
    motivation: "",
  })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Salvar respostas no localStorage
    const userData = JSON.parse(localStorage.getItem("betareader_user_data") || "{}")
    userData.questionsAnswered = true
    userData.questionsData = formData
    localStorage.setItem("betareader_user_data", JSON.stringify(userData))

    onComplete()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-background rounded-2xl w-full max-w-md p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center mb-4 sm:mb-6">
          <button
            onClick={onClose}
            className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            <span className="text-sm sm:text-base">Voltar</span>
          </button>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Conte-nos sobre você</h2>
          <p className="text-muted-foreground text-sm">Isso nos ajuda a encontrar os melhores livros para você</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="favoriteGenre" className="text-foreground font-medium">
              Qual seu gênero favorito?
            </Label>
            <Input
              id="favoriteGenre"
              value={formData.favoriteGenre}
              onChange={(e) => handleInputChange("favoriteGenre", e.target.value)}
              className="mt-1 border-border focus:border-primary focus:ring-primary"
              placeholder="Ex: Ficção científica, Romance, Thriller..."
              required
            />
          </div>

          <div>
            <Label htmlFor="readingFrequency" className="text-foreground font-medium">
              Com que frequência você lê?
            </Label>
            <select
              id="readingFrequency"
              value={formData.readingFrequency}
              onChange={(e) => handleInputChange("readingFrequency", e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-border rounded-md focus:border-primary focus:ring-primary bg-background text-foreground"
              required
            >
              <option value="">Selecione uma opção</option>
              <option value="daily">Diariamente</option>
              <option value="weekly">Algumas vezes por semana</option>
              <option value="monthly">Algumas vezes por mês</option>
              <option value="occasionally">Ocasionalmente</option>
            </select>
          </div>

          <div>
            <Label htmlFor="experience" className="text-foreground font-medium">
              Você já fez avaliações de livros antes?
            </Label>
            <select
              id="experience"
              value={formData.experience}
              onChange={(e) => handleInputChange("experience", e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-border rounded-md focus:border-primary focus:ring-primary bg-background text-foreground"
              required
            >
              <option value="">Selecione uma opção</option>
              <option value="yes-professional">Sim, profissionalmente</option>
              <option value="yes-hobby">Sim, como hobby</option>
              <option value="no">Não, seria minha primeira vez</option>
            </select>
          </div>

          <div>
            <Label htmlFor="motivation" className="text-foreground font-medium">
              O que te motiva a ser um beta reader?
            </Label>
            <Textarea
              id="motivation"
              value={formData.motivation}
              onChange={(e) => handleInputChange("motivation", e.target.value)}
              className="mt-1 border-border focus:border-primary focus:ring-primary"
              placeholder="Conte-nos suas motivações..."
              rows={3}
              required
            />
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/80 text-white py-2 text-base font-medium">
            Continuar
          </Button>
        </form>
      </div>
    </div>
  )
}
