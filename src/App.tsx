import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import OTP from "./pages/OTP";
import ResetPassword from "./components/ForgotPassword/ResetPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />{" "}
        {/* Add ResetPassword route */}
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
