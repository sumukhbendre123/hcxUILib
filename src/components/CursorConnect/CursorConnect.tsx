import React, { useState, ReactNode, MouseEvent } from "react";

interface CursorConnectProps {
  description: string; // Tooltip description text
  children: ReactNode; // Children elements to wrap and attach the tooltip
  className?: string; // Optional className prop to style the button
}

const CursorConnect: React.FC<CursorConnectProps> = ({
  description, // Tooltip description
  children, // Wrapped elements
  className = "", // Default to an empty string if not provided
}) => {
  const [showTooltip, setShowTooltip] = useState(false); // State to control tooltip visibility
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 }); // State to store tooltip position

  // Handler to show the tooltip when mouse enters the wrapped element
  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  // Handler to update tooltip position based on mouse movement
  const handleMouseMove = (e: MouseEvent) => {
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };

  // Handler to hide the tooltip when mouse leaves the wrapped element
  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter} // Show tooltip on mouse enter
      onMouseMove={handleMouseMove} // Update tooltip position on mouse move
      onMouseLeave={handleMouseLeave} // Hide tooltip on mouse leave
      style={{ position: "relative", display: "inline-block" }} // Positioning context for the tooltip
    >
      <button
        className={`bg-blue-700 border-2 border-[#04AA6D] text-white cursor-pointer py-2 px-6 text-xs rounded-md transition-colors duration-400 hover:bg-[#f44336] hover:text-white ${className}`} // Apply Tailwind CSS classes
        onClick={() => setShowTooltip(!showTooltip)} // Toggle tooltip visibility on button click
      >
        {/* Button content */}
        {children}
      </button>
      {showTooltip && (
        <div
          style={{
            position: "fixed", // Fixed positioning to avoid issues with overflow and scrolling
            top: tooltipPosition.y + 10, // Offset tooltip position slightly from cursor
            left: tooltipPosition.x + 10, // Offset tooltip position slightly from cursor
            backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark background for tooltip
            padding: "5px 10px", // Padding around tooltip text
            borderRadius: "4px", // Rounded corners for the tooltip
            whiteSpace: "nowrap", // Prevent text wrapping
            pointerEvents: "none", // Prevent tooltip from interfering with mouse events
            zIndex: 1000, // High z-index to ensure the tooltip appears above other elements
            transform: "translate(-50%, -50%)", // Center the tooltip around the mouse pointer
          }}
        >
          {description} {/* Display the tooltip description */}
        </div>
      )}
    </div>
  );
};

export default CursorConnect;
