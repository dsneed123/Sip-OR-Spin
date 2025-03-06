"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CryptoJS from "crypto-js";
import GameContainer from "../components/GameContainer";
import { Button } from "@mui/material";
import dynamic from "next/dynamic";

// Dynamically import Spinner to disable SSR
const Spinner = dynamic(() => import("../components/Spinner"), { ssr: false });

const SECRET_KEY = "your-secret-key"; // Replace with a secure key in production

// Game descriptions mapped to their titles
const gameDescriptions: { [key: string]: string } = {
  "Finish the Lyric": "Complete the missing lyrics of a song.",
  "Community Shot": "Everyone adds one ingredient into a shot glass and the player must finish it.",
  "Community Drink": "Everyone adds one ingredient into a glass and the player must finish it.",
  "Shots/Finish Drink": "Take a shot or finish your drink.",
  "Wordl": "A word-based puzzle game.",
  "Password Game": "Guess the secret word.",
  "Trivia": "Answer 5 trivia questions correctly and take a shot.",
  "Speed Math": "Solve a quick math problem.",
  "Pong Shot": "Land a pong trick shot within reason, agreed upon by other players.",
  "Spelling Bee": "Spell 5 words correctly while under the influence.",
  "One Leg": "Stand on one foot for 20 seconds. If you close your eyes, everyone else drinks.",
  "Shot or Not": "One shot glass has water, one has liquor. Choose one.",
  "Stand up Comedy": "You must now perform a stand-up comedy act. The others decide if you pass or fail.",
  "Everyone drinks": "Everyone takes a drink.",
};


// Component to handle search params and decrypt data
 main
const SearchParamsWrapper = ({ setPlayers, setScores }: any) => {
  const searchParams = useSearchParams();

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

  return null;
};

// Main Game Component
const Game = () => {
  const router = useRouter();
  const [players, setPlayers] = useState<string[]>([]);
  const [scores, setScores] = useState<{ [key: string]: number }>({});
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [turnResult, setTurnResult] = useState<null | string>(null);
  const [gameTitle, setGameTitle] = useState("Game Title");
  const [gameDescription, setGameDescription] = useState("Game Description");
  const [canSpin, setCanSpin] = useState(true);


  // Decrypt data from URL params on component mount
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

  // Handle pass action
 main
  const handlePass = () => {
    const currentPlayer = players[currentPlayerIndex];
    setScores((prevScores) => ({
      ...prevScores,
      [currentPlayer]: prevScores[currentPlayer] + 1,
    }));
    setTurnResult("Pass");
    setCanSpin(true);
    nextTurn();
  };

  // Handle fail action
  const handleFail = () => {
    setTurnResult("Fail");
    setCanSpin(true);
    nextTurn();
  };


  // Handle spinner result
  const handleSpinResult = (result: boolean, gameOption: string) => {
    if (!canSpin) return;
    console.log("Spin result:", result, gameOption);

    try {
      if (gameOption === "Wordle") {
        router.push("/wordle");
      } else if (gameOption === "Trivia") {
        router.push("/Trivia");
      }
    } catch (error) {
      console.error("Navigation error:", error);
    }

    setGameTitle(gameOption);
    setGameDescription(gameDescriptions[gameOption] || "Game Description");
    setTurnResult(null);
    setCanSpin(false);
  };

  // Move to the next player's turn
 main
  const nextTurn = () => {
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    setCurrentPlayerIndex(nextPlayerIndex);
  };

  return (
    <div
      style={{
        backgroundColor: "#000000",
        color: "#ffffff",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Button
        variant="outlined"
        color="primary"
        onClick={() => router.back()}
        style={{
          position: "fixed",
          top: "1rem",
          left: "1rem",
          zIndex: 10,
        }}
      >
        Back
      </Button>

      <div
        style={{
          position: "fixed",
          top: "1rem",
          right: "1rem",
          backgroundColor: "#2d3748",
          padding: "1rem",
          borderRadius: "0.5rem",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          zIndex: 10,
        }}
      >
        <h3 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "0.5rem" }}>
          Players
        </h3>
        <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
          {players.map((player, index) => (
            <li
              key={index}
              style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}
            >
              {player} - Score: {scores[player] || 0}
            </li>
          ))}
        </ul>
      </div>

      
            {/* Main Content */}
          <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          marginTop: "15em", // Add space at the top to avoid overlap with fixed elements
        }}

      >
        {/* Game Container */}
        <div style={{ textAlign: "center" }}>
          <GameContainer
            title={gameTitle}
            description={gameDescription}
            onPass={handlePass}
            onFail={handleFail}
          />
        </div>

        {/* Current Player */}
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>
            It&apos;s {players[currentPlayerIndex]}&apos;s Turn
          </h2>
          {turnResult && (
            <h3
              style={{
                marginTop: "0.5rem",
                fontSize: "1.125rem",
                color: turnResult === "Pass" ? "#48bb78" : "#f56565",
              }}
            >
              {turnResult}
            </h3>
          )}
        </div>
=======
      />

      
      


      <div style={{ textAlign: "center" }}>
        <Suspense>
          <SearchParamsWrapper setPlayers={setPlayers} setScores={setScores} />
        </Suspense>
      </div>

      <GameContainer
        title={gameTitle}
        description={gameDescription}
        onPass={handlePass}
        onFail={handleFail}
      />

      <div style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>
          It&apos;s {players[currentPlayerIndex]}&apos;s Turn
        </h2>
        {turnResult && (
          <h3
            style={{
              marginTop: "0.5rem",
              fontSize: "1.125rem",
              color: turnResult === "Pass" ? "#48bb78" : "#f56565",
            }}
          >
            {turnResult}
          </h3>
        )}
      </div>


      <div style={{ textAlign: "center" }}>
       
          <Spinner
            data={Object.keys(gameDescriptions).map((option) => ({ option }))}
            onSpin={() => {}}
            players={players}
          />
       
      </div>
    </div>
  );
};

export default Game;
