import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../images/swasth_logo.png";
import animationImage from "../images/banner.svg";
import AuthForm from "../components/Auth/AuthForm";

const Email: React.FC = () => {
  const navigate = useNavigate();
  const [inputError, setInputError] = useState<string>("");

  const handleEmailSubmit = async (credentials: {
    username: string;
    password: string;
  }) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(credentials.username)) {
      setInputError("Invalid email format");
      toast.error("Invalid email format");
    } else {
      setInputError("");
      // Do something with the email submission
      navigate("/home");
    }
  };

  return (
    <div className="rounded-sm h-screen border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <AuthForm
        title="Enter Email"
        submitButtonLabel="Submit"
        onSubmit={handleEmailSubmit}
        logo={Logo}
        banner={animationImage}
        altText="Swasth Logo"
      />
      {inputError && <p className="text-red-500 text-sm">{inputError}</p>}
    </div>
  );
};

export default Email;
