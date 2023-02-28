import React from 'react'

export default function RulesOfGame() {
  return (
    <>
      <div className="w-full flex flex-col mt-6">
        <ul className=" text-center">
          <li className="text-green-400">
            Objetivos do jogo:
            <ul className="ml-2 mt-2">
              <li className="text-base md:text-lg text-white opacity-80">Quem vencer cinco 5 pedras ganha o jogo.</li>
              <li className="text-base md:text-lg text-white opacity-80">Ganha a pedra quem tiver o melhor jogo</li>
              <li className="text-base md:text-lg text-white opacity-80 mt-1">
                Ordem das combinações do melhor ao pior.
                <ul>
                  <li className="text-lg text-white opacity-80">
                    1. Sequencia mesma cor. Ex.: <span className="text-red-600">5</span>
                    <span className="m-1 text-red-600">4</span>
                    <span className="text-red-600">3</span>
                  </li>
                  <li className="text-lg text-white opacity-80">
                    2. Trinca. Ex.: <span className="text-red-600">3</span>
                    <span className="m-1 text-green-600">3</span>
                    <span className="text-violet-600">3</span>
                  </li>
                  <li className="text-lg text-white opacity-80">
                    3. Sequencia Ex.: <span className="text-red-600">3</span>
                    <span className="m-1 text-green-600">2</span>
                    <span className="text-violet-600">1</span>
                  </li>
                  <li className="text-lg text-white opacity-80">
                    4. Mesma Cor Ex.: <span className="text-red-600">5</span>
                    <span className="m-1 text-red-600">2</span>
                    <span className="text-red-600">7</span>
                  </li>
                  <li className="text-lg text-white opacity-80">
                    5. Soma Ex.: <span className="text-red-600">5</span>
                    <span className="m-1 text-green-600">2</span>
                    <span className="text-violet-600">7</span>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  )
}
