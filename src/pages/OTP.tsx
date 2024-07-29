import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Logo from '../images/swasth_logo.png';
import animationImage from '../images/banner.svg';
import { sendOTP } from '../services/authService';
import AuthForm from '../components/Auth/AuthForm';

const OTP: React.FC = () => {
  const navigate = useNavigate();

  const handleSendOTP = async (mobileNumber: string) => {
    const response = await sendOTP({ mobile: mobileNumber });
    if (response.status === 200) {
      toast.success('OTP sent successfully!');
      navigate('/verify-otp', { state: mobileNumber });
    }
  };

  return (
    <div className="rounded-sm h-screen border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <AuthForm 
        title="Send OTP"
        submitButtonLabel="Send OTP"
        onSubmit={async () => {}}
        otpSubmit={handleSendOTP}
        isOTP
        logo={Logo}
        banner={animationImage}
        altText="Swasth Logo"
      />
    </div>
  );
};

export default OTP;
