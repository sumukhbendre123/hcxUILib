// src/pages/SomePage.tsx
import React from "react";
import CursorConnect from "../components/CursorConnect";

const SomePage: React.FC = () => {
  const handleHoverChange = (elementId: string | null) => {
    console.log("Hovered element:", elementId);
    // Handle feedback logic here, such as showing tooltips or other UI updates
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <img src="/path/to/logo.png" alt="Logo" className="w-48" />
        <img src="/path/to/banner.png" alt="Banner" className="w-64 mt-4" />
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <CursorConnect
          onHoverChange={handleHoverChange}
          highlightStyle={{ padding: "10px", borderRadius: "4px" }}
        />
      </div>
    </div>
  );
};

export default SomePage;
