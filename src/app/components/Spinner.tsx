"use client";
import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";

interface SpinnerProps {
  data: { option: string }[];
  onSpin: (result: boolean, gameOption: string) => void; // Ensure that 'onSpin' is a function and properly typed
  players: string[]; // Add players prop
}

const Spinner: React.FC<SpinnerProps> = ({ data, onSpin, players }) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [scores, setScores] = useState(Array(players.length).fill(0));

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const handleStopSpinning = () => {
    setMustSpin(false);
    const result = Math.random() < 0.5; // 50% chance of pass or gain points
    if (result) {
      // Pass: add one point to the current player's score
      const newScores = [...scores];
      newScores[currentPlayerIndex] += 1;
      setScores(newScores);
    }
    // Move to the next player
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
    onSpin(result, data[prizeNumber].option); // Pass the result and game option to the parent component
  };

  return (
    <div className="flex flex-col items-center  h-screen">
      <button
        onClick={handleSpinClick}
        style={{
          margin: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          transition: "background-color 0.3s ease",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
      >
        SPIN
      </button>
      <div className=" flex items-center justify-center">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          onStopSpinning={handleStopSpinning}
          backgroundColors={["#3e3e3e", "#df3428"]}
          textColors={["#ffffff"]}
        />
      </div>

    </div>
  );
};

Spinner.displayName = "Spinner";

export default Spinner;
