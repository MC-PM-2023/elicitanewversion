import { useState } from "react";
import { signupApi } from "../../api/authenticationApi/signupApi";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const saveSignupdetails = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await signupApi(formData);
      setData(response.data);
      return response.data; // ✅ Return the data to component
    } catch (error) {
      const message =
        error.response?.data?.message || "Something went wrong";
      setError({ message });
      return null; // ✅ Return null if failed
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, data, saveSignupdetails };
};
