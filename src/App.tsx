import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import OTP from "./pages/OTP";
import ResetPassword from "./components/ForgotPassword/ResetPassword";
import QrCodeScanner from "./components/QrCodeScanner/QrCodeScanner";
import CursorConnect from "./components/CursorConnect/CursorConnect";
import SupportingDocuments from "./components/SupportingDocument/SupportingDocument";
import NotificationSection from "./components/Notifications/NotificationSection";
import { NotificationProps } from "./components/Notifications/Notification.types";
import { ToastContainer } from "react-toastify";
import SearchPatient from "./pages/SearchPatient";
import ShowcasePage from "./pages/ShowcasePage";
import SampleRequestPage from "./pages/SampleRequestPage";
import SamplePage from "./pages/SamplePage";

// Sample notifications to be used in the NotificationSection component
const sampleNotifications: NotificationProps[] = [
  {
    id: 1,
    header: "New Feature Available",
    text: "We've added a new feature to improve your experience. Check it out now!",
    sender_code: "System",
    date: "12 May, 2024",
    onClick: () => alert("Notification 1 clicked"), // Action to be performed on click
  },
  {
    id: 2,
    header: "Maintenance Alert",
    text: "Scheduled maintenance will occur on 2024-08-21 from 12:00 AM to 2:00 AM.",
    sender_code: "Admin",
    date: "2 Feb, 2024",
    onClick: () => alert("Notification 2 clicked"), // Action to be performed on click
  },
  {
    id: 3,
    header: "Welcome to the App!",
    text: "Thank you for joining us. We hope you enjoy the experience.",
    sender_code: "Support",
    date: "22 Jan, 2024",
    onClick: () => alert("Notification 3 clicked"), // Action to be performed on click
  },
];

// Wrapper component to provide props to NotificationSection
const NotificationSectionWrapper: React.FC = () => {
  return (
    <NotificationSection
      notifications={sampleNotifications}
      loading={false} // Indicates whether notifications are loading
      onNotificationClick={
        (id: number) => console.log(`Notification ${id} clicked`) // Log notification click
      }
      activeNotificationId={null} // Active notification id, initially null
    />
  );
};

// Main application component
const App: React.FC = () => {
  // State variables for handling various functionalities
  const [qrCodeData, setQrCodeData] = useState<any>(); // State to store QR code data
  const [documentType, setDocumentType] = useState<string>(""); // State to store document type
  const [fileErrorMessage, setFileErrorMessage] = useState<string>(""); // State for file error messages
  const [isSuccess, setIsSuccess] = useState<boolean>(false); // State for tracking success status
  const [selectedFile, setSelectedFile] = useState<File[]>([]); // State to store selected files
  const [fileLists, setFileLists] = useState<File[]>([]); // State to store file lists
  const [mobileNumber, setMobileNumber] = useState<string>(""); // State to store mobile number
  const [isValid, setIsValid] = useState<boolean>(true); // State to validate mobile number
  const [loading, setLoading] = useState<boolean>(false); // State for loading status

  // Callback function for handling new QR code scan results
  const onNewScanResult = (decodedText: any) => {
    setQrCodeData(decodedText); // Update QR code data state
  };

  // Handler function for mobile number input changes
  const handleMobileNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const isValidInput = /^\d{10}$/.test(inputValue); // Validate mobile number format
    setIsValid(isValidInput);
    setMobileNumber(inputValue);
  };

  // Function to perform search operation based on mobile number
  const search = (mobile: string) => {
    if (mobile === "") {
      alert("Please enter a mobile number"); // Alert if mobile number is empty
      return;
    }
    setLoading(true); // Set loading state to true
    // Your search logic here
    setLoading(false); // Set loading state to false after search
  };

  return (
    <Router>
      {/* Toast container for displaying notifications */}
      <ToastContainer />

      {/* Routing configuration */}
      <Routes>
        <Route path="/login" element={<Login />} /> {/* Login page route */}
        <Route
          path="/qr"
          element={
            <QrCodeScanner
              fps={60} // Frames per second for QR code scanning
              qrbox={250} // Size of the scanning box
              disableFlip={false} // Whether to disable the flip option
              qrCodeSuccessCallback={onNewScanResult} // Callback for successful QR code scan
              startButtonLabel={"Start Scanning"} // Label for the start button
              stopButtonLabel={"Stop Scanning"} // Label for the stop button
            />
          }
        />
        <Route path="/noti" element={<NotificationSectionWrapper />} />{" "}
        {/* Notifications page route */}
        <Route path="/sr" element={<SampleRequestPage />} />
        {/* SampleRequestPage route */}
        <Route path="/sample" element={<SamplePage />} />
        {/* SamplePage route */}
        <Route
          path="/cc"
          element={
            <CursorConnect description="This is a tooltip message">
              <div style={{ padding: "20px" }}>
                Hover over me to see the tooltip
              </div>
            </CursorConnect>
          }
        />
        <Route path="/otp" element={<OTP />} /> {/* OTP page route */}
        <Route path="/sp" element={<ShowcasePage />} />{" "}
        {/* ShowCasePage page route */}
        <Route path="/reset-password" element={<ResetPassword />} />{" "}
        {/* Reset password page route */}
        <Route
          path="/sd"
          element={
            <SupportingDocuments
              setDocumentType={setDocumentType}
              setFileErrorMessage={setFileErrorMessage}
              setIsSuccess={setIsSuccess}
              setSelectedFile={setSelectedFile}
              isSuccess={isSuccess}
              FileLists={fileLists}
              fileErrorMessage={fileErrorMessage}
              selectedFile={selectedFile}
            />
          }
        />
        <Route path="/search" element={<SearchPatient />} />{" "}
        {/* Search patient page route */}
        <Route path="/" element={<Login />} /> {/* Default route */}
      </Routes>
    </Router>
  );
};

export default App;
