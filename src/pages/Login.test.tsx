import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "./Login";

// Mock service calls for OTP sending and verification
jest.mock("../services/authService", () => ({
  sendOTP: jest.fn((phoneNumber) =>
    Promise.resolve({ success: true, message: "OTP sent successfully" })
  ),
  verifyOTP: jest.fn((otp) =>
    otp === "123456"
      ? Promise.resolve({
          success: true,
          message: "User signed in successfully",
        })
      : Promise.resolve({ success: false, message: "Invalid OTP" })
  ),
}));

describe("Login Component", () => {
  it("should sign in with valid user credentials", async () => {
    render(<Login />);

    // Fill in the phone number field
    fireEvent.change(screen.getByLabelText(/mobile number/i), {
      target: { value: "9876543210" },
    });

    // Click on the Send OTP button
    fireEvent.click(screen.getByRole("button", { name: /send otp/i }));

    // Assume OTP sent successfully
    await waitFor(() =>
      expect(screen.getByText(/otp sent successfully/i)).toBeInTheDocument()
    );

    // Fill in the OTP field
    fireEvent.change(screen.getByLabelText(/otp/i), {
      target: { value: "123456" },
    });

    // Click on the Sign In button
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    // Verify success message
    await waitFor(() =>
      expect(
        screen.getByText(/user signed in successfully/i)
      ).toBeInTheDocument()
    );
  });

  it("should not sign in an invalid user", async () => {
    render(<Login />);

    // Fill in the phone number field
    fireEvent.change(screen.getByLabelText(/mobile number/i), {
      target: { value: "1112223333" },
    });

    // Click on the Send OTP button
    fireEvent.click(screen.getByRole("button", { name: /send otp/i }));

    // Assume OTP sending failed or incorrect OTP scenario
    await waitFor(() =>
      expect(screen.getByText(/otp sent successfully/i)).toBeInTheDocument()
    );

    // Fill in the OTP field with an invalid OTP
    fireEvent.change(screen.getByLabelText(/otp/i), {
      target: { value: "654321" },
    });

    // Click on the Sign In button
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    // Verify failure message
    await waitFor(() =>
      expect(screen.getByText(/invalid otp/i)).toBeInTheDocument()
    );

    // Verify Sign Up option is disabled
    expect(screen.getByRole("button", { name: /sign up/i })).toBeDisabled();
  });

  it("should handle case where OTP is not received", async () => {
    render(<Login />);

    // Fill in the phone number field
    fireEvent.change(screen.getByLabelText(/mobile number/i), {
      target: { value: "9876543210" },
    });

    // Click on the Send OTP button
    fireEvent.click(screen.getByRole("button", { name: /send otp/i }));

    // Simulate no OTP received (assumed logic for such scenario)
    await waitFor(() =>
      expect(screen.getByText(/otp sent successfully/i)).toBeInTheDocument()
    );

    // Simulate user not receiving OTP and trying to resend
    fireEvent.click(screen.getByRole("button", { name: /resend otp/i }));

    // Verify message indicating OTP resent
    await waitFor(() =>
      expect(screen.getByText(/otp resent successfully/i)).toBeInTheDocument()
    );
  });
});
