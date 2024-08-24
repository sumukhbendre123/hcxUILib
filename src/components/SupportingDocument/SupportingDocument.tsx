// SupportingDocuments.tsx
import { handleFileChange } from "../../utils/attachmentSizeValidation"; // Utility function for handling file changes
import strings from "../../utils/strings"; // Utility for strings and localization
import _ from "lodash"; // Importing lodash (though not used in this file)
import { useState } from "react";

// Props interface for the SupportingDocuments component
interface SupportingDocumentsProps {
  setDocumentType: (value: string) => void; // Function to set the document type
  setFileErrorMessage: (message: string) => void; // Function to set file error messages
  setIsSuccess: (isSuccess: boolean) => void; // Function to set success state
  setSelectedFile: (files: File[]) => void; // Function to set selected files
  isSuccess: boolean; // Boolean indicating if the operation was successful
  FileLists: File[]; // List of files (not used in this component)
  fileErrorMessage: string; // Error message related to file handling
  selectedFile: File[]; // Array of selected files
}

const SupportingDocuments: React.FC<SupportingDocumentsProps> = ({
  setDocumentType,
  setFileErrorMessage,
  setIsSuccess,
  setSelectedFile,
  isSuccess,
  FileLists,
  fileErrorMessage,
  selectedFile,
}) => {
  const [documentType, updateDocumentType] = useState("");

  // Handler to delete a file by its name
  const handleDelete = (name: string) => {
    // Filter out the file with the specified name
    const updatedFilesList = selectedFile.filter((file) => file.name !== name);
    setSelectedFile(updatedFilesList); // Update the selected files list
  };

  // Handler for changes in the document type dropdown
  const handleDocumentTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedType = e.target.value;
    setDocumentType(selectedType); // Set the document type in parent component
    updateDocumentType(selectedType); // Update the local state with the selected type
  };

  return (
    <div className="mt-4 rounded-lg border border-stroke bg-white p-2 px-3 shadow-default dark:border-strokedark dark:bg-boxdark">
      {/* Title of the section */}
      <h2 className="text-1xl mb-4 font-bold text-black dark:text-black sm:text-title-xl2">
        {strings.SUPPORTING_DOCS}
      </h2>
      {/* Label for document type dropdown */}
      <label className="mb-2.5 block text-left font-medium text-black dark:text-black">
        {strings.DOC_TYPE}
      </label>
      <div className="relative z-20 mb-4 bg-white dark:bg-form-input">
        {/* Dropdown for selecting document type */}
        <select
          onChange={handleDocumentTypeChange} // Handle document type changes
          required
          className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-4 px-6 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark"
        >
          <option value="None">None</option>
          <option value="Bill/invoice">Medical Bill/invoice</option>
          <option value="Payment Receipt">Payment Receipt</option>
          <option value="Prescription">Prescription</option>
        </select>
        {/* Dropdown arrow icon */}
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
      <div className="flex items-center justify-evenly gap-x-6">
        {/* Camera input for scanning documents */}
        <div>
          <label
            htmlFor="cameraInput"
            className="bottom-0 right-0 flex h-15 w-15 cursor-pointer items-center justify-center rounded-full bg-primary text-black hover:bg-opacity-90 sm:bottom-2 sm:right-2"
          >
            <svg
              className="fill-current"
              width="20"
              height="20"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                fill=""
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                fill=""
              />
            </svg>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              name="cameraInput"
              id="cameraInput"
              className="sr-only" // Hide the file input
              onChange={(event: any) => {
                handleFileChange(
                  event,
                  setFileErrorMessage,
                  setIsSuccess,
                  setSelectedFile
                ); // Handle file change for camera input
              }}
            />
          </label>
        </div>
        <div>OR</div>
        {/* File input for selecting documents from file system */}
        <div>
          <label
            htmlFor="profile"
            className="cursor-pointer text-primary underline hover:text-primary-dark"
          >
            Select documents
          </label>
          <input
            id="profile"
            type="file"
            className="hidden" // Hide the file input
            onChange={
              (e) =>
                handleFileChange(
                  e,
                  setFileErrorMessage,
                  setIsSuccess,
                  setSelectedFile
                ) // Handle file change for file input
            }
            required
          />
        </div>
      </div>
      {/* Display file error message if present */}
      <div>
        {fileErrorMessage && (
          <p className="bg-red-500 text-black">{fileErrorMessage}</p>
        )}
      </div>
      {/* Display list of selected files with options to delete */}
      <div>
        {selectedFile.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Uploaded Documents:</h3>
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="py-2">Document Type</th>
                  <th className="py-2">Document Name</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {selectedFile.map((file, index) => (
                  <tr key={index}>
                    <td className="py-2">{documentType}</td>
                    <td className="py-2">{file.name}</td>
                    <td className="py-2">
                      <button onClick={() => handleDelete(file.name)}>
                        {/* Delete button with an icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 text-red-600 hover:text-red-800"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportingDocuments;
