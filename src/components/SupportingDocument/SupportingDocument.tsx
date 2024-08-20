import { handleFileChange } from "../../utils/attachmentSizeValidation";
import strings from "../../utils/strings";
import _ from "lodash";
import { useState } from "react";

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

  const handleDelete = (name: string) => {
    const updatedFilesList = selectedFile.filter((file) => file.name !== name);
    setSelectedFile(updatedFilesList);
  };

  const handleDocumentTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedType = e.target.value;
    setDocumentType(selectedType);
    updateDocumentType(selectedType); // Update the state with the selected type
  };

  return (
    <div className="mt-4 rounded-lg border border-stroke bg-white p-2 px-3 shadow-default dark:border-strokedark dark:bg-boxdark">
      <h2 className="text-1xl mb-4 font-bold text-black dark:text-black sm:text-title-xl2">
        {strings.SUPPORTING_DOCS}
      </h2>
      <label className="mb-2.5 block text-left font-medium text-black dark:text-black">
        {strings.DOC_TYPE}
      </label>
      <div className="relative z-20 mb-4 bg-white dark:bg-form-input">
        <select
          onChange={handleDocumentTypeChange}
          required
          className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-4 px-6 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark"
        >
          <option value="None">None</option>
          <option value="Bill/invoice">Medical Bill/invoice</option>
          <option value="Payment Receipt">Payment Receipt</option>
          <option value="Prescription">Prescription</option>
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
      <div className="flex items-center justify-evenly gap-x-6">
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
            className="hidden"
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
        <div>
          {fileErrorMessage && (
            <p className="bg-red-500 text-black">{fileErrorMessage}</p>
          )}
        </div>
      </div>
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
                    <td className="py-2">{documentType}</td>{" "}
                    {/* Display the selected document type */}
                    <td className="py-2">{file.name}</td>
                    <td className="py-2">
                      <button
                        onClick={() => handleDelete(file.name)}
                        className="text-red-600 underline"
                      >
                        Delete
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
