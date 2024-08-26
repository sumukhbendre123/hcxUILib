import React from "react";

// Define the props for the TextInputWithLabel component
interface TextInputWithLabelProps {
  label: string; // Label text for the input field
  value: string; // Value of the input field
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Handler for input changes
}

// Functional component for text input with a label
const TextInputWithLabel: React.FC<TextInputWithLabelProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        style={{ border: "1px solid black", padding: "5px", width: "100%" }}
      />
    </div>
  );
};

export default TextInputWithLabel;
