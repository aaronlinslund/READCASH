import type React from "react"
import { Modal } from "antd"
import type { Evaluation } from "@/types"
import { calculatePoints } from "@/utils"

interface EvaluationModalProps {
  evaluation: Evaluation
  visible: boolean
  onCancel: () => void
}

const EvaluationModal: React.FC<EvaluationModalProps> = ({ evaluation, visible, onCancel }) => {
  const { questions, points } = evaluation

  return (
    <Modal title="Avaliação" visible={visible} onCancel={onCancel} footer={null} className="bg-black text-white">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4 text-white">Resultados da Avaliação</h2>
        <h4 className="font-semibold text-white mb-2">📊 Como Calculamos Seus Ganhos</h4>
        <p className="text-sm text-gray-200 mb-4">Sua remuneração é baseada em:</p>
        {/* List of factors contributing to earnings */}
        <h4 className="font-semibold text-white mb-2">📝 Suas Respostas</h4>
        {questions.map((question, index) => (
          <div key={index} className="mb-4">
            <p className="text-sm text-gray-200 mb-2">{question.text}</p>
            <p className="text-sm text-white">{question.answer}</p>
          </div>
        ))}
        <h4 className="font-semibold text-white mb-2">🌟 Pontuação</h4>
        <p className="text-sm text-gray-200 mb-2">Você recebeu:</p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-200">Total de Pontos:</span>
          <span className="text-sm text-green-500 font-bold">{calculatePoints(points)}</span>
        </div>
        {/* Additional sections can be added here */}
      </div>
    </Modal>
  )
}

export default EvaluationModal
