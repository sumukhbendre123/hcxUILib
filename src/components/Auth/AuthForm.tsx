import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import LoadingButton from "../LoadingButton";
import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
// import CursorConnect from "../CursorConnect";

interface AuthFormProps {
  title: string;
  submitButtonLabel: string;
  onSubmit: (credentials: {
    username: string;
    password: string;
  }) => Promise<void>;
  logo: string;
  banner: string;
  altText: string;
  isOTP?: boolean;
  otpSubmit?: (mobileNumber: string) => Promise<void>;
  participantCode?: string;
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
  const [username, setUsername] = useState<string>(participantCode || "");
  const [password, setPassword] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidMobile, setIsValidMobile] = useState(true);
  const [isValidParticipantCode, setIsValidParticipantCode] = useState(true);
  const navigate = useNavigate();

  const validateEmail = (email: string) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const validateMobile = (mobile: string) => /^\d{10}$/.test(mobile);
  const validateParticipantCode = (code: string) =>
    /^hosp_demoop_\d{8}@swasth-hcx-dev$/.test(code);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isOTP && otpSubmit) {
        if (validateMobile(mobileNumber)) {
          await otpSubmit(mobileNumber);
        } else {
          toast.error("Invalid mobile number format!");
          setIsValidMobile(false);
        }
      } else {
        await onSubmit({ username, password });
        toast.success("Operation successful!");
        navigate("/home");
      }
    } catch (error) {
      toast.error("Please check the input details!");
    }
    setLoading(false);
  };

  const handleMobileNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setIsValidMobile(validateMobile(inputValue));
    setMobileNumber(inputValue);
  };

  return (
    <div className="flex h-screen w-full">
      <div className="flex flex-col items-center justify-center w-1/2 bg-gray-100 p-8">
        <a className="mb-5.5" href="#">
          <img className="w-48" src={logo} alt={altText} />
        </a>
        <p className="font-bold text-xl text-black">HCX Provider App</p>
        <img className="mt-5 block" src={banner} alt="Banner" />
      </div>
      <div className="flex flex-col items-center justify-center w-1/2 p-8">
        <div className="w-full max-w-md">
          <h2 className="mb-9 text-2xl font-bold text-black text-center">
            {title}
          </h2>
          <form onSubmit={handleSubmit}>
            {!isOTP ? (
              <>
                <AuthInput
                  label="Participant Code"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setIsValidParticipantCode(
                      validateParticipantCode(e.target.value)
                    );
                  }}
                  placeholder="Enter your participant code"
                />
                <PasswordInput
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                    onChange={handleMobileNumberChange}
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
                // <CursorConnect description="Form Submission">
                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-lg bg-blue-700 text-white p-4 transition hover:bg-blue-600"
                  disabled={
                    !(isOTP
                      ? isValidMobile
                      : isValidParticipantCode && password)
                  }
                >
                  {submitButtonLabel}
                </button>
              ) : (
                // </CursorConnect>
                <LoadingButton />
              )}
            </div>
          </form>
          <div className="flex flex-col items-center">
            <Link
              to="/reset-password"
              className="text-blue-700 hover:underline"
            >
              Forgot Password?
            </Link>
            <div className="mt-1">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-blue-700 hover:underline">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
