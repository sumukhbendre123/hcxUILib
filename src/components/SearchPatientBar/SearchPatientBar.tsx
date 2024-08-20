import React from "react";

interface SearchPatientBarProps {
  className?: string;
  onSearch: (mobile: string) => void;
  onMobileNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  mobileNumber: string;
  isValid: boolean;
  loading: boolean;
}

const SearchPatientBar: React.FC<SearchPatientBarProps> = ({
  className,
  onSearch,
  onMobileNumberChange,
  mobileNumber,
  isValid,
  loading,
}) => {
  const handleSearchClick = () => {
    if (isValid) {
      onSearch(mobileNumber);
    }
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <h2 className="text-xl font-bold mb-4">Search Beneficiary:</h2>
      <div className="flex w-full max-w-lg">
        <input
          type="text"
          value={mobileNumber}
          onChange={onMobileNumberChange}
          placeholder="Enter mobile number"
          className="flex-1 p-2 border border-gray-300 rounded-l-md"
        />
        <button
          onClick={handleSearchClick}
          className={`bg-blue-500 text-white border border-blue-500 rounded-r-md p-2 ml-2 flex-shrink-0 ${
            !isValid ? "bg-red-500 border-red-500" : ""
          } ${
            loading ? "bg-blue-700 cursor-not-allowed" : "hover:bg-blue-600"
          } `}
          disabled={loading || !isValid}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
    </div>
  );
};

export default SearchPatientBar;
