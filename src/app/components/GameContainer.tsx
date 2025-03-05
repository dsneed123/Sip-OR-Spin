import React from "react";

interface GameContainerProps {
  title: string;
  description: string;
  onPass: () => void;
  onFail: () => void;
}

const GameContainer: React.FC<GameContainerProps> = ({
  title,
  description,
  onPass,
  onFail,
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
          style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            fontWeight: 600,
            backgroundColor: "#48bb78",
            color: "#ffffff",
            border: "none",
            borderRadius: "0.5rem",
            cursor: "pointer",
          }}
        >
          Pass
        </button>
        <button
          onClick={onFail}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            fontWeight: 600,
            backgroundColor: "#f56565",
            color: "#ffffff",
            border: "none",
            borderRadius: "0.5rem",
            cursor: "pointer",
          }}
        >
          Fail
        </button>
      </div>
    </div>
  );
};

export default GameContainer;