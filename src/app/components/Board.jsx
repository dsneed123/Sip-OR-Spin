import React from 'react';

const Board = ({ guesses, randomWord }) => {
  const checkGuess = (guess) => {
    const feedback = [];
    const upperGuess = guess.toUpperCase();
    const upperRandomWord = randomWord.toUpperCase();
    const usedIndices = new Set(); // Track indices already marked as correct or wrong-position

    // First pass: Mark correct letters
    for (let i = 0; i < upperGuess.length; i++) {
      if (upperGuess[i] === upperRandomWord[i]) {
        feedback[i] = 'correct';
        usedIndices.add(i);
      }
    }

    // Second pass: Mark wrong-position letters
    for (let i = 0; i < upperGuess.length; i++) {
      if (feedback[i]) continue; // Skip already marked letters

      for (let j = 0; j < upperRandomWord.length; j++) {
        if (upperGuess[i] === upperRandomWord[j] && !usedIndices.has(j)) {
          feedback[i] = 'wrong-position';
          usedIndices.add(j);
          break; // Only mark one instance
        }
      }

      if (!feedback[i]) {
        feedback[i] = 'incorrect'; // Mark as incorrect if not correct or wrong-position
      }
    }

    return feedback;
  };

  return (
    <div className="board">
      {guesses.map((guess, index) => {
        const feedback = checkGuess(guess);
        return (
          <div key={index} className="guess">
            {guess.split('').map((letter, i) => (
              <span key={i} className={feedback[i]}>
                {letter}
              </span>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Board;