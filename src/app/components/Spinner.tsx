"use client";
import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";

interface SpinnerProps {
  data: { option: string }[];
  onSpin: (result: boolean, gameOption: string) => void;
  players: string[];
  disabled?: boolean; // Add the disabled prop
}

const Spinner: React.FC<SpinnerProps> = ({ data, onSpin, players, disabled }) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [scores, setScores] = useState(Array(players.length).fill(0));

  const handleSpinClick = () => {
    if (!mustSpin && !disabled) { // Check if disabled
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  const handleStopSpinning = () => {
    setMustSpin(false);
    const result = Math.random() < 0.5; // 50% chance of pass or fail
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
    <div className="flex flex-col items-center justify-start h-screen bg-black p-4 overflow-hidden">
      {/* Spin Button */}
      <button
        onClick={handleSpinClick}
        disabled={mustSpin || disabled} // Disable if spinning or disabled prop is true
        className={`px-8 py-3 text-lg font-semibold text-white rounded-lg shadow-lg transition-colors duration-300 mb-4 ${
          mustSpin || disabled
            ? "bg-gray-500 cursor-not-allowed" // Disabled state
            : "bg-blue-600 hover:bg-blue-700" // Enabled state
        }`}
      >
        {mustSpin ? "Spinning..." : "SPIN"}
      </button>

      {/* Wheel Container */}
      <div className="w-full max-w-md flex justify-center" style={{ height: "60vh" }}>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          onStopSpinning={handleStopSpinning}
          backgroundColors={["#3e3e3e", "#df3428"]}
          textColors={["#ffffff"]}
          outerBorderColor="#333"
          outerBorderWidth={10}
          radiusLineColor="#555"
          radiusLineWidth={2}
          fontSize={14} // Reduced font size
          textDistance={60} // Adjusted text distance
          spinDuration={0.5}
          perpendicularText={false} // Ensure text remains horizontal
        />
      </div>
    </div>
  );
};

Spinner.displayName = "Spinner";

export default Spinner;