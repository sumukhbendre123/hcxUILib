import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import AuthInput from "../Auth/AuthInput";
import LoadingButton from "../LoadingButton";
import Logo from "../../images/swasth_logo.png";
import Banner from "../../images/banner.svg";

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const navigate = useNavigate();

  const validateEmail = (email: string) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsValidEmail(validateEmail(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail) {
      toast.error("Invalid email address!");
      return;
    }

    setLoading(true);
    try {
      // Simulate sending a password reset email
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Password reset link sent!");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to send password reset link!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full">
      <div className="flex flex-col items-center justify-center w-1/2 bg-gray-100 p-8">
        <img className="w-48 mb-5" src={Logo} alt="Swasth Logo" />
        <p className="font-bold text-xl text-black">HCX Provider App</p>
        <img className="mt-5 block" src={Banner} alt="Banner" />
      </div>
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
            {!isValidEmail && (
              <p className="text-red-500">Invalid email address!</p>
            )}
            <div className="mt-6">
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
