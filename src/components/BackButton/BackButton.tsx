import React from "react";
import { useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";

interface BackButtonProps {
  debounceDelay?: number;
  noHistoryMessage?: string;
  className?: string; // Add className prop
}

const BackButton: React.FC<BackButtonProps> = ({
  debounceDelay = 300,
  noHistoryMessage = "No previous page available",
  className = "", // Default to an empty string if not provided
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      alert(noHistoryMessage);
    }
  };

  const debouncedHandleBack = debounce(handleBack, debounceDelay);

  return (
    <button
      className={className} // Apply className prop
      onClick={debouncedHandleBack}
    >
      Back
    </button>
  );
};

export default BackButton;
