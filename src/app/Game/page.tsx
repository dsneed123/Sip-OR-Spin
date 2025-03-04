"use client";

import React, { useEffect, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { useSearchParams, useRouter } from "next/navigation";
import CryptoJS from "crypto-js";
import GameContainer from "../components/GameContainer";
import { Button } from "@mui/material";
// Dynamically import Spinner component
const Spinner = dynamic(() => import("../components/Spinner"), { ssr: false });

const SECRET_KEY = "your-secret-key";

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

const GameContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [players, setPlayers] = useState<string[]>([]);
  const [scores, setScores] = useState<{ [key: string]: number }>({});
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [turnResult, setTurnResult] = useState<null | string>(null);
  const [gameTitle, setGameTitle] = useState("Game Title");
  const [gameDescription, setGameDescription] = useState("Game Description");
  const [canSpin, setCanSpin] = useState(true);

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

  const handleSpinResult = (result: boolean, gameOption: string) => {
    if (!canSpin) return;
    setGameTitle(gameOption);
    setGameDescription(gameDescriptions[gameOption] || "Game Description");
    setTurnResult(null);
    setCanSpin(false);
  };

  const nextTurn = () => {
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    setCurrentPlayerIndex(nextPlayerIndex);
  };

  return (
    <div className="bg-black text-white" style={{ position: "relative", height: "100vh" }}>
      <Button variant="outlined" color="primary" onClick={() => router.back()} style={{ position: 'absolute', top: '16px', left: '16px' }}>
        Back
      </Button>
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          backgroundColor: "#333",
          padding: "10px",
          borderRadius: "5px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
        }}
      >
        <h3 style={{ color: "white" }}>Players</h3>
        <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
          {players.map((player, index) => (
            <li key={index} style={{ marginBottom: "10px", fontWeight: "bold", color: "white" }}>
              {player} - Score: {scores[player] || 0}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ textAlign: "center" }}>

      <div style={{ textAlign: "center"}}>
        <GameContainer title={gameTitle} description={gameDescription} onPass={handlePass} onFail={handleFail} />
      </div>
      <div className="text-center mt-4">
        <h2 className="text-xl font-bold">It&apos;s {players[currentPlayerIndex]}&apos;s Turn</h2>
        {turnResult && (
          <h3 className={`mt-2 ${turnResult === "Pass" ? "text-green-500" : "text-red-500"}`}>
        {turnResult}
          </h3>
        )}
      </div>
      
      <div style={{ textAlign: "center" }}>
        <Spinner
          data={Object.keys(gameDescriptions).map((option) => ({ option }))}
          onSpin={handleSpinResult}
          players={players}
         
        />
      </div>
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
