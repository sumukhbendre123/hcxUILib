import React, { useState, useCallback } from "react";

interface CursorConnectProps {
  // Callback function to provide feedback when hovering over an element
  onHoverChange: (elementId: string | null) => void;
  // Optional prop to customize the style of highlighted elements
  highlightStyle?: React.CSSProperties;
}

const CursorConnect: React.FC<CursorConnectProps> = ({
  onHoverChange,
  highlightStyle,
}) => {
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);

  // Callback function to handle mouse entering an element
  const handleMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const elementId = event.currentTarget.getAttribute("data-element-id");
      setHoveredElement(elementId);
      onHoverChange(elementId);
    },
    [onHoverChange]
  );

  // Callback function to handle mouse leaving an element
  const handleMouseLeave = useCallback(() => {
    setHoveredElement(null);
    onHoverChange(null);
  }, [onHoverChange]);

  return (
    <div>
      {/* Sample interactive elements */}
      <div
        data-element-id="option1"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          ...highlightStyle,
          backgroundColor:
            hoveredElement === "option1" ? "lightblue" : "transparent",
        }}
      >
        Option 1
      </div>
      <div
        data-element-id="option2"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          ...highlightStyle,
          backgroundColor:
            hoveredElement === "option2" ? "lightgreen" : "transparent",
        }}
      >
        Option 2
      </div>
      <div
        data-element-id="option3"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          ...highlightStyle,
          backgroundColor:
            hoveredElement === "option3" ? "lightcoral" : "transparent",
        }}
      >
        Option 3
      </div>
    </div>
  );
};

export default CursorConnect;
