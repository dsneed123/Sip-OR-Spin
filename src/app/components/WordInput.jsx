import React, { useEffect } from 'react';

const WordInput = ({ guess, setGuess, handleGuess, gameOver }) => {
  // Handle Enter key press
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && !gameOver) {
        handleGuess();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleGuess, gameOver]);

  return (
    <div className="word-input">
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value.toUpperCase())}
        maxLength="5"
        disabled={gameOver} // Disable input when the game is over
        placeholder="Enter guess"
      />
      <button onClick={handleGuess} disabled={gameOver}>
        Guess
      </button>
    </div>
  );
};

export default WordInput;