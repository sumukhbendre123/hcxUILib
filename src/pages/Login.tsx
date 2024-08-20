import React from "react";
import Logo from "../images/swasth_logo.png";
import animationImage from "../images/banner.svg";
import AuthForm from "../components/Auth/AuthForm";
import { login } from "../services/authService";
import ReferenceDropdown from "../components/ReferenceDropdown/ReferenceDropdown"; // Import the new dropdown component

const Login: React.FC = () => {
  const handleLogin = async (credentials: {
    username: string;
    password: string;
  }) => {
    await login(credentials);
  };
  const handleHoverChange = (elementId: string | null) => {
    console.log("Hovered element:", elementId);
    // Handle feedback logic here, such as showing tooltips or other UI updates
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
    <div className="rounded-sm h-screen border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark flex flex-col items-center justify-center p-4">
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
