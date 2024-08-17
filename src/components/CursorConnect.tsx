import React, { useState, ReactNode, MouseEvent } from "react";

interface CursorConnectProps {
  description: string;
  children: ReactNode;
}

const CursorConnect: React.FC<CursorConnectProps> = ({
  description,
  children,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ position: "relative", display: "inline-block" }}
    >
      {children}
      {showTooltip && (
        <div
          style={{
            position: "fixed", // Use fixed positioning to avoid issues with overflow
            top: tooltipPosition.y + 10,
            left: tooltipPosition.x + 10,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "#fff",
            padding: "5px 10px",
            borderRadius: "4px",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            zIndex: 1000,
            transform: "translate(-50%, -50%)", // Center the tooltip around the mouse pointer
          }}
        >
          {description}
        </div>
      )}
    </div>
  );
};

export default CursorConnect;
