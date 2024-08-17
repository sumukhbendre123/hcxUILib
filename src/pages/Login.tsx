import React from "react";
import Logo from "../images/swasth_logo.png";
import animationImage from "../images/banner.svg";
import AuthForm from "../components/Auth/AuthForm";
import { login } from "../services/authService";

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

  return (
    <div className="rounded-sm h-screen border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark flex">
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
