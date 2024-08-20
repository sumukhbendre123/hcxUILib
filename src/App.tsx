import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import OTP from "./pages/OTP";
import ResetPassword from "./components/ForgotPassword/ResetPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QrCodeScanner from "./components/QrCodeScanner/QrCodeScanner";
import CursorConnect from "./components/CursorConnect/CursorConnect";
import SupportingDocuments from "./components/SupportingDocument/SupportingDocument";

const App: React.FC = () => {
  const [qrCodeData, setQrCodeData] = useState<any>();
  const [documentType, setDocumentType] = useState<string>("");
  const [fileErrorMessage, setFileErrorMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File[]>([]);
  const [fileLists, setFileLists] = useState<File[]>([]);

  const onNewScanResult = (decodedText: any) => {
    setQrCodeData(decodedText);
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
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
