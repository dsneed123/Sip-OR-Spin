"use client";
import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";

interface SpinnerProps {
  data: { option: string }[];
  onSpin: (result: boolean) => void; // Ensure that 'onSpin' is a function and properly typed
}

const Spinner: React.FC<SpinnerProps> = ({ data, onSpin }) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        onStopSpinning={() => {
          setMustSpin(false);
          const result = Math.random() < 0.5; // 50% chance of pass or gain points
          onSpin(result); // Pass the result to the parent component
        }}
        backgroundColors={["#3e3e3e", "#df3428"]}
        textColors={["#ffffff"]}
      />
      <button
        onClick={handleSpinClick}
        style={{
          marginTop: "20px",
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
    </div>
  );
};

Spinner.displayName = "Spinner";

export default Spinner;
