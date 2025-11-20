// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';
// import Home from './pages/Home';
// import Landingpage from './pages/Landingpage';
// import Signin from './pages/Signin';
// import Signup from './pages/Signup'
// import OtpVerification from './pages/OtpVerification';
// import Forgotpassword from './pages/Forgotpassword';
// import ResetPassword from './pages/ResetPassword';
// import ActivityLogs from './pages/ActivityLogs';
// import ProtectedRoute from './components/ProtectedRoute';
// function App() {
//   return (
//     <Router>
//       <main className="min-h-screen">
//         <Routes>

//           <Route path='/' element={<Signin />} />
//           <Route path="/otpverification" element={<OtpVerification />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/forgotpassword" element={<Forgotpassword/>} />
//           <Route path="/resetpassword" element={<ResetPassword/>} />
//           <Route path="/landingpage" element={<ProtectedRoute><Landingpage/></ProtectedRoute>} />
//           <Route path="/elicitanewversion" element={ <ProtectedRoute> <Home />  </ProtectedRoute>} />  
//           <Route path="/activitylogs"  element={<ProtectedRoute> <ActivityLogs/>  </ProtectedRoute>}/>
         
       
       
//         </Routes>
//       </main>
//     </Router>
//   );
// }


// export default App;


// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Signin from "./pages/Signin";
// import Landingpage from "./pages/Landingpage";
// import Admin from "./pages/Admin";
// import Home from './pages/Home';
// import ProtectedRoute from "./components/ProtectedRoute";
// import Signup from './pages/Signup'
// import OtpVerification from './pages/OtpVerification';
// import Forgotpassword from './pages/Forgotpassword';
// import ResetPassword from './pages/ResetPassword';

// function App() {
  // const [role, setRole] = useState(null);

  // // Read role from localStorage whenever App mounts
  // useEffect(() => {
  //   const storedRole = localStorage.getItem("role");
  //   if (storedRole) setRole(storedRole);
  // }, []);

//   return (
//     <Router>
//       <main className="min-h-screen">
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<Signin setRole={setRole} />} />
//           <Route path="/otpverification" element={<OtpVerification />} />
//            <Route path="/signup" element={<Signup />} />
//            <Route path="/forgotpassword" element={<Forgotpassword/>} />
//           <Route path="/resetpassword" element={<ResetPassword/>} />

//           {/* User Routes */}
//           {role === "User" && (
//             <>
//               <Route
//                 path="/landingpage"
//                 element={
//                   <ProtectedRoute>
//                     <Landingpage />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//       path="/elicitanewversion"
//       element={
//         <ProtectedRoute>
//           <Home />
//         </ProtectedRoute>
//       }
//     />
//               <Route path="*" element={<Navigate to="/landingpage" />} />
//             </>
            
//           )}

//           {/* Admin Routes */}
//           {role === "admin" && (
//             <>
//               <Route
//                 path="/admin"
//                 element={
//                   <ProtectedRoute>
//                     <Admin />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route path="*" element={<Navigate to="/admin" />} />
//             </>
//           )}

//           {/* Fallback for no role */}
//           {!role && <Route path="*" element={<Navigate to="/" />} />}
//         </Routes>
//       </main>
//     </Router>
//   );
// }

// export default App;

//corrected code
// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Signin from "./pages/Signin";
// import Landingpage from "./pages/Landingpage";
// import Admin from "./pages/Admin";
// import Home from "./pages/Home";
// import Signup from "./pages/Signup";
// import OtpVerification from "./pages/OtpVerification";
// import Forgotpassword from "./pages/Forgotpassword";
// import ResetPassword from "./pages/ResetPassword";
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {

//   const getRole = () => localStorage.getItem("role"); // Always read fresh

//   return (
//     <Router>
//       <main className="min-h-screen">
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<Signin />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/otpverification" element={<OtpVerification />} />
//           <Route path="/forgotpassword" element={<Forgotpassword />} />
//           <Route path="/resetpassword" element={<ResetPassword />} />
          
//           {/* User Routes */}
//           <Route
//             path="/landingpage"
//             element={
//               <ProtectedRoute roleRequired="User">
//                 <Landingpage />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/elicitanewversion"
//             element={
//               <ProtectedRoute roleRequired="User">
//                 <Home />
//               </ProtectedRoute>
//             }
//           />

//           {/* Admin Route */}
//           <Route
//             path="/admin"
//             element={
//               <ProtectedRoute roleRequired="admin">
//                 <Admin />
//               </ProtectedRoute>
//             }
//           />

//           {/* Fallback route */}
//           <Route
//             path="*"
//             element={
//               getRole() === "User" ? (
//                 <Navigate to="/landingpage" replace />
//               ) : getRole() === "admin" ? (
//                 <Navigate to="/admin" replace />
//               ) : (
//                 <Navigate to="/" replace />
//               )
//             }
//           />
//         </Routes>
//       </main>
//     </Router>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signin from "./pages/Signin";
import Landingpage from "./pages/Landingpage";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import OtpVerification from "./pages/OtpVerification";
import Forgotpassword from "./pages/Forgotpassword";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import TitleWrapper from "./components/TitleWrapper";

function App() {

  const getRole = () => localStorage.getItem("role");

  return (
    <Router>
      <main className="min-h-screen">
        <Routes>

          {/* Public Routes */}
          <Route
            path="/"
            element={
              <TitleWrapper title="Sign in">
                <Signin />
              </TitleWrapper>
            }
          />

          <Route
            path="/signup"
            element={
              <TitleWrapper title="Sign up">
                <Signup />
              </TitleWrapper>
            }
          />

          <Route
            path="/otpverification"
            element={
              <TitleWrapper title="OTP Verification">
                <OtpVerification />
              </TitleWrapper>
            }
          />

          <Route
            path="/forgot-password"
            element={
              <TitleWrapper title="Forgot Password">
                <Forgotpassword />
              </TitleWrapper>
            }
          />

          <Route
            path="/reset-password"
            element={
              <TitleWrapper title="Reset Password">
                <ResetPassword />
              </TitleWrapper>
            }
          />

          {/* User Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute roleRequired="User">
                <TitleWrapper title="Elicita 2.0">
                  <Landingpage />
                </TitleWrapper>
              </ProtectedRoute>
            }
          />

          <Route
            path="/search"
            element={
              <ProtectedRoute roleRequired="User">
                <TitleWrapper title="Search">
                  <Home />
                </TitleWrapper>
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/log"
            element={
              <ProtectedRoute roleRequired="admin">
                <TitleWrapper title="Log">
                  <Admin />
                </TitleWrapper>
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route
            path="*"
            element={
              getRole() === "User" ? (
                <Navigate to="/home" replace />
              ) : getRole() === "admin" ? (
                <Navigate to="/log" replace />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

        </Routes>
      </main>
    </Router>
  );
}

export default App;
