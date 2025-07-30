"use client"

import React from "react"
import { Modal } from "antd"

const QuestionsModal: React.FC = () => {
  const [visible, setVisible] = React.useState(false)

  const showModal = () => {
    setVisible(true)
  }

  const handleOk = () => {
    setVisible(false)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  return (
    <div>
      <button onClick={showModal} className="bg-blue-500 text-white px-4 py-2 rounded">
        Ver Perguntas
      </button>
      <Modal
        title={<h3 className="text-lg font-semibold text-white mb-4">Perguntas sobre o Livro</h3>}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        className="bg-gray-800 text-white"
      >
        <div className="bg-gray-900 p-4 rounded">
          <p className="text-gray-200 mb-2">Pergunta 1: Qual é o tema principal do livro?</p>
          <div className="flex flex-col space-y-2">
            <label className="text-gray-400">Resposta A</label>
            <label className="text-gray-400">Resposta B</label>
            <label className="text-gray-400">Resposta C</label>
          </div>
          <p className="text-gray-200 mb-2 mt-4">Pergunta 2: Quem é o autor do livro?</p>
          <div className="flex flex-col space-y-2">
            <label className="text-gray-400">Resposta A</label>
            <label className="text-gray-400">Resposta B</label>
            <label className="text-gray-400">Resposta C</label>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export { QuestionsModal }
