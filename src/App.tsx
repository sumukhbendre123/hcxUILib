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

const sampleNotifications: NotificationProps[] = [
  {
    id: 1,
    header: "New Feature Available",
    text: "We've added a new feature to improve your experience. Check it out now!",
    sender_code: "System",
    date: "12 May, 2024",
    onClick: () => alert("Notification 1 clicked"),
  },
  {
    id: 2,
    header: "Maintenance Alert",
    text: "Scheduled maintenance will occur on 2024-08-21 from 12:00 AM to 2:00 AM.",
    sender_code: "Admin",
    date: "2 Feb, 2024",
    onClick: () => alert("Notification 2 clicked"),
  },
  {
    id: 3,
    header: "Welcome to the App!",
    text: "Thank you for joining us. We hope you enjoy the experience.",
    sender_code: "Support",
    date: "22 Jan, 2024",
    onClick: () => alert("Notification 3 clicked"),
  },
];

// Wrapper component to pass props
const NotificationSectionWrapper: React.FC = () => {
  return (
    <NotificationSection
      notifications={sampleNotifications}
      loading={false}
      onNotificationClick={(id: number) =>
        console.log(`Notification ${id} clicked`)
      }
      activeNotificationId={null}
    />
  );
};

const App: React.FC = () => {
  const [qrCodeData, setQrCodeData] = useState<any>();
  const [documentType, setDocumentType] = useState<string>("");
  const [fileErrorMessage, setFileErrorMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File[]>([]);
  const [fileLists, setFileLists] = useState<File[]>([]);
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const onNewScanResult = (decodedText: any) => {
    setQrCodeData(decodedText);
  };

  const handleMobileNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const isValidInput = /^\d{10}$/.test(inputValue);
    setIsValid(isValidInput);
    setMobileNumber(inputValue);
  };

  const search = (mobile: string) => {
    if (mobile === "") {
      alert("Please enter a mobile number");
      return;
    }
    setLoading(true);
    // Your search logic here
    setLoading(false);
  };

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/qr"
          element={
            <QrCodeScanner
              fps={60}
              qrbox={250}
              disableFlip={false}
              qrCodeSuccessCallback={onNewScanResult}
              startButtonLabel={"Start Scanning"}
              stopButtonLabel={"Stop Scanning"}
            />
          }
        />
        <Route path="/noti" element={<NotificationSectionWrapper />} />
        <Route
          path="/cc"
          element={
            <CursorConnect description="This is a tooltip message">
              <div style={{ padding: "20px", backgroundColor: "#f0f0f0" }}>
                Hover over me to see the tooltip
              </div>
            </CursorConnect>
          }
        />
        <Route path="/otp" element={<OTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
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
        <Route path="/search" element={<SearchPatient />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
