// SearchPatientBar.tsx
import React from "react";

// Props interface for the SearchPatientBar component
interface SearchPatientBarProps {
  className?: string; // Optional additional CSS classes for the component
  onSearch: (mobile: string) => void; // Callback function to perform search with mobile number
  onMobileNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Callback function for input changes
  mobileNumber: string; // Current value of the mobile number input
  isValid: boolean; // Boolean indicating if the input is valid
  loading: boolean; // Boolean indicating if a search is in progress
}

const SearchPatientBar: React.FC<SearchPatientBarProps> = ({
  className,
  onSearch,
  onMobileNumberChange,
  mobileNumber,
  isValid,
  loading,
}) => {
  // Handler for the search button click event
  const handleSearchClick = () => {
    if (isValid) {
      onSearch(mobileNumber); // Perform search if input is valid
    }
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Heading for the search bar */}
      <h2 className="text-xl font-bold mb-4">Search Beneficiary:</h2>
      <div className="flex w-full max-w-lg">
        {/* Mobile number input field */}
        <input
          type="text"
          value={mobileNumber}
          onChange={onMobileNumberChange} // Update mobile number state on change
          placeholder="Enter mobile number"
          className="flex-1 p-2 border border-gray-300 rounded-l-md"
        />
        {/* Search button */}
        <button
          onClick={handleSearchClick} // Trigger search on click
          className={`bg-blue-500 text-white border border-blue-500 rounded-r-md p-2 ml-2 flex-shrink-0 ${
            !isValid ? "bg-red-500 border-red-500" : "" // Red styling if input is invalid
          } ${
            loading ? "bg-blue-700 cursor-not-allowed" : "hover:bg-blue-600" // Change button styling based on loading state
          } `}
          disabled={loading || !isValid} // Disable button if loading or input is invalid
        >
          {loading ? "Searching..." : "Search"}{" "}
          {/* Display different text based on loading state */}
        </button>
      </div>
    </div>
  );
};

export default SearchPatientBar;
