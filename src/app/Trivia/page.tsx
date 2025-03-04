"use client";
import { useState } from "react";
import triviaQuestions from ".//trivia-questions.json"; // Adjust path as needed
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function TriviaGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const current = triviaQuestions[currentQuestion];
useEffect(() => {
    const shuffledQuestions = triviaQuestions.sort(() => Math.random() - 0.5);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
    setShowResult(false);
}, []);
const options = Object.entries(current)
    .filter(([key]) => key.match(/^[A-D]$/)) // Extracts A, B, C, D choices
    .map(([key, value]) => ({ key, value: value }));

  const handleAnswer = (selectedKey: string) => {
    setSelectedOption(selectedKey);
    if (selectedKey === current.answer) {
      setScore(score + 1);
    }
    setTimeout(() => {
      if (currentQuestion + 1 < triviaQuestions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <Card className="max-w-md w-full p-6 text-center shadow-lg bg-white rounded-xl">
        {showResult ? (
          <CardContent>
            <h2 className="text-2xl font-bold">Game Over!</h2>
            <p className="mt-4 text-lg">Your score: {score} / {triviaQuestions.length}</p>
            <Button className="mt-4" onClick={() => {
              setCurrentQuestion(0);
              setScore(0);
              setShowResult(false);
            }}>
              Play Again
            </Button>
          </CardContent>
        ) : (
          <CardContent>
            <h2 className="text-xl font-semibold">{current.question}</h2>
            <div className="mt-4 space-y-2">
              {options.map(({ key, value }) => (
                <Button
                  key={key}
                  onClick={() => handleAnswer(key)}
                  className={`w-full ${selectedOption === key ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                  disabled={!!selectedOption}
                >
                  {key}: {value}
                </Button>
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
