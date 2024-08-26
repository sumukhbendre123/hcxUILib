import React from "react";

// Define the Option type for select input options
interface Option {
  value: string;
  label: string;
}

// Define the props for the SelectInput component
interface SelectInputProps {
  label: string; // Label text for the select input
  value: string | null; // Current value of the select input, can be null for no selection
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void; // Handler for select input changes
  options: Option[]; // Options for the select input
  disabled?: boolean; // Optional prop to disable the select input
  placeholder?: string; // Optional placeholder text for the select input
}

// Functional component for select input with a label
const SelectInput: React.FC<SelectInputProps> = ({
  label,
  value,
  onChange,
  options,
  disabled = false,
  placeholder = "Select an option", // Default placeholder text
}) => {
  return (
    <div>
      <label className="mb-2.5 text-black font-bold mt-3 block z-20 bg-white dark:bg-form-input">
        {label}
      </label>
      <div className="relative z-20 bg-white dark:bg-form-input">
        <select
          onChange={onChange}
          value={value ?? ""} // Default to empty string if value is null
          className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-6 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark"
          disabled={disabled}
        >
          <option value="" disabled>
            {placeholder} {/* Use placeholder prop */}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                fill="#637381"
              ></path>
            </g>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default SelectInput;
