import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import '../App.css';

const Landingpage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("user");
    if (userFromLocalStorage) {
      setUser(JSON.parse(userFromLocalStorage));
    }
  }, []);

  

  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-col justify-between backgroundlanding ">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-20">
          {/* Left: Welcome Message */}
          <div className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
              Welcome to Elicita <span className="text-purple-600">2.0</span>
            </h1>
            <p className="text-lg text-gray-800 mb-8">
              Experience the next level of productivity with our upgraded features.
            </p>
            <p className="text-lg text-gray-600 mb-8 italic text-bold">
            Seek and Shall Find.
            </p>    
            <button
              className="px-8 py-3 bg-purple-600 text-white rounded-lg shadow-lg text-lg hover:bg-purple-700 focus:outline-none"
              onClick={() => navigate("/elicitanewversion")}
            >
              Get Started
            </button>
          </div>

          {/* Right: Profile Card */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="bg-white shadow-lg rounded-lg  w-[350px]  text-center rounded-xl">
              <img
                src={
                  user?.profilelink && user.profilelink !== "null"
                    ? user.profilelink
                    : "https://i.pravatar.cc/150?img=3"
                }
              
                alt="Profile"
                className="rounded-lg"
               
              />
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <Footer />
      </div>
    </div>
  );
};

export default Landingpage;
