import React from 'react';

interface AuthInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AuthInput: React.FC<AuthInputProps> = ({ label, value, onChange }) => (
  <div className="mb-4">
    <label className="mb-2.5 block font-medium text-black">
      {label}
    </label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={`Enter your ${label.toLowerCase()}`}
      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
    />
  </div>
);

export default AuthInput;
