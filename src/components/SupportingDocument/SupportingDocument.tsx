import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import { handleFileChange } from "../../utils/attachmentSizeValidation"; // Utility function for handling file changes
import strings from "../../utils/strings"; // Utility for strings and localization

// Props interface for the SupportingDocuments component
interface SupportingDocumentsProps {
  setDocumentType: (value: string) => void;
  setFileErrorMessage: (message: string) => void;
  setIsSuccess: (isSuccess: boolean) => void;
  setSelectedFile: (files: File[]) => void;
  isSuccess: boolean;
  FileLists: File[];
  fileErrorMessage: string;
  selectedFile: File[];
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
  const [isCameraOpen, setIsCameraOpen] = useState(false); // State to control webcam
  const webcamRef = useRef<Webcam>(null); // Webcam reference

  // Handler to delete a file by its name
  const handleDelete = (name: string) => {
    const updatedFilesList = selectedFile.filter((file) => file.name !== name);
    setSelectedFile(updatedFilesList);
  };

  // Handler for changes in the document type dropdown
  const handleDocumentTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedType = e.target.value;
    setDocumentType(selectedType);
    updateDocumentType(selectedType);
  };

  // Capture photo from webcam and upload it
  const captureAndUpload = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const file = dataURLtoFile(imageSrc, `photo-${Date.now()}.jpg`);
        setSelectedFile([...selectedFile, file]);
        setIsCameraOpen(false); // Close the webcam after capturing
        setIsSuccess(true); // Indicate success
      }
    }
  };

  // Convert dataURL to File object
  const dataURLtoFile = (dataUrl: string, filename: string) => {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  return (
    <div className="mt-4 rounded-lg border border-stroke bg-white p-2 px-3 shadow-default dark:border-strokedark dark:bg-boxdark">
      {/* Title of the section */}
      <h2 className="text-1xl mb-4 font-bold text-black dark:text-black sm:text-title-xl2">
        {strings.SUPPORTING_DOCS}
      </h2>
      {/* Label for document type dropdown */}
      <label className="mb-2.5 block text-left font-medium text-white dark:text-black">
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
        {/* Button to open the webcam */}
        <div>
          <button
            onClick={() => setIsCameraOpen(!isCameraOpen)}
            className="rounded bg-primary px-4 py-2 text-black hover:bg-primary-dark"
          >
            {isCameraOpen ? "Close Camera" : "Scan Document"}
          </button>
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
            onChange={(e) =>
              handleFileChange(
                e,
                setFileErrorMessage,
                setIsSuccess,
                setSelectedFile
              )
            }
            required
          />
        </div>
      </div>

      {/* Show the camera and capture button when the camera is open */}
      {isCameraOpen && (
        <div className="mt-4">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="mb-4"
          />
          <button
            onClick={captureAndUpload}
            className="mt-2 rounded bg-primary px-4 py-2 text-black hover:bg-primary-dark"
          >
            Capture and Upload
          </button>
        </div>
      )}

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
