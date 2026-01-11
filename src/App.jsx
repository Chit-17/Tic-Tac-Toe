import React, { useState, useEffect, useCallback, useRef } from 'react';
import Board from './components/Board';
import ThemeSelector from './components/ThemeSelector';
import Settings from './components/Settings';
import { calculateWinner, isBoardFull, getBestMove } from './utils/gameLogic';
import { applyTheme } from './utils/themes';

function App() {
  // Game State
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  
  // Settings State
  const [gameMode, setGameMode] = useState('pvp'); // 'pvp' or 'ai'
  const [difficulty, setDifficulty] = useState('medium');
  const [p1Name, setP1Name] = useState('Player 1');
  const [p2Name, setP2Name] = useState('Player 2');
  const [p1Char, setP1Char] = useState('❌');
  const [p2Char, setP2Char] = useState('⭕');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentTheme, setCurrentTheme] = useState('ocean');
  const [showSettings, setShowSettings] = useState(false);

  // Score State
  const [score, setScore] = useState({ p1: 0, p2: 0, draws: 0 });

  const current = history[stepNumber];
  const { winner, line: winningLine } = calculateWinner(current.squares) || {};
  const isDraw = !winner && isBoardFull(current.squares);

  // Sound Effect Helper
  const playSound = useCallback((type) => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      const now = ctx.currentTime;
      
      if (type === 'move') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(500, now + 0.1);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === 'win') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.linearRampToValueAtTime(600, now + 0.1);
        osc.frequency.linearRampToValueAtTime(800, now + 0.2);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
      } else if (type === 'reset') {
         osc.type = 'square';
         osc.frequency.setValueAtTime(200, now);
         gain.gain.setValueAtTime(0.05, now);
         osc.start(now);
         osc.stop(now + 0.1);
      }
    } catch (e) {
      console.error("Audio error", e);
    }
  }, [soundEnabled]);

  // Apply theme on mount
  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  // AI Move Logic
  useEffect(() => {
    if (gameMode === 'ai' && !xIsNext && !winner && !isDraw) {
      // Small delay for realism
      const timer = setTimeout(() => {
        const aiMoveIndex = getBestMove(
            [...current.squares], 
            p2Char, // AI is Player 2
            p1Char, // Human is Player 1
            difficulty
        );
        if (aiMoveIndex !== -1) {
            handleClick(aiMoveIndex, true);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [gameMode, xIsNext, winner, isDraw, current.squares, difficulty, p1Char, p2Char]);

  // Update Score on Win/Draw
  useEffect(() => {
    if (winner) {
      playSound('win');
      if (winner === p1Char) {
        setScore(s => ({ ...s, p1: s.p1 + 1 }));
      } else {
        setScore(s => ({ ...s, p2: s.p2 + 1 }));
      }
    } else if (isDraw) {
      setScore(s => ({ ...s, draws: s.draws + 1 }));
    }
  }, [winner, isDraw, p1Char, p2Char, playSound]);

  const handleClick = (i, isAiMove = false) => {
    // Prevent move if game over or square filled
    if (calculateWinner(current.squares) || current.squares[i]) {
      return;
    }

    // Prevent human moving during AI turn
    if (gameMode === 'ai' && !xIsNext && !isAiMove) {
        return;
    }

    const newHistory = history.slice(0, stepNumber + 1);
    const currentSquares = current.squares.slice();
    currentSquares[i] = xIsNext ? p1Char : p2Char;
    
    setHistory(newHistory.concat([{ squares: currentSquares }]));
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
    playSound('move');
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
    playSound('reset');
  };

  const resetGame = () => {
    setHistory([{ squares: Array(9).fill(null) }]);
    setStepNumber(0);
    setXIsNext(true);
    playSound('reset');
  };

  const getStatus = () => {
    if (winner) {
      return `Winner: ${winner === p1Char ? p1Name : (gameMode === 'ai' ? 'AI' : p2Name)}`;
    } else if (isDraw) {
      return "It's a Draw!";
    } else {
      return `Next player: ${xIsNext ? p1Name : (gameMode === 'ai' ? 'AI' : p2Name)}`;
    }
  };

  return (
    <div className="app">
      <h1 className="animate-fade">Tic Tac Toe</h1>
      
      <ThemeSelector currentTheme={currentTheme} onThemeChange={setCurrentTheme} />

      <div className="score-board animate-fade" style={{ display: 'flex', gap: '20px', marginBottom: '20px', fontWeight: 'bold' }}>
        <div style={{ color: xIsNext ? 'var(--accent)' : 'var(--text-primary)' }}>
            {p1Name} ({p1Char}): {score.p1}
        </div>
        <div>Draws: {score.draws}</div>
        <div style={{ color: !xIsNext ? 'var(--accent)' : 'var(--text-primary)' }}>
            {gameMode === 'ai' ? 'AI' : p2Name} ({p2Char}): {score.p2}
        </div>
      </div>

      <div className="status animate-fade" style={{ fontSize: '1.2rem', marginBottom: '10px', minHeight: '30px' }}>
        {getStatus()}
        {winner && <div className="animate-celebrate">🎉</div>}
      </div>

      <Board 
        squares={current.squares} 
        onClick={handleClick} 
        winningLine={winningLine}
        disabled={!!winner || (gameMode === 'ai' && !xIsNext)}
      />

      <div className="controls animate-fade" style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <button onClick={() => jumpTo(stepNumber > 0 ? stepNumber - 1 : 0)} disabled={stepNumber === 0}>
          Undo
        </button>
        <button onClick={resetGame}>
          New Game
        </button>
        <button onClick={() => jumpTo(stepNumber < history.length - 1 ? stepNumber + 1 : history.length - 1)} disabled={stepNumber === history.length - 1}>
          Redo
        </button>
      </div>

      <Settings 
        gameMode={gameMode} setGameMode={setGameMode}
        difficulty={difficulty} setDifficulty={setDifficulty}
        soundEnabled={soundEnabled} setSoundEnabled={setSoundEnabled}
        p1Name={p1Name} setP1Name={setP1Name}
        p2Name={p2Name} setP2Name={setP2Name}
        p1Char={p1Char} setP1Char={setP1Char}
        p2Char={p2Char} setP2Char={setP2Char}
        showSettings={showSettings} setShowSettings={setShowSettings}
      />
    </div>
  );
}

export default App;
