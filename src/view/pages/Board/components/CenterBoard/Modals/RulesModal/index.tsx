import { memo } from 'react'
import { Modal } from '../../../../../../components/Modal'
import { useBoard } from '../../../BoardContext/useBoard'

export const RulesModal = memo(function RulesModal() {
  const { isRulesModalOpen, closeRulesModal } = useBoard()
  return (
    <Modal open={isRulesModalOpen} title="Rules of Game" onClose={closeRulesModal}>
      <div className="w-full flex flex-col mt-6">
        <ul className=" text-center">
          <li className="text-green-400">
            Objetivo do jogo:
            <ul className="ml-2 mt-2 font-medium">
              <li className="text-base md:text-lg text-white opacity-80">Quem vencer três pedras ganha o jogo.</li>
              <li className="text-base md:text-lg text-white opacity-80">Ganha a pedra quem tiver o melhor jogo</li>
              <li className="text-base md:text-lg text-white opacity-80 mt-1">
                Ordem das combinações do melhor ao pior.
                <ul className="mt-1">
                  <li className="text-lg text-white/80">
                    1. Sequencia mesma cor. Ex.: <span className="text-red-600">5</span>
                    <span className="m-1 text-red-600">4</span>
                    <span className="text-red-600">3</span>
                  </li>
                  <li className="text-lg text-white/80">
                    2. Trinca. Ex.: <span className="text-red-600">3</span>
                    <span className="m-1 text-green-600">3</span>
                    <span className="text-violet-600">3</span>
                  </li>
                  <li className="text-lg text-white/80">
                    3. Sequencia Ex.: <span className="text-red-600">3</span>
                    <span className="m-1 text-green-600">2</span>
                    <span className="text-violet-600">1</span>
                  </li>
                  <li className="text-lg text-white/80">
                    4. Mesma Cor Ex.: <span className="text-red-600">5</span>
                    <span className="m-1 text-red-600">2</span>
                    <span className="text-red-600">1</span>
                  </li>
                  <li className="text-lg text-white/80">
                    5. Soma Ex.: <span className="text-red-600">5</span>
                    <span className="m-1 text-green-600">2</span>
                    <span className="text-violet-600">5</span>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </Modal>
  )
})
