import React from "react";
import { Link } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  return (
    <div className="text-center mt-4">
      <Link to="/reset-password" className="text-blue-700 hover:underline">
        Forgot Password?
      </Link>
      <div className="mt-2">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-blue-700 hover:underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
