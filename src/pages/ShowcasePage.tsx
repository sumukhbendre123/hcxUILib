import React, { useState } from "react";
import MultiSelectDropdown from "../components/BasicUIComponent/MultiSelectDropdown";
import TextInputWithLabel from "../components/BasicUIComponent/TextInputWithLabel";
import SelectInput from "../components/BasicUIComponent/SelectInput";

const ShowcasePage: React.FC = () => {
  const [textInputValue, setTextInputValue] = useState("");
  const [selectValue, setSelectValue] = useState<string | null>(null); // Allow null for no selection
  const [multiSelectValues, setMultiSelectValues] = useState<string[]>([]);

  const selectOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const multiSelectOptions = ["Option 1", "Option 2", "Option 3"];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Basic UI Components Showcase</h1>

      <div>
        <TextInputWithLabel
          label="Text Input"
          value={textInputValue}
          onChange={(e) => setTextInputValue(e.target.value)}
        />
        <p>Current Value: {textInputValue}</p>
      </div>

      <div className="mb-6">
        <SelectInput
          label="Select Input"
          value={selectValue}
          onChange={(e) => setSelectValue(e.target.value || null)} // Set to null if empty
          options={selectOptions}
          placeholder="Select an option" // Pass placeholder prop
        />
        <p className="mt-2">
          Selected Value: {selectValue || "No option selected"}
        </p>
      </div>

      <div className="mb-6">
        <MultiSelectDropdown
          options={multiSelectOptions}
          onSelect={(selected: string[]) => setMultiSelectValues(selected)}
        />
        <p className="mt-2">
          Selected Values: {multiSelectValues.join(", ") || "Option 1"}
        </p>
      </div>
    </div>
  );
};

export default ShowcasePage;
