"use client";

import React, { useEffect, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import CryptoJS from "crypto-js";

// Dynamically import Spinner component
const Spinner = dynamic(() => import("../components/Spinner"), { ssr: false });

const SECRET_KEY = "your-secret-key";

const GameContent = () => {
  const searchParams = useSearchParams();
  const [players, setPlayers] = useState<string[]>([]);
  const [scores, setScores] = useState<{ [key: string]: number }>({});
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [turnResult, setTurnResult] = useState<null | string>(null);
  const [showPassMessage, setShowPassMessage] = useState(false);

  useEffect(() => {
    const encryptedData = searchParams.get("data");
    if (!encryptedData) return;

    try {
      const decodedData = decodeURIComponent(encryptedData);
      const bytes = CryptoJS.AES.decrypt(decodedData, SECRET_KEY);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      setPlayers(decryptedData);
      const initialScores = decryptedData.reduce(
        (acc: { [key: string]: number }, player: string) => {
          acc[player] = 0;
          return acc;
        },
        {}
      );
      setScores(initialScores);
    } catch (error) {
      console.error("Error decrypting data:", error);
    }
  }, [searchParams]);

  const handleSpinResult = (result: boolean) => {
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
        [currentPlayer]: prevScores[currentPlayer] + 1,
      }));
      setTurnResult("Pass");
      setShowPassMessage(true);
      setTimeout(() => setShowPassMessage(false), 1500);
    }

    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    setCurrentPlayerIndex(nextPlayerIndex);
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
          onSpin={handleSpinResult}
        />
      </div>
    </div>
  );
};

const Game = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GameContent />
    </Suspense>
  );
};

export default Game;
