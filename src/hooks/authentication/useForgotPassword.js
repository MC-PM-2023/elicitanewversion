import { useState } from "react";
import { forgotpasswordApi } from "../../api/authenticationApi/forgotpasswordApi";
export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleForgotPassword = async (email) => {
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");
    try {
      const response = await forgotpasswordApi({ email });
      if (response.success) {
        setSuccessMsg(response.message);
        return true;
      } else {
        setErrorMsg("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || "Something went wrong. Try again later."
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, successMsg, errorMsg, handleForgotPassword };
};
