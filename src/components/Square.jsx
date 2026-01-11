import React from 'react';

const Square = ({ value, onClick, isWinningSquare, disabled }) => {
  return (
    <button
      className={`square ${value ? 'animate-pop' : ''}`}
      onClick={onClick}
      disabled={disabled}
      style={{
        background: isWinningSquare ? 'var(--win-line)' : 'var(--cell-bg)',
        color: isWinningSquare ? '#fff' : 'var(--text-primary)',
        fontSize: '2rem',
        fontWeight: 'bold',
        height: '100px',
        width: '100px',
        margin: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        cursor: disabled ? 'default' : 'pointer',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        if (!disabled && !value) {
          e.currentTarget.style.background = 'var(--cell-hover)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !value) {
          e.currentTarget.style.background = 'var(--cell-bg)';
        }
      }}
    >
      {value}
    </button>
  );
};

export default Square;
