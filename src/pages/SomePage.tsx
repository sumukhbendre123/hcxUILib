// src/pages/SomePage.tsx
import React from "react";
import CursorConnect from "../components/CursorConnect/CursorConnect";

const SomePage: React.FC = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <img src="/path/to/logo.png" alt="Logo" className="w-48" />
        <img src="/path/to/banner.png" alt="Banner" className="w-64 mt-4" />
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <CursorConnect description="This is a tooltip description">
          <button className="p-4 bg-blue-500 text-white rounded">
            Hover me!
          </button>
        </CursorConnect>
      </div>
    </div>
  );
};

export default SomePage;
