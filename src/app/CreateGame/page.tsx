"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CryptoJS from "crypto-js";
import { Button, TextField, Slider, Card, Grid, Container, Typography, Alert, Box } from "@mui/material";

const SECRET_KEY = "your-secret-key"; // Use a secure key in production

export default function CreateGame() {
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

    if (validPlayers.length === 0) {
      alert("Please enter at least one player name!");
      return;
    }

    // Encrypt the player names
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(validPlayers), SECRET_KEY).toString();
    
    // Encode the encrypted string to be URL safe
    const encodedData = encodeURIComponent(encryptedData);
    
    router.push(`/Game?data=${encodedData}`);
  };

  return (
    <div className="h-screen bg-black flex items-center justify-center">
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Card sx={{
          p: 4,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(10px)",
          borderRadius: 2
        }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" component="h1" align="center" color="#fff">
              Create New Game
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {/* Player Section */}
            <Grid item xs={12} md={12}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" component="p" color="#ccc">
                  Players (1-10)
                </Typography>
              </Box>

              {Array.from({ length: numPlayers }).map((_, index) => (
                <Grid key={index} container alignItems="center" sx={{ mb: 2 }}>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label={`Player ${index + 1}`}
                      value={playerNames[index]}
                      onChange={(e) => handlePlayerChange(index, e.target.value)}
                      variant="outlined"
                      size="small"
                      sx={{
                        color: "white",
                        "& .MuiOutlinedInput-root": {
                          color: "white",
                          "& fieldset": { borderColor: "#404040" },
                          "&:hover fieldset": { borderColor: "#6c757d" }
                        }
                      }}
                    />
                  </Grid>
                </Grid>
              ))}
            </Grid>

            {/* Game Settings */}
            <Grid item xs={12} md={12}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" component="p" color="#ccc">
                  Number of Rounds
                </Typography>
                <Slider
                  value={rounds}
                  onChange={handleRoundsChange}
                  min={1}
                  max={10}
                  size="small"
                  sx={{
                    color: "#fff",
                    "& .MuiSlider-thumb": { backgroundColor: "#fff" },
                    "& .MuiSlider-track": { backgroundColor: "#404040" }
                  }}
                />
                <Typography variant="body2" component="span" color="#ccc">
                  {rounds} round{rounds !== 1 ? "s" : ""}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" component="p" color="#ccc">
                  Number of Players
                </Typography>
                <Slider
                  value={numPlayers}
                  onChange={handlePlayerSliderChange}
                  min={1}
                  max={10}
                  size="small"
                  sx={{
                    color: "#fff",
                    "& .MuiSlider-thumb": { backgroundColor: "#fff" },
                    "& .MuiSlider-track": { backgroundColor: "#404040" }
                  }}
                />
                <Typography variant="body2" component="span" color="#ccc">
                  {numPlayers} player{numPlayers !== 1 ? "s" : ""}
                </Typography>
              </Box>
            </Grid>

            {/* Start Button */}
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleStartGame}
                disabled={!playerNames.some(name => name.trim() !== "")}
                size="large"
                sx={{
                  mt: 3,
                  backgroundColor: "#007bff",
                  "&:hover": { backgroundColor: "#0056b3" },
                  textTransform: "none",
                  py: 1.5
                }}
              >
                Start Game
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </div>
  );
}