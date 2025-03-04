"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CryptoJS from "crypto-js";
import { Button, TextField, Slider, Card } from "@mui/material";

const SECRET_KEY = "your-secret-key"; // Use a secure key

const CreateGame = () => {
  const router = useRouter();
  const [numPlayers, setNumPlayers] = useState<number>(5);
  const [playerNames, setPlayerNames] = useState<string[]>(Array(10).fill(""));
  const [rounds, setRounds] = useState<number>(3);

  const handlePlayerChange = (index: number, name: string) => {
    const newPlayerNames = [...playerNames];
    newPlayerNames[index] = name;
    setPlayerNames(newPlayerNames);
  };

  const handlePlayerSliderChange = (_event: Event, newValue: number | number[]) => {
    setNumPlayers(newValue as number);
  };

  const handleRoundsChange = (_event: Event, newValue: number | number[]) => {
    setRounds(newValue as number);
  };

  const handleStartGame = () => {
    const validPlayers = playerNames.slice(0, numPlayers).filter(name => name.trim() !== "");

    // Encrypt the player names
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(validPlayers), SECRET_KEY).toString();

    // Encode the encrypted string to be URL safe
    const encodedData = encodeURIComponent(encryptedData);

    router.push(`/Game?data=${encodedData}`);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <Button variant="outlined" color="primary" onClick={() => router.back()} style={{ position: 'absolute', top: '16px', left: '16px' }}>
        Back
      </Button>
      <Card className="p-0 w-full max-w-md bg-black text-white " style={{ border: 0 }}>
        <div className="flex flex-col gap-6 bg-black p-10 text-white">
          <div className="bg-black p-4 rounded-lg">
            <div>Number of Players: {numPlayers}</div>
            <Slider
              getAriaLabel={() => "Number of Players"}
              value={numPlayers}
              onChange={handlePlayerSliderChange}
              valueLabelDisplay="auto"
              min={1}
              max={10}
              disableSwap
            />
          </div>

          <div className="bg-black text-white  p-4 rounded-lg">
            <div>Enter Player Names</div>
            {Array.from({ length: numPlayers }).map((_, index) => (
              <div className="mt-3">
                <TextField
                key={index}
                label={`Player ${index + 1}`}
                value={playerNames[index]}
                onChange={(e) => handlePlayerChange(index, e.target.value)}
                fullWidth
                variant="outlined"
                InputLabelProps={{ className: "text-gray-300" }}
                InputProps={{
                  className: "text-white",
                  style: { borderColor: "#fff" },
                  classes: {
                  notchedOutline: "border-gray-600",
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "gray",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                  },
                  "& .MuiInputBase-input": {
                  color: "white",
                  },
                  "& .MuiFormLabel-root": {
                  color: "gray",
                  },
                  "& .MuiFormLabel-root.Mui-focused": {
                  color: "white",
                  },
                }}
                />
                </div>
              ))}
  
            </div>

          <div>
            <div>Number of Rounds: {rounds}</div>
            <Slider
              getAriaLabel={() => "Number of Rounds"}
              value={rounds}
              onChange={handleRoundsChange}
              valueLabelDisplay="auto"
              min={1}
              max={10}
              disableSwap
            />
          </div>

          <Button variant="contained" color="primary" onClick={handleStartGame}>
            Start Game
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CreateGame;
