// src/hooks/auth/useResetPassword.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetpasswordApi } from "../../api/authenticationApi/resetpasswordApi";
export const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (formData) => {
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const response = await resetpasswordApi(formData);

      if (response.success) {
        setSuccessMsg(response.message);
        // Redirect to resend-otp page with email in state
        setTimeout(() => {
          navigate("/login", { state: { email: formData.email } });
        }, 1500);
      } else {
        setErrorMsg("Password reset failed. Try again.");
      }
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || "Something went wrong. Try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return { loading, successMsg, errorMsg, handleResetPassword };
};
