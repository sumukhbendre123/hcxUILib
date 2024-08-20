// src/pages/SearchPatient.tsx

import React, { useState } from "react";
import SearchPatientBar from "../components/SearchPatientBar/SearchPatientBar";

const SearchPatient: React.FC = () => {
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const data = [
    { mobile: "1234567890", name: "John Doe" },
    { mobile: "0987654321", name: "Jane Smith" },
  ];

  const handleSearch = (mobile: string) => {
    setLoading(true);
    setTimeout(() => {
      const results = data.filter((item) => item.mobile === mobile);
      setSearchResults(results);
      setLoading(false);
    }, 1000);
  };

  const handleMobileNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMobileNumber(value);
    setIsValid(/^\d{10}$/.test(value)); // Basic validation for 10-digit mobile number
  };

  return (
    <div className="p-4">
      <SearchPatientBar
        onSearch={handleSearch}
        onMobileNumberChange={handleMobileNumberChange}
        mobileNumber={mobileNumber}
        isValid={isValid}
        loading={loading}
      />
      {loading && <p>Loading...</p>}
      <ul>
        {searchResults.length > 0 ? (
          searchResults.map((result) => (
            <li key={result.mobile}>{result.name}</li>
          ))
        ) : (
          <li>No results found</li>
        )}
      </ul>
    </div>
  );
};

export default SearchPatient;
