import React from 'react';
import AuthForm from '../components/Auth/AuthForm';
import { signup } from '../services/authService';
import Logo from '../images/swasth_logo.png';
import animationImage from '../images/banner.svg';

const Signup: React.FC = () => {
  const handleSignup = async (credentials: { username: string; password: string }): Promise<void>  => {
    await signup(credentials);
  };

  return (
    <div className="signup-page">
      <AuthForm 
        title="Sign Up"
        submitButtonLabel="Sign Up"
        onSubmit={handleSignup}
        logo={Logo}
        banner={animationImage}
        altText="Swasth Logo"
      />

    </div>
  );
};

export default Signup;
