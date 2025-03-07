import React from "react";

interface GameContainerProps {
  title: string;
  description: string;
  onPass: () => void;
  onFail: () => void;
  canPassFail: boolean; // Add canPassFail to the props
}

const GameContainer: React.FC<GameContainerProps> = ({
  title,
  description,
  onPass,
  onFail,
  canPassFail, // Destructure canPassFail from props
}) => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "1rem" }}>
        {title}
      </h1>
      <p style={{ fontSize: "1.125rem", marginBottom: "1.5rem" }}>
        {description}
      </p>
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
        <button
          onClick={onPass}
          disabled={!canPassFail} // Disable Pass button based on canPassFail
          style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            fontWeight: 600,
            backgroundColor: canPassFail ? "#48bb78" : "#a0aec0", // Change color when disabled
            color: "#ffffff",
            border: "none",
            borderRadius: "0.5rem",
            cursor: canPassFail ? "pointer" : "not-allowed", // Change cursor when disabled
          }}
        >
          Pass
        </button>
        <button
          onClick={onFail}
          disabled={!canPassFail} // Disable Fail button based on canPassFail
          style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            fontWeight: 600,
            backgroundColor: canPassFail ? "#f56565" : "#a0aec0", // Change color when disabled
            color: "#ffffff",
            border: "none",
            borderRadius: "0.5rem",
            cursor: canPassFail ? "pointer" : "not-allowed", // Change cursor when disabled
          }}
        >
          Fail
        </button>
      </div>
    </div>
  );
};

export default GameContainer;