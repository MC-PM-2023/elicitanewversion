// App.js
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useEffect,useState } from "react";
const Landingpage = () => {

const [user,setUser]=useState(null)
  const navigate=useNavigate()
useEffect(() => {
  const userFromLocalStorage = localStorage.getItem("user");
  // console.log(userFromLocalStorage)
  if (userFromLocalStorage) {
    setUser(JSON.parse(userFromLocalStorage)); // Parse the user data and set to state
  }
}, []);



  return (
    <div>
      <Header/>
    <div className="min-h-screen  flex flex-col justify-between">
      {/* Hero Section */}
      <motion.section
        className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Left: Welcome Message */}
        <div className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0">
          <motion.h1
            className="text-4xl font-extrabold text-gray-800 mb-6"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Welcome to Elicita <span className="text-purple-600">New Version</span>
          </motion.h1>
          <motion.p
            className="text-lg text-gray-600 mb-8"
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Experience the next level of productivity with our upgraded features.
          </motion.p>

          <motion.button
            className="px-8 py-3 bg-purple-600 text-white rounded-lg shadow-lg text-lg hover:bg-purple-700 focus:outline-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={()=>navigate("/elicitanewversion")}
          >
            Get Started
          </motion.button>
        </div>

        {/* Right: Profile Card */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm text-center">
            <img
              src="https://i.pravatar.cc/150?img=3"
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800">Brito</h2>       
            <p className="text-gray-500 text-sm">Product Manager</p>
            <p className="text-gray-600 mt-2">
              Leading the Elicita upgrade journey.
            </p>
          </div>
        </motion.div>
{/* 
<motion.div
  className="w-full md:w-1/2 flex justify-center"
  initial={{ x: 100 }}
  animate={{ x: 0 }}
  transition={{ duration: 1, delay: 0.5 }}
>
  <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm text-center">
    <img
      src={user?.profilelink || "https://i.pravatar.cc/150?img=3"}
      alt="Profile"
      className="w-24 h-24 rounded-full mx-auto mb-4"
    />
    <h2 className="text-xl font-semibold text-gray-800">
      {user ? `${user.firstname} ${user.lastname}` : "Guest User"}
    </h2>
    <p className="text-gray-500 text-sm">{user?.role || "Role not specified"}</p>
    <p className="text-gray-600 mt-2">
      Leading the Elicita upgrade journey.
    </p>
  </div>
</motion.div> */}

      </motion.section>

      {/* Features Section */}
      <motion.section
        className="w-full bg-white py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {[
            {
              title: "Easy to Use",
              desc: "Our product is user-friendly and designed for all levels of expertise.",
            },
            {
              title: "Fully Customizable",
              desc: "Tailor the features and settings to match your business needs.",
            },
            {
              title: "Scalable",
              desc: "As your business grows, our solution grows with you.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="p-6 bg-gray-50 rounded-lg shadow-lg hover:bg-gray-100"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {feature.title}
              </h2>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Footer Section */}
      {/* <motion.footer
        className="w-full bg-purple-600 text-white py-6"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <p>&copy; 2025 Elicita. All Rights Reserved.</p>
        </div>
      </motion.footer> */}
    </div>
    </div>
  );
};

export default Landingpage;
