import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import LoadingButton from '../LoadingButton';
import AuthInput from './AuthInput';
import PasswordInput from './PasswordInput';

interface AuthFormProps {
  title: string;
  submitButtonLabel: string;
  onSubmit: (credentials: { username: string; password: string }) => Promise<void>;
  logo: string;
  banner: string;
  altText: string;
  isOTP?: boolean;
  otpSubmit?: (mobileNumber: string) => Promise<void>;
}

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  submitButtonLabel,
  onSubmit,
  logo,
  banner,
  altText,
  isOTP = false,
  otpSubmit
}) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isOTP && otpSubmit) {
        await otpSubmit(mobileNumber);
      } else {
        await onSubmit({ username, password });
      }
      toast.success("Operation successful!");
      navigate("/home");
    } catch (error) {
      toast.error("Please check the input details!");
      setLoading(false);
    }
  };

  const handleMobileNumberChange = (e: any) => {
    const inputValue = e.target.value;
    const isValidInput = /^\d{10}$/.test(inputValue);
    setIsValid(isValidInput);
    setMobileNumber(inputValue);
  };

  return (
    <div className="flex flex-wrap items-center">
      <div className="hidden w-full xl:block xl:w-1/2">
        <div className="py-17.5 px-26 text-center">
          <a className="mb-5.5 inline-block" href="#">
            <img className="hidden dark:block w-48" src={logo} alt={altText} />
            <img className="dark:hidden w-48" src={logo} alt={altText} />
          </a>

          <p className="2xl:px-20 font-bold text-xl text-black">
            HCX Provider App
          </p>

          <span className="mt-15 inline-block">
            <img className="block" src={banner} alt="Banner" />
          </span>
        </div>
      </div>
      <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
          <div className="text-center w-full xl:hidden">
            <a className="mb-5.5 inline-block" href="#">
              <img className="hidden dark:block w-48" src={logo} alt={altText} />
              <img className="dark:hidden w-48" src={logo} alt={altText} />
            </a>
          </div>
          <h2 className="mb-9 text-2xl font-bold text-black sm:text-title-xl2">
            {title}
          </h2>
          <form onSubmit={handleSubmit}>
            {!isOTP ? (
              <>
                <AuthInput 
                  label="Participant Code" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
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
                    className={`w-full rounded-lg border ${isValid ? 'border-stroke' : 'border-red'} bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    onChange={handleMobileNumberChange}
                  />
                  <span className="absolute right-4 top-4">
                    <svg
                      className="fill-current"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.5">
                        <path
                          d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                          fill=""
                        />
                      </g>
                    </svg>
                  </span>
                </div>
              </div>
            )}
            <div className="mb-5">
              {!loading ? (
                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 transition hover:bg-opacity-90"
                  disabled={!isOTP && (username === "" || password === "")}
                >
                  {submitButtonLabel}
                </button>
              ) : (
                <LoadingButton />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
