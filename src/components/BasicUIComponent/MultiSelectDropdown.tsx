import React, { useState } from "react";
import { toast } from "react-toastify";
import _ from "lodash";

// Define the props for the MultiSelectDropdown component
interface MultiSelectDropdownProps {
  options: string[]; // List of options for the dropdown
  onSelect: (selected: string[]) => void; // Handler for selected options
}

// Functional component for a multi-select dropdown
const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options,
  onSelect,
}) => {
  const [selected, setSelected] = useState([options[0]]); // Initialize selected options with the first option

  // Handle dropdown selection
  const onDropDownSelect = (value: string) => {
    const newSelected = _.uniq([...selected, value]); // Ensure no duplicate selections
    setSelected(newSelected);
    onSelect(newSelected);
  };

  // Handle removal of selected option
  const removeSelected = (value: string) => {
    if (selected.length === 1) {
      // Show error if only one option is selected
      toast.error("At least one option needs to be selected", {
        position: "top-right",
      });
      return;
    }
    const newSelected = selected.filter((item) => item !== value);
    setSelected(newSelected);
    onSelect(newSelected);
  };

  return (
    <div>
      <div className="relative z-20 w-full rounded border border-stroke p-1.5 pr-8 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
        <div className="flex flex-wrap items-center">
          {selected.map((value) => (
            <span
              key={value}
              className="m-1.5 z-50 flex items-center justify-center rounded border-[.5px] border-stroke bg-gray py-1.5 px-2.5 text-sm font-medium dark:border-strokedark dark:bg-white/30"
            >
              {value}
              <span
                className="cursor-pointer pl-2 hover:text-danger"
                onClick={() => removeSelected(value)}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.35355 3.35355C9.54882 3.15829 9.54882 2.84171 9.35355 2.64645C9.15829 2.45118 8.84171 2.45118 8.64645 2.64645L6 5.29289L3.35355 2.64645C3.15829 2.45118 2.84171 2.45118 2.64645 2.64645C2.45118 2.84171 2.45118 3.15829 2.64645 3.35355L5.29289 6L2.64645 8.64645C2.45118 8.84171 2.45118 9.15829 2.64645 9.35355C2.84171 9.54882 3.15829 9.54882 3.35355 9.35355L6 6.70711L8.64645 9.35355C8.84171 9.54882 9.15829 9.54882 9.35355 9.35355C9.54882 9.15829 9.54882 8.84171 9.35355 8.64645L6.70711 6L9.35355 3.35355Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
            </span>
          ))}
        </div>
        <select
          name=""
          id=""
          className="absolute top-0 left-0 z-20 h-full w-full bg-transparent opacity-0"
          onChange={(event) => onDropDownSelect(event.target.value)}
        >
          {options.map((value) => (
            <option key={value} value={value}>
              {value}
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

export default MultiSelectDropdown;
