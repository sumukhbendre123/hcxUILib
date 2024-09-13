import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Define the Props interface for the component
// This defines the expected properties for the component
interface Props {
  url: string; // The endpoint URL for the API request
  payload: object; // The data to be sent with the POST request
  onSuccess?: (data: any) => void; // Optional callback function for handling successful responses
  onError?: (error: any) => void; // Optional callback function for handling errors
}

const GenerateOutgoingRequest: React.FC<Props> = ({
  url,
  payload,
  onSuccess,
  onError,
}) => {
  // State to manage the loading status of the request
  const [loading, setLoading] = useState<boolean>(false);

  // Function to handle the API request
  const handleRequest = async () => {
    setLoading(true); // Set loading to true when the request starts
    try {
      // Perform the POST request to the API endpoint
      const response = await axios.post(
        `${process.env.hcx_mock_service}/${url}`,
        payload
      );
      setLoading(false); // Set loading to false after receiving the response

      // Check if the response status is 200 (OK)
      if (response.status === 200 && onSuccess) {
        // Call the onSuccess callback with the response data
        onSuccess(response.data);
      } else {
        // Throw an error if the response status is not 200
        throw new Error("Request failed");
      }
    } catch (error) {
      setLoading(false); // Set loading to false in case of an error
      console.error("Error during API request", error); // Log the error to the console

      if (onError) {
        // Call the onError callback with the error
        onError(error);
      }

      // Display an error toast message
      toast.error("An error occurred while processing the request.");
    }
  };

  return (
    <div>
      <button onClick={handleRequest} disabled={loading}>
        {loading ? "Processing..." : "Submit Request"}{" "}
        {/* Button text changes based on loading status */}
      </button>
    </div>
  );
};

export default GenerateOutgoingRequest;
