import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'

import { Square } from './components/Square'
import { TURNS } from './Constants'
import { checkWinnerFrom, checkEndGame } from './logic/board'
import { WinnerModal } from './components/WinnerModal'
import { saveGameToStorage, resetGameStorage } from './logic/storage'

function App () {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.x
  })

  const [winner, setWinner] = useState(null) // NULL si no hay ganador, FALSE si hay empate

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.x)
    setWinner(null)

    resetGameStorage()
  }

  const updateBoard = (index) => {
    // No Actualizamos esta posición SI ya tiene algo
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn // X u O
    setBoard(newBoard)

    // Cambiamos el turno
    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x
    setTurn(newTurn)

    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })

    // Revisamos si hay un ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  useEffect(() => {
    console.log('useEfect')
  }, [])

  return (
    <>
      <main className='board'>
        <h1>Juego 3 en Raya</h1>
        <button onClick={resetGame}>Empezar Nuevo Juego</button>

        <section className='game'>
          {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
          }
        </section>

        <section className='turn'>
          <Square isSelected={turn === TURNS.x}>
            {TURNS.x}
          </Square>

          <Square isSelected={turn === TURNS.o}>
            {TURNS.o}
          </Square>
        </section>

        <WinnerModal resetGame={resetGame} winner={winner} />

      </main>
    </>
  )
}

export default App
