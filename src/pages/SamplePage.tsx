// SamplePage.tsx
import React, { useState } from "react";
import { createApiClient } from "../components/ApiClient/ApiClient";

// Ensure environment variables are defined or throw an error
const keycloakBaseUrl =
  "https://dev-hcx.swasth.app/keycloack/api/v1/Beneficiary";
const registryBaseUrl =
  "https://dev-hcx.swasth.app/registry/api/v1/Beneficiary";

if (!keycloakBaseUrl || !registryBaseUrl) {
  throw new Error(
    "Environment variables REACT_APP_KEYCLOAK_BASE_URL and REACT_APP_REGISTRY_BASE_URL must be defined."
  );
}

const apiClient = createApiClient(keycloakBaseUrl, registryBaseUrl);

const SamplePage: React.FC = () => {
  const [participantCode, setParticipantCode] = useState("");
  const [participantData, setParticipantData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFetchParticipant = async () => {
    setLoading(true);
    setError(null);

    try {
      // Replace with actual username and password or fetch them from form inputs
      const token = await apiClient.generateToken("username", "password");
      const data = await apiClient
        .registry(token)
        .getParticipantByCode(participantCode);
      setParticipantData(data);
    } catch (err) {
      setError("Failed to fetch participant data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Fetch Participant Data</h1>
      <div className="mb-4">
        <label
          htmlFor="participantCode"
          className="block text-sm font-medium text-gray-700"
        >
          Participant Code
        </label>
        <input
          id="participantCode"
          type="text"
          value={participantCode}
          onChange={(e) => setParticipantCode(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button
        onClick={handleFetchParticipant}
        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Loading..." : "Fetch Data"}
      </button>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {participantData && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Participant Data</h2>
          <pre className="bg-gray-100 p-4 rounded-md">
            {JSON.stringify(participantData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default SamplePage;
