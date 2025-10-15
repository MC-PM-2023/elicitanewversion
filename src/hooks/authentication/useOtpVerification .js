import { useState } from "react";

import { verifyOTPApi } from "../../api/authenticationApi/verifyOTPApi";
export const useOtpVerification = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const verifyOtp = async ({ email, otp }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await verifyOTPApi({email,otp})
      if (response.data.success) {
        setSuccess(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return { verifyOtp, loading, error, success };
};
