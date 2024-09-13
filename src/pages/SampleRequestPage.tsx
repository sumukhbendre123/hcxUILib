import React, { useState } from "react";
import GenerateOutgoingRequest from "../components/GenerateOutgoingRequest/GenerateOutgoingRequest"; // Adjust path as needed
import { toast } from "react-toastify";

const SampleRequestPage: React.FC = () => {
  // State to hold form inputs
  const [url, setUrl] = useState<string>("");
  const [payload, setPayload] = useState<object>({});
  const [requestSent, setRequestSent] = useState<boolean>(false);

  // Function to handle form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestSent(true); // Indicates that the form has been submitted
  };

  // Function to handle success scenario
  const handleSuccess = (data: any) => {
    toast.success("Request succeeded! Data received: " + JSON.stringify(data));
    setRequestSent(false); // Reset request state
  };

  // Function to handle error scenario
  const handleError = (error: any) => {
    toast.error("Request failed! Error: " + error.message);
    setRequestSent(false); // Reset request state
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sample Request Page</h1>

      <form onSubmit={handleFormSubmit} className="mb-4">
        <div className="mb-3">
          <label className="block text-gray-700 font-medium mb-2">
            API URL:
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter API URL"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700 font-medium mb-2">
            Payload (JSON format):
          </label>
          <textarea
            value={JSON.stringify(payload, null, 2)}
            onChange={(e) => {
              try {
                setPayload(JSON.parse(e.target.value));
              } catch (error) {
                toast.error("Invalid JSON format");
              }
            }}
            placeholder="Enter JSON payload"
            className="w-full p-2 border border-gray-300 rounded h-40"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
          disabled={requestSent}
        >
          Send Request
        </button>
      </form>

      {requestSent && (
        <GenerateOutgoingRequest
          url={url}
          payload={payload}
          onSuccess={handleSuccess}
          onError={handleError}
        />
      )}
    </div>
  );
};

export default SampleRequestPage;
