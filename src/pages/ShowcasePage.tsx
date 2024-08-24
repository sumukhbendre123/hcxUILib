import React, { useState } from "react";
import MultiSelectDropdown from "../components/BasicUIComponent/MultiSelectDropdown";
import TextInputWithLabel from "../components/BasicUIComponent/TextInputWithLabel";
import SelectInput from "../components/BasicUIComponent/SelectInput";

const ShowcasePage: React.FC = () => {
  const [textInputValue, setTextInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
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

      <div className="mb-6">
        <TextInputWithLabel
          label="Text Input"
          value={textInputValue}
          onChange={(e) => setTextInputValue(e.target.value)}
          placeholder="Enter some text"
        />
        <p className="mt-2">Current Value: {textInputValue}</p>
      </div>

      <div className="mb-6">
        <SelectInput
          label="Select Input"
          value={selectValue}
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setSelectValue(e.target.value)
          }
          options={selectOptions}
        />
        <p className="mt-2">Selected Value: {selectValue}</p>
      </div>

      <div className="mb-6">
        <MultiSelectDropdown
          options={multiSelectOptions}
          onSelect={(selected: React.SetStateAction<string[]>) =>
            setMultiSelectValues(selected)
          }
        />
        <p className="mt-2">Selected Values: {multiSelectValues.join(", ")}</p>
      </div>
    </div>
  );
};

export default ShowcasePage;
