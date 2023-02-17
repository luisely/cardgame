;<div className="h-screen text-white flex flex-col justify-between">
  <div className="flex flex-wrap gap-2 justify-center">
    <LeftHandPlayer data={cardsleftPlayer} addCardToStoneLeft={addCardToStoneLeft} />
  </div>
  <div className="flex flex-wrap justify-center h-full">
    <div className="flex flex-col justify-center items-center">
      <div className="flex font-card-other -mt-6">{turn.toUpperCase()} PLAY </div>
      <button
        className={`
        font-card-other
        font-semibold
        bg-gradient-to-tr from-teal-900 to-zinc-800
        border border-zinc-700
        rounded-sm p-5 text-lg
        transition-colors ease-in-out hover:border-emerald-700 focus:border-emerald-700 duration-300`}
        onClick={() => handleBuyCard(turn)}
      >
        BUY CARD - {deckOfCards.length}
      </button>
    </div>
    <div className="h-auto flex flex-wrap gap-2 justify-center items-center grow">
      {stones.map((stone, i) => (
        <Board key={i} data={stone} />
      ))}
    </div>
    <div className="flex flex-wrap justify-center items-center gap-2">
      <button
        className={`
        font-card-other
        bg-gradient-to-tr from-red-900 to-zinc-800
        border border-zinc-700
        rounded-sm p-5 text-lg
        transition-colors ease-in-out hover:border-emerald-700 focus:border-emerald-700 duration-300`}
        onClick={() => clearStorage()}
      >
        RESTART
      </button>
    </div>
  </div>
  <div className="flex flex-wrap gap-2 justify-center">
    <RightHandPlayer data={cardsRightPlayer} addCardToStone={addCardToStone} />
  </div>
</div>

{
  /* <div className="h-screen w-screen flex flex-col items-center text-white justify-between">
<div class="grid grid-cols-6 grid-rows-1 gap-1">
  <LeftHandPlayer data={cardsleftPlayer} addCardToStoneLeft={addCardToStoneLeft} />
</div>

<div className="grid grid-cols-11 grid-rows-7">
  <div className="col-span-1 bg-gray-300 p-1">
    <div className="flex font-card-other">{turn.toUpperCase()} PLAY </div>
    <button
      className={`
      font-card-other
      font-semibold
      bg-gradient-to-tr from-teal-900 to-zinc-800
      border border-zinc-700
      rounded-sm p-5 text-lg
      transition-colors ease-in-out hover:border-emerald-700 focus:border-emerald-700 duration-300`}
      onClick={() => handleBuyCard(turn)}
    >
      BUY CARD - {deckOfCards.length}
    </button>
  </div>
  {stones.map((stone, i) => (
    <div class="col-span-1 bg-gray-300 p-1">
      <Board key={i} data={stone} />
    </div>
  ))}
  <div className="col-span-1 bg-gray-300 p-1">
    <button
      className={`
      font-card-other
      bg-gradient-to-tr from-red-900 to-zinc-800
      border border-zinc-700
      rounded-sm p-5 text-lg
      transition-colors ease-in-out hover:border-emerald-700 focus:border-emerald-700 duration-300`}
      onClick={() => clearStorage()}
    >
      RESTART
    </button>
  </div>
</div>
<div className="grid grid-cols-6 grid-rows-1 gap-1">
  <RightHandPlayer data={cardsRightPlayer} addCardToStone={addCardToStone} />
</div>
</div> */
}

;<div className="flex flex-wrap justify-center h-full">
  <div className="flex flex-col justify-center items-center">
    <div className="flex font-card-other -mt-6">{turn.toUpperCase()} PLAY </div>
    <button
      className={`
    font-card-other
    font-semibold
    bg-gradient-to-tr from-teal-900 to-zinc-800
    border border-zinc-700
    rounded-sm p-5 text-lg
    transition-colors ease-in-out hover:border-emerald-700 focus:border-emerald-700 duration-300`}
      onClick={() => handleBuyCard(turn)}
    >
      BUY CARD - {deckOfCards.length}
    </button>
  </div>
  <div className="h-auto flex gap-2 items-center justify-center grow">
    {stones.map((stone, i) => (
      <Board key={i} data={stone} />
    ))}
  </div>
  <div className="flex flex-wrap justify-center items-center gap-2">
    <button
      className={`
    font-card-other
    bg-gradient-to-tr from-red-900 to-zinc-800
    border border-zinc-700
    rounded-sm p-5 text-lg
    transition-colors ease-in-out hover:border-emerald-700 focus:border-emerald-700 duration-300`}
      onClick={() => clearStorage()}
    >
      RESTART
    </button>
  </div>
</div>
