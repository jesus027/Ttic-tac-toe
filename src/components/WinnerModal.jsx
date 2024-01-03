/* eslint-disable react/prop-types */
import { Square } from './Square'

export function WinnerModal ({ winner, resetGame }) {
  if (winner === null) return null

  const winnerText = winner === false ? 'Empate' : 'Gano: '

  return (
    <sectionon className='winner'>
      <div className='text'>
        <h2>{winnerText}</h2>

        <header className='win'>
          {winner && <Square>{winner}</Square>}
        </header>

        <footer>
          <button onClick={resetGame}>Empezar Nuevo Juego</button>
        </footer>
      </div>
    </sectionon>
  )
}
