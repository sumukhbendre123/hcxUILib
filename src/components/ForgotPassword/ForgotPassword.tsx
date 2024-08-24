import React from "react";
import { Link } from "react-router-dom";

// Component to display links for password reset and sign up
const ForgotPassword: React.FC = () => {
  return (
    <div className="text-center mt-4">
      {/* Link to the password reset page */}
      <Link to="/reset-password" className="text-blue-700 hover:underline">
        Forgot Password?
      </Link>
      <div className="mt-2">
        {/* Link to the sign-up page for new users */}
        Don’t have an account?{" "}
        <Link to="/signup" className="text-blue-700 hover:underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
