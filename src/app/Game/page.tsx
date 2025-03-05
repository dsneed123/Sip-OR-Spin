"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CryptoJS from "crypto-js";
import GameContainer from "../components/GameContainer";
import { Button } from "@mui/material";
import dynamic from "next/dynamic";
// import router from "next/router"; // Remove this line



const Spinner = dynamic(() => import("../components/Spinner"), { ssr: false });
// const router = useRouter(); // Remove this line
const SECRET_KEY = "your-secret-key";

const gameDescriptions: { [key: string]: string } = {
  "Finish the Lyric": "Complete the missing lyrics of a song.",
  "Community Shot": "Everyone adds one ingredient into a shot glass and the player must finish it.",
  "Community Drink": "Everyone adds one ingredient into a glass and the player must finish it.",
  "Shots/Finish Drink": "Take a shot or finish your drink.",
  "Wordle": "A word-based puzzle game.",
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

const Game = () => {

  const router = useRouter();
  const [players, setPlayers] = useState<string[]>([]);
  const [scores, setScores] = useState<{ [key: string]: number }>({});
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [turnResult, setTurnResult] = useState<null | string>(null);
  const [gameTitle, setGameTitle] = useState("Game Title");
  const [gameDescription, setGameDescription] = useState("Game Description");
  const [canSpin, setCanSpin] = useState(true);

  
  useEffect(() => {
    if (players.length === 0) return; // Ensure players are loaded before running this
  
    const storedResult = localStorage.getItem("triviaResult");
    const lastPlayerIndex = localStorage.getItem("lastPlayerIndex");
  
    if (storedResult !== null && lastPlayerIndex !== null) {
      const passed = JSON.parse(storedResult);
      const playerIndex = JSON.parse(lastPlayerIndex);
  
      setCurrentPlayerIndex(playerIndex); // Restore last player's turn
  
      setTimeout(() => {
        setScores((prevScores) => {
          const updatedScores = { ...prevScores };
  
          if (passed) {
            updatedScores[players[playerIndex]] =
              (updatedScores[players[playerIndex]] || 0) + 1;
          }
  
          return updatedScores;
        });
  
        setTurnResult(passed ? "Pass" : "Fail");
        setCanSpin(true);
        nextTurn();
      }, 100);
  
      console.log("Restored trivia result:", storedResult, "for player index:", playerIndex);
      console.log("Current scores:", scores);
      console.log("Current player:", players[playerIndex]);
  
      localStorage.removeItem("triviaResult");
      localStorage.removeItem("lastPlayerIndex");
    }
  }, [players]); // Runs only when players are loaded
  
  
  
  
  const handleSpinResult = (result: boolean, gameOption: string) => {
    console.log("Spin Result:", result, "Game Option:", gameOption);
    const testingMode = true; // Set to true to force Trivia game
    // If testing mode is enabled, force game to always be Trivia
    const finalGameOption = testingMode ? "Trivia" : gameOption;
  
    if (["Trivia", "Password Game", "Wordle"].includes(finalGameOption)) {
      localStorage.setItem("lastPlayerIndex", JSON.stringify(currentPlayerIndex)); // Store the current player's index
      const formattedGameRoute = `/${finalGameOption.replace(/\s+/g, "")}`;
      console.log("Navigating to:", formattedGameRoute);
      router.push(formattedGameRoute); // Navigate to the game page
    }
  };
  
  

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

  const handleFail = () => {
    setTurnResult("Fail");
    setCanSpin(true);
    nextTurn();
  };

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
        onSpin={handleSpinResult} // Make sure it's correctly passed
        players={players}
      />

       
      </div>
    </div>
  );
};

export default Game;
