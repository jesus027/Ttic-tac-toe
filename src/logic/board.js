import { WINNER_COMBOS } from '../Constants.js'

export const checkWinnerFrom = (boardToCheck) => {
  // Revisamos todas las combinaciones para encontrar al ganador
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo
    if (
      boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a] // X u O
    }
  }

  // si no hay ganador
  return null
}

export const checkEndGame = (newBoard) => {
// Revisamos si hay un empate
  return newBoard.every((square) => square === null)
}
