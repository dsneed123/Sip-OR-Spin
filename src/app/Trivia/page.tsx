"use client";
import { useState, useEffect } from "react";
import triviaQuestions from "./trivia-questions.json"; // Adjust path as needed
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Confetti from "react-confetti";
import { Progress } from "@/components/ui/progress";


const TOTAL_ROUNDS = 5;
const TIMER_MAX = 100;

export default function TriviaGame() {
  const [shuffledQuestions, setShuffledQuestions] = useState<{ question: string; A: string; B: string; C: string; D: string; answer: string; }[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [timer, setTimer] = useState(TIMER_MAX);

  useEffect(() => {
    setShuffledQuestions([...triviaQuestions].sort(() => Math.random() - 0.5));
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
    setShowResult(false);
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 2), 100);
      return () => clearInterval(interval);
    } else {
      // Timer reached zero, move to the next question
      setTimeout(() => {
        if (currentQuestion + 1 < TOTAL_ROUNDS) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedOption(null);
          setTimer(TIMER_MAX);
        } else {
          setShowResult(true);
        }
      }, 1000);
    }
  }, [timer]);
  const current = shuffledQuestions[currentQuestion];
  const options = current
    ? Object.entries(current)
        .filter(([key]) => key.match(/^[A-D]$/))
        .map(([key, value]) => ({ key, value: value }))
    : [];

  const handleAnswer = (selectedKey: string) => {
    setSelectedOption(selectedKey);
    if (selectedKey === current.answer) {
      setScore(score + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1000);
    }
    setTimeout(() => {
      if (currentQuestion + 1 < TOTAL_ROUNDS) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setTimer(TIMER_MAX);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
    <h1 className="text-6xl font-bold mb-[10%] text-purple-700" style={{ transform: "rotate(-5deg)", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}>
      Drunk Trivia
    </h1>
      {showConfetti && <Confetti />}
      <div className="w-full max-w-md mb-4">
        <Progress value={timer} max={TIMER_MAX} className="w-full" />
      </div>
      <Card className="max-w-md w-full p-6 text-center shadow-lg bg-white rounded-xl">
        {showResult ? (
          <CardContent>
            <h2 className="text-2xl font-bold">Game Over!</h2>
            <p className="mt-4 text-lg">Your score: {score} / {TOTAL_ROUNDS}</p>
            <Button className="mt-4" onClick={() => {
              setCurrentQuestion(0);
              setScore(0);
              setShowResult(false);
              setTimer(TIMER_MAX);
            }}>
              Play Again
            </Button>
          </CardContent>
        ) : (
            <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold">{current?.question}</h2>
            <CardContent>
            
                <div className="mt-4 grid grid-cols-2 gap-4">
                {options.map(({ key, value }) => (
                    <Button
                    key={key}
                    onClick={() => handleAnswer(key)}
                    className={`h-24 text-sm ${selectedOption === key ? "bg-blue-500 text-white" : "bg-gray-200"} ${key === 'A' ? 'bg-red-400' : key === 'B' ? 'bg-green-400' : key === 'C' ? 'bg-yellow-400' : 'bg-purple-400'}`}
                    disabled={!!selectedOption}
                    style={{ whiteSpace: "normal", wordWrap: "break-word" }}
                    >
                     {value}
                    </Button>
                ))}
                </div>
            </CardContent>
          </div>
        )}
      </Card>
    </div>
  );
}