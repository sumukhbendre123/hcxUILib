import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import LoadingButton from "../LoadingButton";
import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";

// Define the properties accepted by the AuthForm component
interface AuthFormProps {
  title: string; // Title of the form
  submitButtonLabel: string; // Label for the submit button
  onSubmit: (credentials: {
    username: string;
    password: string;
  }) => Promise<void>; // Function to handle form submission with username and password
  logo: string; // URL for the logo image
  banner: string; // URL for the banner image
  altText: string; // Alt text for the logo image
  isOTP?: boolean; // Optional flag to determine if OTP is required
  otpSubmit?: (mobileNumber: string) => Promise<void>; // Function to handle OTP submission
  participantCode?: string; // Optional initial value for participant code
}

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  submitButtonLabel,
  onSubmit,
  logo,
  banner,
  altText,
  isOTP = false,
  otpSubmit,
  participantCode,
}) => {
  // State variables for form inputs and validation status
  const [username, setUsername] = useState<string>(participantCode || ""); // Participant code or initial value
  const [password, setPassword] = useState<string>(""); // Password input
  const [mobileNumber, setMobileNumber] = useState<string>(""); // Mobile number for OTP
  const [loading, setLoading] = useState<boolean>(false); // Loading state for submit button
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true); // Validation state for email (not used currently)
  const [isValidMobile, setIsValidMobile] = useState<boolean>(true); // Validation state for mobile number
  const [isValidParticipantCode, setIsValidParticipantCode] =
    useState<boolean>(true); // Validation state for participant code
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Validate email format
  const validateEmail = (email: string): boolean =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  // Validate mobile number format (10 digits)
  const validateMobile = (mobile: string): boolean => /^\d{10}$/.test(mobile);

  // Validate participant code format
  const validateParticipantCode = (code: string): boolean =>
    /^hosp_demoop_\d{8}@swasth-hcx-dev$/.test(code);

  // Handle form submission
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Set loading state to true while submitting
    try {
      if (isOTP && otpSubmit) {
        // Handle OTP submission if isOTP is true
        if (validateMobile(mobileNumber)) {
          await otpSubmit(mobileNumber); // Submit OTP
        } else {
          toast.error("Invalid mobile number format!"); // Show error if mobile number is invalid
          setIsValidMobile(false); // Set validation state to false
        }
      } else {
        // Handle standard form submission
        await onSubmit({ username, password }); // Submit username and password
        toast.success("Operation successful!"); // Show success message
        navigate("/home"); // Redirect to home page upon successful submission
      }
    } catch (error) {
      toast.error("Please check the input details!"); // Show error if submission fails
    }
    setLoading(false); // Set loading state to false after submission
  };

  // Handle changes in the mobile number input
  const handleMobileNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const inputValue = e.target.value;
    setIsValidMobile(validateMobile(inputValue)); // Validate mobile number on change
    setMobileNumber(inputValue); // Update mobile number state
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left side: Branding and banner */}
      <div className="flex flex-col items-center justify-center w-1/2 bg-gray-100 p-8">
        <a className="mb-5.5" href="#">
          <img className="w-48" src={logo} alt={altText} /> {/* Logo image */}
        </a>
        <p className="font-bold text-xl text-black">HCX Provider App</p>
        <img className="mt-5 block" src={banner} alt="Banner" />{" "}
        {/* Banner image */}
      </div>

      {/* Right side: Auth form */}
      <div className="flex flex-col items-center justify-center w-1/2 p-8">
        <div className="w-full max-w-md">
          <h2 className="mb-9 text-2xl font-bold text-black text-center">
            {title} {/* Form title */}
          </h2>
          <form onSubmit={handleSubmit}>
            {!isOTP ? (
              <>
                {/* Participant code and password inputs */}
                <AuthInput
                  label="Participant Code"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setIsValidParticipantCode(
                      validateParticipantCode(e.target.value)
                    ); // Validate participant code on change
                  }}
                  placeholder="Enter your participant code"
                />
                <PasswordInput
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update password state on change
                />
              </>
            ) : (
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black">
                  Enter Mobile Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter your registered mobile number"
                    className={`w-full rounded-lg border ${
                      isValidMobile ? "border-stroke" : "border-red"
                    } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    onChange={handleMobileNumberChange} // Handle changes in mobile number input
                  />
                  {!isValidMobile && (
                    <p className="text-red-500">
                      Invalid mobile number format!
                    </p>
                  )}
                </div>
              </div>
            )}
            <div className="mb-5">
              {!loading ? (
                // Submit button
                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-lg bg-blue-700 text-white p-4 transition hover:bg-blue-600"
                  disabled={
                    !(isOTP
                      ? isValidMobile
                      : isValidParticipantCode && password) // Disable button if form inputs are invalid
                  }
                >
                  {submitButtonLabel} {/* Button label */}
                </button>
              ) : (
                // Show loading button while submitting
                <LoadingButton />
              )}
            </div>
          </form>
          <div className="flex flex-col items-center">
            <Link
              to="/reset-password"
              className="text-blue-700 hover:underline"
            >
              Forgot Password? {/* Link to reset password */}
            </Link>
            <div className="mt-1">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-blue-700 hover:underline">
                Sign Up {/* Link to sign up page */}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
