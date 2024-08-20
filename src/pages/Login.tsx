import React from "react";
import Logo from "../images/swasth_logo.png";
import animationImage from "../images/banner.svg";
import AuthForm from "../components/Auth/AuthForm";
import { login } from "../services/authService";
import ReferenceDropdown from "../components/ReferenceDropdown/ReferenceDropdown";
import BackButton from "../components/BackButton/BackButton";

const Login: React.FC = () => {
  const handleLogin = async (credentials: {
    username: string;
    password: string;
  }) => {
    await login(credentials);
  };

  const appLabels = [
    { label: "Reference Apps", value: "" },
    { label: "SSP", value: import.meta.env.VITE_SSP_URL },
    { label: "OPD", value: import.meta.env.VITE_OPD_URL },
    { label: "BSP", value: import.meta.env.VITE_BSP_URL },
    { label: "ABSP", value: import.meta.env.VITE_ABSP_URL },
    { label: "PAYOR", value: import.meta.env.VITE_PAYOR_URL },
  ];

  const handleDropdownNavigation = (url: string) => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  return (
    <div className="relative h-screen flex flex-col items-center justify-center p-4 bg-white border border-stroke shadow-default dark:bg-boxdark dark:border-strokedark">
      <BackButton className="absolute top-4 left-4" />{" "}
      {/* Apply Tailwind CSS classes */}
      <ReferenceDropdown
        options={appLabels}
        onNavigate={handleDropdownNavigation}
      />
      <AuthForm
        title="Sign In"
        submitButtonLabel="Sign In"
        onSubmit={handleLogin}
        logo={Logo}
        banner={animationImage}
        altText="Swasth Logo"
      />
    </div>
  );
};

export default Login;
