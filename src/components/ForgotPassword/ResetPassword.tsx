import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import AuthInput from "../Auth/AuthInput";
import LoadingButton from "../LoadingButton";
import Logo from "../../images/swasth_logo.png";
import Banner from "../../images/banner.svg";

// Component for resetting password by sending a reset link to the user's email
const ResetPassword: React.FC = () => {
  // State variables for email input, loading state, and email validity
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const navigate = useNavigate();

  // Function to validate email address format
  const validateEmail = (email: string) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  // Handler for email input change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsValidEmail(validateEmail(e.target.value));
  };

  // Handler for form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail) {
      toast.error("Invalid email address!"); // Show error if email is invalid
      return;
    }

    setLoading(true);
    try {
      // Simulate sending a password reset email
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Password reset link sent!"); // Show success message
      navigate("/login"); // Redirect to login page
    } catch (error) {
      toast.error("Failed to send password reset link!"); // Show error message if request fails
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left side of the screen with logo and banner */}
      <div className="flex flex-col items-center justify-center w-1/2 bg-gray-100 p-8">
        <img className="w-48 mb-5" src={Logo} alt="Swasth Logo" />
        <p className="font-bold text-xl text-black">HCX Provider App</p>
        <img className="mt-5 block" src={Banner} alt="Banner" />
      </div>
      {/* Right side of the screen with password reset form */}
      <div className="flex flex-col items-center justify-center w-1/2 p-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-black mb-6 text-center">
            Reset Password
          </h2>
          <p className="mb-4 text-gray-500 text-center">
            Enter your email address to receive a password reset link.
          </p>
          <form onSubmit={handleSubmit}>
            <AuthInput
              label="Email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
            />
            {/* Display error message if email is invalid */}
            {!isValidEmail && (
              <p className="text-red-500">Invalid email address!</p>
            )}
            <div className="mt-6">
              {/* Conditionally render button or loading spinner */}
              {!loading ? (
                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-lg bg-blue-700 text-white p-4 transition hover:bg-blue-600"
                  disabled={!email || !isValidEmail}
                >
                  Send Reset Link
                </button>
              ) : (
                <LoadingButton />
              )}
            </div>
          </form>
          {/* Link to navigate back to the login page */}
          <div className="flex justify-center mt-4">
            <Link to="/login" className="text-blue-700 hover:underline">
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
