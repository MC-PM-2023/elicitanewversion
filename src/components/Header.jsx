// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import elicitalogo from "../assets/logos/elicitanewversionlogo.gif";
// import datasolvelogo from "../assets/logos/datasolve.png";
// import { Link } from "react-router-dom";
// const Header = () => {
//   const [user, setUser] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const menuRef = useRef(null);
//   const navigate = useNavigate();

//   const defaultProfilePicture = "https://via.placeholder.com/40";

//   // Load user from localStorage
//   useEffect(() => {
//     const userFromLocalStorage = localStorage.getItem("user");
//     if (userFromLocalStorage) {
//       setUser(JSON.parse(userFromLocalStorage));
//     }
//   }, []);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Navigate to activity logs page
//   const handleActivityLogsClick = () => {
//     setIsOpen(false);
//     navigate("/activitylogs");
//   };

//   return (
//     <header className="border-b border-border-light dark:border-border-dark bg-white/80 dark:bg-background-dark/80 backdrop-blur-sm sticky top-0 z-30">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-col sm:flex-row items-center justify-between h-auto sm:h-16 w-full gap-3 sm:gap-0 py-3 sm:py-0">

//           {/* Left: Datasolve Logo */}
//           <div className="flex items-center sm:justify-start flex-shrink-0">
//             <Link to="/landingpage">
//             <img
//               src={datasolvelogo}
//               alt="Datasolve Logo"
//               className="h-[40px] sm:h-10 md:h-10 lg:h-10"
//               loading="lazy"

              
//             />
//             </Link>
//           </div>

//           {/* Right Section */}
//           <div className="flex items-center gap-6 ml-auto relative" ref={menuRef}>
//             {user ? (
//               <>
//                 {/* User Name + Profile */}
//                 <div
//                   className="flex items-center gap-2 cursor-pointer select-none"
//                   onClick={() => setIsOpen((prev) => !prev)}
//                 >
//                   <span className="text-sm sm:text-base text-primary-600 whitespace-nowrap">
//                     {user.firstname || "User"}
//                   </span>
//                   <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-200">
//                     <img
//                       src={user.profilelink || defaultProfilePicture}
//                       alt="User Profile"
//                       className="object-contain w-full h-full"
//                     />
//                   </div>
//                 </div>


//                 {/* Dropdown */}
//                 {isOpen && (
//                   <div className="absolute  top-14 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 animate-fadeIn">
//                     <button
//                       onClick={handleActivityLogsClick}
//                       className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     >
//                       Activity Logs
//                     </button>
//                     <hr className="border-gray-200" />
//                     {/* <button
//                       onClick={() => {
//                         localStorage.removeItem("user");
//                         setUser(null);
//                         setIsOpen(false);
//                       }}
//                       className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     >
//                       Logout
//                     </button> */}
//                   </div>
//                 )}
//               </>
//             ) : (
//               <div className="text-sm sm:text-base text-gray-500 whitespace-nowrap">
//                 Not Logged In
//               </div>
//             )}

//             {/* Rightmost: Elicita Logo */}
//             <img
//               src={elicitalogo}
//               alt="Elicita New Version"
//               className="h-[50px] sm:h-14 md:h-13"
//               loading="lazy"
//             />
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;


import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import elicitalogo from "../assets/logos/elicitanewversionlogo.gif";
import datasolvelogo from "../assets/logos/datasolve.png";

const Header = () => {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const defaultProfilePicture = "https://via.placeholder.com/40";

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("user");
    if (userFromLocalStorage) {
      setUser(JSON.parse(userFromLocalStorage));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleActivityLogsClick = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    navigate("/")
  };

  return (
    <header className="border-b border-border-light dark:border-border-dark bg-white/80 dark:bg-background-dark/80 backdrop-blur-sm sticky top-0 z-30">
      <div className=" mx-auto px-3 ">
        {/* --- FLEX ROW FOR DESKTOP --- */}
        <div className="flex items-center justify-between h-16 w-full gap-4">
          
          {/* LEFT: Datasolve Logo */}
          <div className="flex items-center">
            <Link to="/landingpage">
              <img
                src={datasolvelogo}
                alt="Datasolve Logo"
                className="h-[40px] sm:h-10 md:h-10 lg:h-10"
                loading="lazy"
              />
            </Link>
          </div>

          {/* RIGHT SECTION (User + Elicita Logo) */}
          <div className="flex items-center gap-6 relative" ref={menuRef}>
            {user ? (
              <>
                <div
                  className="flex items-center gap-2 cursor-pointer select-none"
                  onClick={() => setIsOpen((prev) => !prev)}
                >
                  <span className="text-sm sm:text-base text-primary-600 whitespace-nowrap">
                    {user.firstname || "User"}
                  </span>
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-200">
                    <img
                      src={user.profilelink || defaultProfilePicture}
                      alt="User Profile"
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>

                {/* Dropdown */}
                {isOpen && (
                  <div className="absolute top-14 right-40 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 animate-fadeIn">
                    <button
                      onClick={handleActivityLogsClick}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                    <hr className="border-gray-200" />
                  </div>
                )}
              </>
            ) : (
              <div className="text-sm sm:text-base text-gray-500 whitespace-nowrap">
                Not Logged In
              </div>
            )}

            {/* RIGHTMOST: Elicita Logo */}
            <img
              src={elicitalogo}
              alt="Elicita Logo"
              className="h-[50px] sm:h-14 md:h-13"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </header>



  );
};

export default Header;
