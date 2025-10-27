// src/pages/auth/ResetPassword.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useResetPassword } from "../hooks/authentication/useResetPassword";

export default function ResetPassword() {
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newpassword: "",
  });

  const { loading, successMsg, errorMsg, handleResetPassword } =
    useResetPassword();

  // Get email passed from ForgotPassword
  useEffect(() => {
    if (location.state?.email) {
      setFormData((prev) => ({ ...prev, email: location.state.email }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleResetPassword(formData);
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 bg-gray-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold text-white mb-6">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {errorMsg && <p className="text-red-500 text-center">{errorMsg}</p>}
          {successMsg && (
            <p className="text-green-500 text-center">{successMsg}</p>
          )}

          {/* Email (read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-100 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="block w-full rounded-md bg-white/10 px-3 py-2 text-base text-gray-300 cursor-not-allowed"
            />
          </div>

          {/* OTP */}
          <div>
            <label className="block text-sm font-medium text-gray-100 mb-1">
              OTP
            </label>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleChange}
              className="block w-full rounded-md bg-white/5 px-3 py-2 text-base text-white placeholder-gray-400 focus:outline-2 focus:outline-indigo-500"
            
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-100 mb-1">
              New Password
            </label>
            <input
              type="password"
              name="newpassword"
              placeholder="Enter new password"
              value={formData.newpassword}
              onChange={handleChange}
              className="block w-full rounded-md bg-white/5 px-3 py-2 text-base text-white placeholder-gray-400 focus:outline-2 focus:outline-indigo-500"
            
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md text-white font-medium transition ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-indigo-500 hover:bg-indigo-400"
            }`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
