import React from 'react';

const Board = ({ guesses, randomWord }) => {
  const checkGuess = (guess) => {
    const feedback = [];
    const upperGuess = guess.toUpperCase(); // Convert guess to uppercase
    const upperRandomWord = randomWord.toUpperCase(); // Convert randomWord to uppercase

    for (let i = 0; i < upperGuess.length; i++) {
      if (upperGuess[i] === upperRandomWord[i]) {
        feedback.push('correct'); // Correct letter in the correct position
      } else if (upperRandomWord.includes(upperGuess[i])) {
        feedback.push('wrong-position'); // Correct letter in the wrong position
      } else {
        feedback.push('incorrect'); // Letter not in the word
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