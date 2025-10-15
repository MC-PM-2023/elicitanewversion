import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Landingpage from './pages/Landingpage';
import Signin from './pages/Signin';
import Signup from './pages/Signup'
import OtpVerification from './pages/OtpVerification';
import Forgotpassword from './pages/Forgotpassword';
import ResetPassword from './pages/ResetPassword';
import ActivityLogs from './pages/ActivityLogs';


function App() {
  return (
    <Router>
  

      <main className="min-h-screen">
        <Routes>

          <Route path='/' element={<Signup />} />
          <Route path="/otpverification" element={<OtpVerification />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/forgotpassword" element={<Forgotpassword/>} />
          <Route path="/resetpassword" element={<ResetPassword/>} />
          <Route path="/landingpage" element={<Landingpage/>} />
          <Route path="/elicitanewversion" element={<Home />} />
          <Route path="/activitylogs"  element={<ActivityLogs/>}/>
        </Routes>
      </main>
     

    </Router>
  );
}


export default App;
