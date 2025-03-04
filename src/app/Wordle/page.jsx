"use client";
import React, { useState, useEffect } from 'react';
import Board from '../components/Board';
import WordInput from '../components/WordInput';
import Confetti from 'react-confetti'; // Import Confetti
import './App.css';

const MAX_GUESSES = 5; // Maximum number of guesses

const App = () => {
  const [guesses, setGuesses] = useState([]);
  const [guess, setGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [randomWord, setRandomWord] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [validWords, setValidWords] = useState([]); // List of valid words
  const [targetWords, setTargetWords] = useState([]); // List of target words

  // Fetch word lists from .txt files
  useEffect(() => {
    const fetchWords = async () => {
      try {
        // Fetch target words
        const targetResponse = await fetch('/words.txt');
        const targetText = await targetResponse.text();
        const targetWords = targetText.split('\n').map(word => word.trim());
        setTargetWords(targetWords);

        // Fetch valid words
        const validResponse = await fetch('/valid-words.txt');
        const validText = await validResponse.text();
        const validWords = validText.split('\n').map(word => word.trim());
        setValidWords(validWords);

        // Set a random target word
        const randomIndex = Math.floor(Math.random() * targetWords.length);
        setRandomWord(targetWords[randomIndex]);
      } catch (error) {
        console.error("Error fetching word lists:", error);
      }
    };

    fetchWords();
  }, []);

  const handleGuess = () => {
    if (guess.length === 5 && !gameOver) {
      // Check if the word is valid
      if (!validWords.includes(guess.toLowerCase())) {
        setMessage("Invalid word! Try again.");
        setShowMessage(true);
        return; // Exit if the word is invalid
      }

      setGuesses([...guesses, guess]);

      // Check win condition
      if (guess.toUpperCase() === randomWord.toUpperCase()) {
        setGameOver(true);
        setMessage("You win!"); // Set win message
        setShowMessage(true);
      } else if (guesses.length + 1 >= MAX_GUESSES) {
        setGameOver(true);
        setMessage(`You lose! The word was ${randomWord.toUpperCase()}! Time to drink 🍺`);
        setShowMessage(true);
      }

      setGuess('');
    }
  };

  // Auto-hide invalid word message after 1.5 seconds
  useEffect(() => {
    if (showMessage && message.includes("Invalid")) {
      const timer = setTimeout(() => {
        setShowMessage(false); // Hide the message after 1.5 seconds
      }, 1500);
      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [showMessage, message]);

  // Reset the game
  const resetGame = () => {
    setGuesses([]);
    setGuess('');
    setGameOver(false);
    setShowMessage(false);
    const randomIndex = Math.floor(Math.random() * targetWords.length);
    setRandomWord(targetWords[randomIndex]);
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

      {/* Display remaining guesses or the error message */}
      <p className="guesses-remaining">
        {showMessage && message.includes("Invalid") 
          ? message // Show "Invalid word" message
          : `Guesses remaining: ${MAX_GUESSES - guesses.length}`}
      </p>

      {/* Pop-up message for win/lose condition */}
      {showMessage && !message.includes("Invalid") && (
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
    </div>
  );
};

export default App;