"use client";
import React, { useState, useEffect } from 'react';
import Board from '../components/Board';
import WordInput from '../components/WordInput';
import Confetti from 'react-confetti'; // Import Confetti
import './App.css';

// List of 5-letter words
const WORDS = [
  "drink", "apple", "table", "crane", "light",
  "house", "plant", "water", "music", "happy"
];

const MAX_GUESSES = 5; // Maximum number of guesses

const App = () => {
  const [guesses, setGuesses] = useState([]);
  const [guess, setGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [randomWord, setRandomWord] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(""); // Message to display in the pop-up

  // Set a random word when the component mounts
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    setRandomWord(WORDS[randomIndex]);
  }, []);

  const handleGuess = () => {
    if (guess.length === 5 && !gameOver) {
      setGuesses([...guesses, guess]);
      if (guess.toUpperCase() === randomWord.toUpperCase()) {
        setGameOver(true);
        setMessage("You win!"); // Set win message
        setShowMessage(true);
      } else if (guesses.length + 1 >= MAX_GUESSES) {
        setGameOver(true);
        setMessage(`You lose! The word was ${randomWord.toUpperCase()}! Time to drink 🍺`); // Set lose message
        setShowMessage(true);
      }
      setGuess('');
    }
  };

  const closeMessage = () => {
    setShowMessage(false);
  };

  // Reset the game
  const resetGame = () => {
    setGuesses([]);
    setGuess('');
    setGameOver(false);
    setShowMessage(false);
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    setRandomWord(WORDS[randomIndex]);
  };

  return (
    <div className="app">
      <div className="header">
        <h1>Wordle Drinking Game</h1>
        <p>Guess the 5-letter word. Good luck!</p>
      </div>
      <Board guesses={guesses} randomWord={randomWord} />
      <WordInput
        guess={guess}
        setGuess={setGuess}
        handleGuess={handleGuess}
        gameOver={gameOver} // Pass gameOver state to disable input
      />
      
      {/* Pop-up message */}
      {showMessage && (
        <>
          {/* Show confetti only when the player wins */}
          {message.includes("win") && <Confetti />}
          <div className="popup">
            <div className="popup-content">
              <h2>{message}</h2>
              <button onClick={resetGame}>Play Again</button>
            </div>
          </div>
        </>
      )}

      {/* Display remaining guesses */}
      <p className="guesses-remaining">
        Guesses remaining: {MAX_GUESSES - guesses.length}
      </p>
    </div>
  );
};

export default App;