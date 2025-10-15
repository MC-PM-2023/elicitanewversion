import React, { useState } from "react";
import { useSignup } from "../hooks/authentication/useSignup";
import { NavLink, useNavigate } from "react-router-dom";

export default function Signup() {
  const { error: backendError, loading, data, saveSignupdetails } = useSignup();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [frontendError, setFrontendError] = useState(""); // ✅ for validation errors
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFrontendError(""); // Clear error when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Basic frontend validation
    if (
      !formData.firstname ||
      !formData.lastname ||
      !formData.email ||
      !formData.password ||
      !formData.confirmpassword
    ) {
      setFrontendError("Please fill all fields.");
      return;
    }

    if (formData.password !== formData.confirmpassword) {
      setFrontendError("Passwords do not match.");
      return;
    }

    // ✅ Call API
    const response = await saveSignupdetails(formData);

    // ✅ Navigate only if signup success
    if (response?.success) {
      navigate("/otpverification", { state: { email: formData.email } });
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900 text-xs">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="datasolveanalytics"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-4 text-center text-2xl font-bold tracking-tight text-white">
          Sign up for an account
        </h2>

        {/* ✅ Error and Success Messages (below heading) */}
        {frontendError && (
          <p className=" mt-4 text-center text-red-500 text-sm">
            {frontendError}
          </p>
        )}
        {backendError && (
          <p className="text-center text-red-500 text-sm">
            {backendError.message}
          </p>
        )}
        {data && (
          <p className="text-center text-green-500 text-sm">
            Signup successful!
          </p>
        )}
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          {["firstname", "lastname", "email", "password", "confirmpassword"].map((field) => (
            <div key={field}>
              <label className="mb-2 block text-sm font-medium text-gray-100 capitalize">
                {field === "confirmpassword" ? "Confirm Password" : field}
              </label>
              <input
                id={field}
                name={field}
                type={
                  field === "password" || field === "confirmpassword"
                    ? "password"
                    : field === "email"
                    ? "email"
                    : "text"
                }
                placeholder={`Enter ${field}`}
                value={formData[field]}
                onChange={handleChange}
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white 
                  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 
                  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="flex mt-3 w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 
              text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 
              focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            {loading ? "Registering..." : "Sign up"}
          </button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Sign in
          </NavLink>
        </p>
      </div>
    </div>
  );
}
