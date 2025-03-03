"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation"; // Import it normally
import CryptoJS from "crypto-js";

// Dynamically import Spinner component
const Spinner = dynamic(() => import("../components/Spinner"), { ssr: false });

const SECRET_KEY = "your-secret-key";

const Game = () => {
  const searchParams = useSearchParams(); // Use it inside the component
  const [players, setPlayers] = useState<string[]>([]);
  const [scores, setScores] = useState<{ [key: string]: number }>({});
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [turnResult, setTurnResult] = useState<null | string>(null);
  const [showPassMessage, setShowPassMessage] = useState(false);
  const [showSpeedMathPopup, setShowSpeedMathPopup] = useState(false);

  useEffect(() => {
    const encryptedData = searchParams.get("data");
    if (!encryptedData) return;

    try {
      const decodedData = decodeURIComponent(encryptedData);
      const bytes = CryptoJS.AES.decrypt(decodedData, SECRET_KEY);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      setPlayers(decryptedData);
      const initialScores = decryptedData.reduce((acc: { [key: string]: number }, player: string) => {
        acc[player] = 0;
        return acc;
      }, {});
      setScores(initialScores);
    } catch (error) {
      console.error("Error decrypting data:", error);
    }
  }, [searchParams]); // No need for isClient check

  // const handleSpinResult = (result: boolean) => {
  //   const currentPlayer = players[currentPlayerIndex];

  //   if (result) {
  //     setScores((prevScores) => ({
  //       ...prevScores,
  //       [currentPlayer]: prevScores[currentPlayer] + 1,
  //     }));
  //     setTurnResult("You gained points!");
  //   } else {
  //     setScores((prevScores) => ({
  //       ...prevScores,
  //       [currentPlayer]: prevScores[currentPlayer] + 1,
  //     }));
  //     setTurnResult("Pass");
  //     setShowPassMessage(true);
  //     setTimeout(() => setShowPassMessage(false), 1500);
  //   }

  //   const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
  //   setCurrentPlayerIndex(nextPlayerIndex);
  // };

  const handleSpinResult = (selectedOption: string) => {
    const currentPlayer = players[currentPlayerIndex];

    if(selectedOption === "Speed Mmath") {
      setShowSpeedMathPopup(true);
    }

    setScores((prevScores) => ({
      ...prevScores,
      [currentPlayer]: prevScores[currentPlayer] + 1,
    }));

    setTurnResult(selectedOption);

    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    setCurrentPlayerIndex(nextPlayerIndex);
  }
  const handleSpin = (result: string) => {
    handleSpinResult(result);
  };

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "5px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3 style={{ color: "black" }}>Players</h3>
        <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
          {players.map((player, index) => (
            <li key={index} style={{ marginBottom: "10px", fontWeight: "bold", color: "black" }}>
              {player} - Score: {scores[player] || 0}
            </li>
          ))}
        </ul>
      </div>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <h2>It&apos;s {players[currentPlayerIndex]}&apos;s Turn</h2>
        {turnResult && (
          <h3 style={{ color: turnResult === "Pass" ? "red" : "green" }}>
            {turnResult}
          </h3>
        )}
      </div>

      {showPassMessage && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "80px",
            fontWeight: "bold",
            color: "green",
            opacity: showPassMessage ? 1 : 0,
            transition: "opacity 1s ease-out",
          }}
        >
          PASS
        </div>
      )}

      {showSpeedMathPopup && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000, // Ensures it stays on top
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <h2>Speed Math Challenge!</h2>
              <p>Get ready for a fast-paced math question!</p>
              <button
                onClick={() => setShowSpeedMathPopup(false)}
                style={{
                  marginTop: "10px",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  border: "none",
                  backgroundColor: "#caa15d",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Spinner
          data={[
            { option: "finish the lyric" },
            { option: "Community Shot" },
            { option: "Community Drink" },
            { option: "shots/finish drink" },
            { option: "Wordl" },
            { option: "Password Game" },
            { option: "Trivia" },
            { option: "Speed Math" },
            { option: "pong shot" },
            { option: "Drunk Spelling Bee" },
            { option: "Stand on one foot 20 seconds." },
            { option: "Shot or not" },
          ]}
          onSpin={handleSpin}
        />
      </div>
    </div>
  );

  
};



export default Game;
