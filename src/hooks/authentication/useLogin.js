import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../api/authenticationApi/loginApi";
export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginApi(credentials);
      if (response.data.success) {
        setData(response.data);

        // ✅ Store token and user info in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("role",response.data.role)

        // ✅ Redirect to your protected route
        navigate("/landingpage");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error, data };
};
