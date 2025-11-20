// import React from "react";
// import { Navigate, useLocation } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem("token"); // or sessionStorage
//   const location = useLocation();

//   // If token not found, redirect to Signin
//   if (!token) {
//     console.warn("No token found → Redirecting to login");
//     return <Navigate to="/" replace state={{ from: location }} />;
//   }

// //   console.log("Token found → Access granted");
//   return children;
// };

// export default ProtectedRoute;


import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, roleRequired }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  const location = useLocation();

  // Not logged in
  if (!token) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  // Role check
  if (roleRequired && userRole !== roleRequired) {
    // Redirect to their proper page if role mismatch
    return <Navigate to={userRole === "admin" ? "/log" : "/home"} replace />;
  }

  return children;
};

export default ProtectedRoute;
