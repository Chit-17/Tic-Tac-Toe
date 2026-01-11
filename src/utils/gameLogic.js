// Winning combinations indices
const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6], // Diagonals
];

export const calculateWinner = (squares) => {
  for (let i = 0; i < WINNING_LINES.length; i++) {
    const [a, b, c] = WINNING_LINES[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: WINNING_LINES[i] };
    }
  }
  return null;
};

export const isBoardFull = (squares) => {
  return squares.every((square) => square !== null);
};

// AI Logic

// Evaluate board state for Minimax
const evaluate = (squares, aiPlayer, humanPlayer) => {
  const winnerInfo = calculateWinner(squares);
  if (winnerInfo) {
    if (winnerInfo.winner === aiPlayer) return 10;
    if (winnerInfo.winner === humanPlayer) return -10;
  }
  return 0;
};

// Minimax algorithm
const minimax = (squares, depth, isMax, aiPlayer, humanPlayer) => {
  const score = evaluate(squares, aiPlayer, humanPlayer);

  // If AI wins or Human wins, return score
  if (score === 10) return score - depth;
  if (score === -10) return score + depth;

  // If tie
  if (isBoardFull(squares)) return 0;

  if (isMax) {
    let best = -1000;
    for (let i = 0; i < 9; i++) {
      if (squares[i] === null) {
        squares[i] = aiPlayer;
        best = Math.max(best, minimax(squares, depth + 1, !isMax, aiPlayer, humanPlayer));
        squares[i] = null; // Undo move
      }
    }
    return best;
  } else {
    let best = 1000;
    for (let i = 0; i < 9; i++) {
      if (squares[i] === null) {
        squares[i] = humanPlayer;
        best = Math.min(best, minimax(squares, depth + 1, !isMax, aiPlayer, humanPlayer));
        squares[i] = null; // Undo move
      }
    }
    return best;
  }
};

export const getBestMove = (squares, aiPlayer, humanPlayer, difficulty) => {
  const availableMoves = squares
    .map((val, idx) => (val === null ? idx : null))
    .filter((val) => val !== null);

  if (availableMoves.length === 0) return -1;

  // Easy: Random move
  if (difficulty === 'easy') {
    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[randomIndex];
  }

  // Medium: 50% chance of optimal, 50% random
  if (difficulty === 'medium') {
    const randomChance = Math.random();
    if (randomChance > 0.5) {
      const randomIndex = Math.floor(Math.random() * availableMoves.length);
      return availableMoves[randomIndex];
    }
    // Fall through to hard logic for the other 50%
  }

  // Hard: Minimax (Optimal)
  let bestVal = -1000;
  let bestMove = -1;

  for (let i = 0; i < availableMoves.length; i++) {
    const move = availableMoves[i];
    squares[move] = aiPlayer;
    const moveVal = minimax(squares, 0, false, aiPlayer, humanPlayer);
    squares[move] = null; // Undo

    if (moveVal > bestVal) {
      bestMove = move;
      bestVal = moveVal;
    }
  }

  return bestMove;
};
