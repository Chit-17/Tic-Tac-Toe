import React from 'react';
import Square from './Square';

const Board = ({ squares, onClick, winningLine, disabled }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        padding: '10px',
        background: 'var(--board-bg)',
        borderRadius: '15px',
        backdropFilter: 'blur(5px)',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
      }}
    >
      {squares.map((square, i) => (
        <Square
          key={i}
          value={square}
          onClick={() => onClick(i)}
          isWinningSquare={winningLine && winningLine.includes(i)}
          disabled={disabled || square !== null}
        />
      ))}
    </div>
  );
};

export default Board;
