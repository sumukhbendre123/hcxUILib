import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import qs from "qs";

// Keycloak API Client
const keycloakApi = (baseUrl: string) => {
  return {
    // Function to generate an access token from Keycloak
    generateToken: async (
      username: string | undefined,
      password: string | undefined
    ) => {
      // Headers for the request to specify the content type
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };

      // Body of the request, encoded in URL-encoded format
      const body = qs.stringify({
        client_id: "registry-frontend",  // ID of the client requesting the token
        username: username,              // User's username
        password: password,              // User's password
        grant_type: "password",          // OAuth2 grant type for password-based token
      });

      try {
        // Send a POST request to Keycloak to get the token
        const response: AxiosResponse<{ access_token: string }> =
          await axios.post(
            `${baseUrl}/auth/realms/swasth-health-claim-exchange/protocol/openid-connect/token`,
            body,
            { headers }
          );
        // Return the access token from the response
        return response.data.access_token;
      } catch (error) {
        // Log and rethrow any errors encountered
        console.error("Keycloak token generation error:", error);
        throw error;
      }
    },
  };
};

// Registry API Client
const registryApi = (baseUrl: string, token: string) => {
  return {
    // Function to retrieve participant details by participant code
    getParticipantByCode: async (code: any) => {
      // Payload for the request containing the filter criteria
      const payload = { filters: { participant_code: { eq: code } } };
      // Headers for the request including the Bearer token for authorization
      const headers = { Authorization: `Bearer ${token}` };

      try {
        // Send a POST request to the registry API to search for the participant
        const response: AxiosResponse<any> = await axios.post(
          `${baseUrl}/participant/search`,
          payload,
          { headers }
        );
        // Return the data from the response
        return response.data;
      } catch (error) {
        // Log and rethrow any errors encountered
        console.error("Registry API error:", error);
        throw error;
      }
    },

    // Add more functions for other registry operations here
  };
};

// Create a combined API client
export const createApiClient = (
  keycloakBaseUrl: string,   // Base URL for Keycloak API
  registryBaseUrl: string    // Base URL for Registry API
) => {
  // Create an instance of the Keycloak client
  const keycloakClient = keycloakApi(keycloakBaseUrl);

  return {
    ...keycloakClient,        // Include all Keycloak client methods
    registry: (token: string) => registryApi(registryBaseUrl, token), // Method to get a Registry API client with the provided token
  };
};
