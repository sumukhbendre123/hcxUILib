import React from "react";
import { useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";

// Interface defining the props for the BackButton component
interface BackButtonProps {
  debounceDelay?: number; // Optional delay for debouncing the back button action
  noHistoryMessage?: string; // Message to show if there's no history
  className?: string; // Optional className for custom styling
}

// Functional component for a back button with optional debounce and history check
const BackButton: React.FC<BackButtonProps> = ({
  debounceDelay = 300, // Default debounce delay is 300ms
  noHistoryMessage = "No previous page available", // Default message when no history
  className = "", // Default className is an empty string
}) => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Handler function to navigate back in history or show a message
  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1); // Navigate back if history exists
    } else {
      alert(noHistoryMessage); // Show alert if no history is available
    }
  };

  // Debounced version of the handleBack function
  const debouncedHandleBack = debounce(handleBack, debounceDelay);

  return (
    <button
      className={`bg-blue-700 border-2 border-[#04AA6D] text-white py-2 px-6 text-xs rounded-md transition-colors duration-400 hover:bg-[#f44336] hover:text-blue-700 ${className}`}
      onClick={debouncedHandleBack} // Attach the debounced handler to the button's onClick event
    >
      Back
    </button>
  );
};

export default BackButton;
