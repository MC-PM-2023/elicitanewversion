// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { loginApi } from "../../api/authenticationApi/loginApi";
// export const useLogin = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [data, setData] = useState(null);
//   const navigate = useNavigate();

//   const handleLogin = async (credentials) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await loginApi(credentials);
//       if (response.data.success) {
//         setData(response.data);

//         // ✅ Store token and user info in localStorage
//         localStorage.setItem("token", response.data.token);
//         localStorage.setItem("user", JSON.stringify(response.data));
//         localStorage.setItem("role",response.data.role)

//         // ✅ Redirect to your protected route
//         navigate("/landingpage");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { handleLogin, loading, error, data };
// };


import { useState } from "react";
import { loginApi } from "../../api/authenticationApi/loginApi";

// export const useLogin = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [data, setData] = useState(null);

//   const handleLogin = async (credentials) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await loginApi(credentials);

//       if (response.data.success) {
//         setData(response.data);

//         // ✅ Store token and user info in localStorage
        // localStorage.setItem("token", response.data.token);
        // localStorage.setItem("user", JSON.stringify(response.data));
        // localStorage.setItem("role", response.data.role);

//         // DO NOT navigate here — let the component handle it
//         return response.data; // return data to component
//       } else {
//         setError(response.data.message || "Login failed");
//         return response.data;
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//       return { success: false, message: err.response?.data?.message || "Login failed" };
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { handleLogin, loading, error, data };
// };



export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const handleLogin = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      // Assuming 'loginApi' is accessible globally or imported in the consuming environment
      const response = await loginApi(credentials);

      if (response.data.success) {
        setData(response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("role", response.data.role);
        // DO NOT handle localStorage/navigation here — let the component manage that after checks
        return response.data; // return data to component
      } else {
        // Handle API success: false response (e.g., OTP is required, or specific business logic failure)
        setError(response.data.message || "Login failed");
        return response.data;
      }
    } catch (err) {
      // Handle API network/HTTP error (e.g., 400 Bad Request, 401 Unauthorized, etc.)
      const errorMessage = err.response?.data?.message || "Login failed due to a network error.";
      setError(errorMessage);
      // Ensure a structure is returned that Signin.jsx can check against
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error, data };
};