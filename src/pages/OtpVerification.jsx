import React, { useState, useRef, useEffect } from "react";
import { useOtpVerification } from "../hooks/authentication/useOtpVerification ";
import { useLocation, useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);
  const submitRef = useRef();
  const { verifyOtp, loading, error, success } = useOtpVerification();
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  // Redirect to signup if email not passed
  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [email, navigate]);

  // If OTP verified successfully → go to login
  // useEffect(() => {
  //   if (success) {
  //     navigate("/login");
  //   }
  // }, [success, navigate]);
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 2000); // wait 2 seconds

      return () => clearTimeout(timer); // cleanup on unmount
    }
  }, [success, navigate]);

  const handleKeyDown = (e) => {
    if (
      !/^[0-9]{1}$/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "Tab" &&
      !e.metaKey
    ) {
      e.preventDefault();
    }

    if (e.key === "Delete" || e.key === "Backspace") {
      const index = inputsRef.current.indexOf(e.target);
      if (index > 0) {
        setOtp((prevOtp) => {
          const newOtp = [...prevOtp];
          newOtp[index - 1] = "";
          return newOtp;
        });
        inputsRef.current[index - 1].focus();
      }
    }
  };

  const handleInput = (e) => {
    const { value, dataset } = e.target;
    const index = parseInt(dataset.index, 10);

    if (value) {
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = value;
        return newOtp;
      });

      if (index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1].focus();
      } else {
        submitRef.current.focus();
      }
    }
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    if (/^[0-9]{6}$/.test(text)) {
      const digits = text.split("");
      setOtp(digits);
      submitRef.current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    await verifyOtp({ email, otp: otpCode });
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900 text-xs">
      <div className="max-w-md mx-auto text-center px-4 sm:px-8 py-10 rounded-xl shadow border border-slate-400">
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-1 text-slate-400">
            OTP Verification
          </h1>
          <p className="text-[15px] text-slate-400">
            Enter the 6-digit verification code sent to:
            <br />
            <span className="text-white-400 font-semibold"> {email}</span>
          </p>
        </header>

        {error && <p className="text-red-400 mb-3">{error}</p>}
        {success && <p className="text-green-400 mb-3">Verification successful!</p>}

        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                data-index={index}
                value={digit}
                ref={(el) => (inputsRef.current[index] = el)}
                onKeyDown={handleKeyDown}
                onInput={handleInput}
                onFocus={handleFocus}
                onPaste={handlePaste}
                className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                maxLength="1"
              />
            ))}
          </div>

          <div className="max-w-[260px] mx-auto mt-4">
            <button
              type="submit"
              ref={submitRef}
              disabled={loading}
              className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 transition-colors duration-150"
            >
              {loading ? "Verifying..." : "Verify Account"}
            </button>
          </div>
        </form>

        <div className="text-sm text-slate-500 mt-4">
          Didn’t receive the code?{" "}
          <a className="font-medium text-indigo-500 hover:text-indigo-600" href="#0">
            Resend
          </a>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
