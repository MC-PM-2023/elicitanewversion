// import React, { useState } from "react";
// import { useLogin } from "../hooks/authentication/useLogin";
// import { NavLink } from "react-router-dom";
// import elicitaicon from "../assets/icons/elicitatitleicon.png";

// export default function Signin() {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const { handleLogin, loading, error, data } = useLogin();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   handleLogin(formData);
//   //   if (data.success) {
//   //     localStorage.setItem("permissions", JSON.stringify(permissions));
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     try {
//       const response = await handleLogin(formData); // wait for login
//       if (response?.success) {
//         // Save permissions from response
//         localStorage.setItem(
//           "permissions",
//           JSON.stringify(response.permissions)
//         );
//       }
//     } catch (err) {
//       console.error("Login failed:", err);
//     }
//   };
  

  

//   return (
//     <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">
//       <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//         <img
//           alt="Your Company"
//           src={elicitaicon}
//           className="mx-auto h-10 w-auto"
//         />
//         <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
//           Sign in to your account
//         </h2>
//       </div>

//       <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* {error && <p className="text-red-500 text-center text-sm">{error}</p>} */}
//           {data && data.success && (
//             <p className="text-green-500 text-center text-sm">{data.message}</p>
//           )}

//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-100"
//             >
//               Email address
//             </label>
//             <div className="mt-2">
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Enter email address"
//                 className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm"
//               />
//             </div>
//           </div>

//           <div>
//             <div className="flex items-center justify-between">
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-100"
//               >
//                 Password
//               </label>
//               <div className="text-sm">
//                 <NavLink
//                   to="/forgotpassword"
//                   className="font-semibold text-indigo-400 hover:text-indigo-300"
//                 >
//                   Forgot password?
//                 </NavLink>
//               </div>
//             </div>
//             <div className="mt-2">
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 value={formData.password}
//                 placeholder="Enter password"
//                 onChange={handleChange}

//                 className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm"
//               />
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
//             >
//               {loading ? "Signing in..." : "Sign in"}
//             </button>

//           </div>
//         </form>

//         <p className="mt-10 text-center text-sm text-gray-400">
//           Not a member ?{" "}
//           <NavLink
//             to="/signup"
//             className="font-semibold text-indigo-400 hover:text-indigo-300"
//           >
//             Sign Up 
//           </NavLink>
//         </p>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { useLogin } from "../hooks/authentication/useLogin";
import { NavLink, useNavigate } from "react-router-dom"; // <-- import useNavigate
import elicitaicon from "../assets/icons/elicitatitleicon.png";

export default function Signin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { handleLogin, loading, error, data } = useLogin();
  const navigate = useNavigate(); // <-- initialize navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await handleLogin(formData); // wait for login
      if (response?.success) {
        // Save permissions and role in localStorage
        localStorage.setItem(
          "permissions",
          JSON.stringify(response.permissions)
        );
        localStorage.setItem("name", response.firstname);
        localStorage.setItem("role", response.role);
        localStorage.setItem("token", response.token);
        localStorage.setItem("profilelink", response.profilelink);

        // Redirect based on role
        if (response.role === "admin") {
          navigate("/admin"); // <-- redirect to admin page
        } 
        else{
          navigate("/landingpage")
        }
      }
    } 
    

    
    
    catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src={elicitaicon}
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
        {error && <p className="text-red-500 text-center text-sm">{error}</p>}
          {data && data.success && (
            <p className="text-green-500 text-center text-sm">{data.message}</p>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-100"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-100"
              >
                Password
              </label>
              <div className="text-sm">
                <NavLink
                  to="/forgotpassword"
                  className="font-semibold text-indigo-400 hover:text-indigo-300"
                >
                  Forgot password?
                </NavLink>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                placeholder="Enter password"
                onChange={handleChange}
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-400">
          Not a member?{" "}
          <NavLink
            to="/signup"
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Sign Up
          </NavLink>
        </p>
      </div>
    </div>
  );
}
