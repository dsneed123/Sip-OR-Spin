"use client";
import React, { useState } from "react";
import { Button, TextField, Slider, Card } from "@mui/material";

const CreateGame = () => {
  const [numPlayers, setNumPlayers] = useState<number>(5);
  const [playerNames, setPlayerNames] = useState<string[]>(Array(10).fill(""));
  const [rounds, setRounds] = useState<number>(3);

  const handlePlayerChange = (index: number, name: string) => {
    const newPlayerNames = [...playerNames];
    newPlayerNames[index] = name;
    setPlayerNames(newPlayerNames);
  };

  const handlePlayerSliderChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setNumPlayers(newValue as number);
  };

  const handleRoundsChange = (event: Event, newValue: number | number[]) => {
    setRounds(newValue as number);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-950">
      <Card className="p-6 w-full max-w-md bg-gray-900 text-white shadow-lg">
        <div className="flex flex-col gap-6">
          <div>
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

          <div>
            <div>Enter Player Names</div>
            {Array.from({ length: numPlayers }).map((_, index) => (
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
                }}
              />
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

          <Button variant="contained" color="primary">
            Start Game
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CreateGame;
