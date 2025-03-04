"use client";
import React, { useState } from "react";

const PasswordGame: React.FC = () => {
    const [input, setInput] = useState("");
    const [message, setMessage] = useState("");

    // Add validation functions for each rule
    const validatePassword = (password: string) => {
        // Rule 1: Password must be at least five characters
        if (password.length < 5) {
            return "Password must be at least five characters.";
        }

        // Rule 2: Password must include a number
        if (!/\d/.test(password)) {
            return "Password must include a number.";
        }

        // Rule 3: Password must include an uppercase letter
        if (!/[A-Z]/.test(password)) {
            return "Password must include an uppercase letter.";
        }

        // Rule 4: Password must include a special character
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return "Password must include a special character.";
        }

        // Add additional rules here...

        // If all rules are passed
        return "✅ Correct Password!";
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationMessage = validatePassword(input);
        setMessage(validationMessage);
        setInput("");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm text-center">
                <h1 className="text-2xl font-bold mb-4">Password Game</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="password"
                        value={input}
                        onChange={handleChange}
                        placeholder="Enter password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Submit
                    </button>
                </form>
                {message && <p className="mt-4 text-lg font-semibold">{message}</p>}
            </div>
        </div>
    );
};

export default PasswordGame;
