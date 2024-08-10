import React, { useState } from "react";

interface PasswordInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="mb-4">
      <label className="mb-2.5 block font-medium text-black">{label}</label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        />
        <span
          onClick={togglePasswordVisibility}
          className="absolute right-4 top-4 cursor-pointer"
        >
          {showPassword ? (
            <svg
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M12 5c-7 0-10 6-10 7s3 7 10 7 10-6 10-7-3-7-10-7zm0 12c-4.25 0-7-3.582-7-5 0-1.418 2.75-5 7-5s7 3.582 7 5c0 1.418-2.75 5-7 5zm0-8c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3zm0 4c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1zm-7-4.286l-2-2-1.414 1.414 2 2z" />
            </svg>
          ) : (
            <svg
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M12 5c-7 0-10 6-10 7s3 7 10 7 10-6 10-7-3-7-10-7zm0 12c-4.25 0-7-3.582-7-5 0-1.418 2.75-5 7-5s7 3.582 7 5c0 1.418-2.75 5-7 5zm0-8c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3zm0 4c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1zm-7-4.286l-2-2-1.414 1.414 2 2z" />
            </svg>
          )}
        </span>
      </div>
    </div>
  );
};

export default PasswordInput;
