"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CryptoJS from "crypto-js";
import Spinner from "../components/Spinner";

const SECRET_KEY = "your-secret-key";

const Game = () => {
  const searchParams = useSearchParams();
  const [players, setPlayers] = useState<string[]>([]);
  const [scores, setScores] = useState<{ [key: string]: number }>({});
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [turnResult, setTurnResult] = useState<null | string>(null);
  // const [isSpinning, setIsSpinning] = useState(false);
  const [showPassMessage, setShowPassMessage] = useState(false);

  useEffect(() => {
    const encryptedData = searchParams.get("data");
    if (encryptedData) {
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
    }
  }, [searchParams]);

  const handleSpinResult = (result: boolean) => {
    // setIsSpinning(false);

    const currentPlayer = players[currentPlayerIndex];

    if (result) {
      setScores((prevScores) => ({
        ...prevScores,
        [currentPlayer]: prevScores[currentPlayer] + 1,
      }));
      setTurnResult("You gained points!");
    } else {
      setScores((prevScores) => ({
        ...prevScores,
        [currentPlayer]: prevScores[currentPlayer] + 1, // Awarding a point on pass
      }));
      setTurnResult("Pass");
      setShowPassMessage(true);
      setTimeout(() => setShowPassMessage(false), 1500); // Fade out after 1.5s
    }

    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    setCurrentPlayerIndex(nextPlayerIndex);
  };

  const handleSpin = (result: boolean) => {
    handleSpinResult(result);
  };

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      {/* Player List and Score */}
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

      {/* Turn Info */}
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

      {/* PASS Message */}
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

      {/* Spinner Component */}
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
            { option: "finish the lyric" }, //finish the lyric
            { option: "Community Shot" }, //community each adds ingredients to a shot
            { option: "Community Drink" }, //community each adds ingredients to a drink
            { option: "shots/finish drink" },//shots or finish drink
            { option: "Wordl" }, //wordl
            { option: "Password Game" }, //password game
            { option: "Trivia" }, //must get 5 questions right
            { option: "Speed Math" }, // elementary school style
            { option: "pong shot" }, //pong trick shot. 3 attempts to make. if made everyone else drinks
            { option: "Drunk Spelling Bee" },
            { option: "Stand on one foot 20 seconds." }, //close your eyes and everyone has to drink if you pass
            {option: "Shot or not"} //one water shot one normal shot. 

          ]}
          onSpin={handleSpin}
        />
      </div>
    </div>
  );
};

export default Game;