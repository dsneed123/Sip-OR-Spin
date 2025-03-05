"use client";
import React, { useState, useRef } from "react";
import '@react95/icons/icons.css';
import { Button } from '@react95/core';
import { Logo } from '@react95/icons';
import { FileText } from "@react95/icons";

const PasswordGame: React.FC = () => {
    const [input, setInput] = useState("");
    const [message, setMessage] = useState("");
    const [history, setHistory] = useState<string[]>([]);
    const historyRef = useRef<HTMLDivElement | null>(null);

    // Add validation functions for each rule
    const validatePassword = (password: string) => {
        if (password === "help") {
            return "Hackers have encrypted your system files. Your goal is to find the key to decrypt your files \n In the terminal type potential passwords to try and guess it and press enter \nEnter the correct password to decrypt them.";
        }
        if (password === "clear") {
            setHistory([]);
            setMessage("");
            return "";
        }
        if (password === "ls") {
            return "kali.txt";
        }
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

        // Add input to history
        setHistory((prevHistory) => [...prevHistory, `C:\\Windows\\Users&gt; ${input}\n${validationMessage}`]);

        setInput(""); // Clear input field
    };

    // Scroll to the bottom of history container after new entry
    React.useEffect(() => {
        if (historyRef.current) {
            historyRef.current.scrollTop = historyRef.current.scrollHeight;
        }
    }, [history]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#008080] text-white p-4 font-mono">
            {/* Windows 95 File Icon */}
            <div className="absolute top-0 left-0 flex items-center space-x-2 m-4">
                <div className="flex flex-col items-start">
                    <FileText variant="32x32_4" />
                    <p className="text-sm text-black font-bold">kali.txt</p>
                </div>
            </div>

            {/* Command Prompt Window */}
            <div className="bg-black border h-80 border-gray-600 shadow-lg w-full max-w-lg relative">
                
                {/* Title Bar */}
                <div className="bg-[#0001fd] h-6 flex items-center justify-between px-2 border-b border-gray-600">
                    <p className="text-xs text-white">Command Prompt</p>
                    <div className="flex space-x-1">
                        {/* Windows 95-style buttons */}
                        <div className="w-3 h-3 bg-gray-300 border-t-2 border-white flex items-center justify-center leading-none translate-y-[-1px] hover:bg-gray-400 cursor-pointer">
                            <span className="text-xs mb-2 text-black">_</span>
                        </div>
                        <div className="w-3 h-3 bg-gray-300 border-t-2 border-white flex items-center justify-center leading-none translate-y-[-1px] hover:bg-gray-400 cursor-pointer">
                            <span className="text-xs mb-1 text-black">□</span>
                        </div>
                        <div className="w-3 h-3 bg-gray-300 border-t-2 border-white flex items-center justify-center leading-none translate-y-[-1px] hover:bg-gray-400 cursor-pointer">
                            <span className="text-xs mb-1 text-black">×</span>
                        </div>
                    </div>
                </div>

                {/* Command Prompt Content */}
                <div className="p-4">
                    <p className="text-xs">Microsoft(R) Windows 95</p>
                    <p className="text-xs">(C)Copyright Microsoft Corp 1981-1995</p>
                    <p className="text-xs">Type Help to begin</p>

                    {/* Command History */}
                    <div
                        ref={historyRef}
                        className="max-h-60 overflow-y-auto text-xs text-white font-mono"
                    >
                        {history.map((entry, index) => (
                            <pre key={index} className="whitespace-pre-wrap">{entry}</pre>
                        ))}
                    </div>

                    {/* Command Input */}
                    <form onSubmit={handleSubmit} className="flex items-center space-x-2 mt-2">
                        <span className="text-xs text-white">C:\Windows\Users\;</span>
                        <input
                            type="text"
                            value={input}
                            onChange={handleChange}
                            className="w-full bg-black border-none text-white focus:outline-none font-mono text-xs px-2"
                            autoFocus
                        />
                    </form>

                
                </div>
            </div>

            {/* Windows 95 Taskbar */}
            <div className="fixed bottom-0 left-0 w-full h-10 bg-[#C0C0C0] border-t border-gray-500 flex items-center p-2">
                <div style={{ display: 'flex', alignItems: 'center', padding: '2px', backgroundColor: '#C0C0C0', borderTop: '1px solid #808080' }}>
                    <Button style={{ display: 'flex', alignItems: 'center', padding: '2px 8px', backgroundColor: '#C0C0C0', border: '1px solid #808080', boxShadow: 'inset 1px 1px #fff, inset -1px -1px #000', fontSize: '12px' }}>
                        <Logo variant="32x32_4" style={{ marginRight: 4 }} />
                        Start
                    </Button>
                </div>
            </div>
        </div>
    );
}
export default PasswordGame;
