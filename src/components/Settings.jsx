import React from 'react';

const Settings = ({
  gameMode,
  setGameMode,
  difficulty,
  setDifficulty,
  soundEnabled,
  setSoundEnabled,
  p1Name,
  setP1Name,
  p2Name,
  setP2Name,
  p1Char,
  setP1Char,
  p2Char,
  setP2Char,
  showSettings,
  setShowSettings
}) => {
  if (!showSettings) {
    return (
      <button 
        onClick={() => setShowSettings(true)}
        style={{ marginTop: '1rem', background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--text-secondary)' }}
      >
        ⚙️ Settings
      </button>
    );
  }

  return (
    <div style={{
      background: 'var(--board-bg)',
      padding: '20px',
      borderRadius: '15px',
      marginTop: '20px',
      textAlign: 'left',
      maxWidth: '400px',
      width: '100%',
      position: 'relative'
    }}>
      <button 
        onClick={() => setShowSettings(false)}
        style={{ position: 'absolute', top: '10px', right: '10px', padding: '5px', background: 'transparent', color: 'var(--text-primary)', boxShadow: 'none' }}
      >
        ✕
      </button>

      <h3 style={{ marginTop: 0 }}>Settings</h3>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Game Mode:</label>
        <select 
          value={gameMode} 
          onChange={(e) => setGameMode(e.target.value)}
          style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid var(--text-secondary)' }}
        >
          <option value="pvp">Local Multiplayer</option>
          <option value="ai">vs AI</option>
        </select>
      </div>

      {gameMode === 'ai' && (
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Difficulty:</label>
          <select 
            value={difficulty} 
            onChange={(e) => setDifficulty(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid var(--text-secondary)' }}
          >
            <option value="easy">Easy (Random)</option>
            <option value="medium">Medium (Balanced)</option>
            <option value="hard">Hard (Unbeatable)</option>
          </select>
        </div>
      )}

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Player 1 ({p1Char}) Name:</label>
        <input 
          type="text" 
          value={p1Name} 
          onChange={(e) => setP1Name(e.target.value)}
          maxLength={10}
          style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid var(--text-secondary)' }}
        />
        <div style={{ marginTop: '5px', display: 'flex', gap: '5px' }}>
             {['❌', '⭕', '🐶', '🐱', '🚀', '⭐'].map(char => (
                 <button 
                    key={char} 
                    onClick={() => setP1Char(char)}
                    style={{ padding: '2px 5px', fontSize: '1.2rem', background: p1Char === char ? 'var(--accent)' : 'transparent' }}
                 >
                    {char}
                 </button>
             ))}
        </div>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Player 2 ({p2Char}) Name:</label>
        <input 
          type="text" 
          value={p2Name} 
          onChange={(e) => setP2Name(e.target.value)}
          maxLength={10}
          style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid var(--text-secondary)' }}
        />
        <div style={{ marginTop: '5px', display: 'flex', gap: '5px' }}>
             {['❌', '⭕', '💀', '👽', '🍔', '🍕'].map(char => (
                 <button 
                    key={char} 
                    onClick={() => setP2Char(char)}
                    style={{ padding: '2px 5px', fontSize: '1.2rem', background: p2Char === char ? 'var(--accent)' : 'transparent' }}
                 >
                    {char}
                 </button>
             ))}
        </div>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input 
            type="checkbox" 
            checked={soundEnabled} 
            onChange={(e) => setSoundEnabled(e.target.checked)}
          />
          Sound Effects
        </label>
      </div>
    </div>
  );
};

export default Settings;
