import React from "react";

interface TextInputWithLabelProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
}

const TextInputWithLabel: React.FC<TextInputWithLabelProps> = ({
  label,
  value,
  onChange,
  placeholder = "",
  disabled = false,
  type = "text",
}) => {
  return (
    <div className="mt-3 text-base font-bold text-black dark:text-white">
      <label className="block">{label}</label>
      <div className="mt-2">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full rounded-lg border-[1.5px] border-stroke bg-white py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        />
      </div>
    </div>
  );
};

export default TextInputWithLabel;
