import React from 'react';

interface GameContainerProps {
    title: string;
    description: string;
    onPass: () => void;
    onFail: () => void;
}

const GameContainer: React.FC<GameContainerProps> = ({ title, description, onPass, onFail }) => {
    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md mt-0">
            <h1 className="text-2xl font-bold mb-4">{title}</h1>
            <p className="mb-4">{description}</p>
            <button onClick={onPass} className="px-4 py-2 bg-blue-500 text-white rounded mr-2 hover:bg-blue-700">
                Pass
            </button>
            <button onClick={onFail} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">
                Fail
            </button>
        </div>
    );
};

export default GameContainer;
