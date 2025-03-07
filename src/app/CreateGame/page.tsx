"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CryptoJS from "crypto-js";
import { Button, TextField, Card, Grid, Container, Typography, Box, Slider, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"; // Import delete icon

const SECRET_KEY = "your-secret-key"; // Use a secure key in production
const MAX_PLAYERS = 10; // Maximum number of players

export default function CreateGame() {
  const router = useRouter();
  const [playerNames, setPlayerNames] = useState<string[]>([""]); // Start with one empty input
  const [rounds, setRounds] = useState<number>(3);

  const handlePlayerChange = (index: number, name: string) => {
    const newPlayerNames = [...playerNames];
    newPlayerNames[index] = name;
    setPlayerNames(newPlayerNames);

    // Add a new empty input if the last input is filled and the max limit is not reached
    if (index === playerNames.length - 1 && name.trim() !== "" && playerNames.length < MAX_PLAYERS) {
      setPlayerNames([...newPlayerNames, ""]);
    }

    // Remove empty input boxes (except the last one) when an input is cleared
    if (name.trim() === "" && index !== playerNames.length - 1) {
      const filteredPlayerNames = newPlayerNames.filter(
        (name, i) => name.trim() !== "" || i === newPlayerNames.length - 1
      );
      setPlayerNames(filteredPlayerNames);
    }
  };

  const handleRemovePlayer = (index: number) => {
    const newPlayerNames = playerNames.filter((_, i) => i !== index);
    setPlayerNames(newPlayerNames);
  };

  const handleRoundsChange = (event: Event, newValue: number | number[]) => {
    setRounds(newValue as number);
  };

  const handleStartGame = () => {
    const validPlayers = playerNames.filter((name) => name.trim() !== "");

    if (validPlayers.length === 0) {
      alert("Please enter at least one player name!");
      return;
    }

    // Encrypt the player names
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(validPlayers), SECRET_KEY).toString();

    // Encode the encrypted string to be URL safe
    const encodedData = encodeURIComponent(encryptedData);

    // Navigate to the game page
    router.push(`/Game?data=${encodedData}`);
  };

  return (
    <div className="h-screen bg-black flex items-center justify-center overflow-hidden">
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Card
          sx={{
            p: 4,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(10px)",
            borderRadius: 2,
            maxHeight: "90vh", // Limit height to prevent scrolling
            overflowY: "auto", // Add scrollbar if content overflows
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" component="h1" align="center" color="#fff">
              Create New Game
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {/* Player Section */}
            <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" component="p" color="#ccc">
                  Players (Max {MAX_PLAYERS})
                </Typography>
              </Box>

              {playerNames.map((name, index) => (
                <Grid key={index} container alignItems="center" sx={{ mb: 2 }}>
                  <Grid item xs={10}>
                    <TextField
                      fullWidth
                      label={`Player ${index + 1}`}
                      value={name}
                      onChange={(e) => handlePlayerChange(index, e.target.value)}
                      variant="outlined"
                      size="small"
                      sx={{
                        color: "white",
                        "& .MuiOutlinedInput-root": {
                          color: "white",
                          "& fieldset": { borderColor: "#404040" },
                          "&:hover fieldset": { borderColor: "#6c757d" },
                        },
                      }}
                    />
                  </Grid>
                  {index !== playerNames.length - 1 && (
                    <Grid item xs={2}>
                      <IconButton onClick={() => handleRemovePlayer(index)}>
                        <DeleteIcon sx={{ color: "#ff4444" }} />
                      </IconButton>
                    </Grid>
                  )}
                </Grid>
              ))}
            </Grid>

            {/* Game Settings */}
            <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" component="p" color="#ccc">
                  Number of Rounds
                </Typography>
                <Box sx={{ width: "100%", maxWidth: "400px", mx: "auto" }}> {/* Adjusted slider width */}
                  <Slider
                    value={rounds}
                    onChange={handleRoundsChange}
                    min={1}
                    max={10}
                    size="small"
                    sx={{
                      color: "#fff",
                      "& .MuiSlider-thumb": { backgroundColor: "#fff" },
                      "& .MuiSlider-track": { backgroundColor: "#404040" },
                    }}
                  />
                </Box>
                <Typography variant="body2" component="span" color="#ccc" align="center" display="block">
                  {rounds} round{rounds !== 1 ? "s" : ""}
                </Typography>
              </Box>
            </Grid>

            {/* Start Button */}
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleStartGame}
                disabled={!playerNames.some((name) => name.trim() !== "")}
                size="large"
                sx={{
                  mt: 3,
                  backgroundColor: "#007bff",
                  "&:hover": { backgroundColor: "#0056b3" },
                  textTransform: "none",
                  py: 1.5,
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