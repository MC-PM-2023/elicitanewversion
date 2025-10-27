
// // src/pages/auth/ForgotPassword.jsx
// import React,{ useState } from "react";
// import { useForgotPassword } from "../hooks/authentication/useForgotPassword";
// import { useNavigate } from "react-router-dom";

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const { loading, successMsg, errorMsg, handleForgotPassword } =
//     useForgotPassword();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await handleForgotPassword(email);

//     // If successful, navigate to resetpassword with email
//     if (successMsg || !errorMsg) {
//       setTimeout(() => {
//         navigate("/resetpassword", { state: { email } });
//       }, 1000);
//     }
//   };

//   return (
//     <div className="flex min-h-screen flex-col justify-center px-6 py-12 bg-gray-900">
//       <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//       <img
//           alt="Your Company"
//           src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
//           className="mx-auto h-10 w-auto"
//         />
//         <h2 className="mt-10 text-center text-2xl font-bold text-white mb-6">
//           Forgot Password
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {errorMsg && <p className="text-red-500 text-center">{errorMsg}</p>}
//           {successMsg && (
//             <p className="text-green-500 text-center">{successMsg}</p>
//           )}

//           <div>
//             <label className="block text-sm font-medium text-gray-100 mb-1">
//               Email Address
//             </label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm" />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white  hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${
//               loading
//                 ? "bg-gray-500 cursor-not-allowed"
//                 : "bg-indigo-500 hover:bg-indigo-400"
//             }`}
//           >
//             {loading ? "Sending OTP..." : "Send OTP"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { useForgotPassword } from "../hooks/authentication/useForgotPassword";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [frontendError, setFrontendError] = useState("");
  const { loading, successMsg, errorMsg, handleForgotPassword } =
    useForgotPassword();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Basic validation
    if (!email.trim()) {
      setFrontendError("Please enter your email address.");
      return;
    }

    setFrontendError(""); // clear old validation error

    // ✅ Call API
    const success=await handleForgotPassword(email);

    // ✅ Only navigate when successMsg is received
    if (success) {
      setTimeout(() => {
        navigate("/resetpassword", { state: { email } });
      }, 1000);
    }
  };


  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 bg-gray-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold text-white mb-6">
          Forgot Password
        </h2>
        

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* ✅ Display errors and messages */}
          {frontendError && (
            <p className="text-red-500 text-center text-sm ">{frontendError}</p>
          )}
          {errorMsg && <p className="text-red-500 text-sm text-center">{errorMsg}</p>}
          {successMsg && (
            <p className="text-green-500 text-center text-sm">{successMsg}</p>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-100 mb-3">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setFrontendError("");
              }}
              className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white 
                         outline-1 outline-white/10 placeholder:text-gray-500 
                         focus:outline-2 focus:outline-indigo-500 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold text-white 
              ${loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-indigo-500 hover:bg-indigo-400"} 
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
