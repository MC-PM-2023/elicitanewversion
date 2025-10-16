import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
      <div className="min-h-screen flex flex-col justify-between">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-20">
          {/* Left: Welcome Message */}
          <div className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
              Welcome to Elicita <span className="text-purple-600">2.0</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Experience the next level of productivity with our upgraded features.
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
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm text-center">
              <img
                src={
                  user?.profilelink && user.profilelink !== "null"
                    ? user.profilelink
                    : "https://i.pravatar.cc/150?img=3"
                }
                alt="Profile"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-contain"
              />
              <h2 className="text-xl font-semibold text-gray-800">
                {user ? `${user.firstname} ${user.lastname}` : "Guest User"}
              </h2>
              <p className="text-gray-500 text-sm">
                {user?.role || "Product Manager"}
              </p>
              <p className="text-gray-600 mt-2">
                Leading the Elicita upgrade journey.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full bg-white py-20">
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
              <div
                key={i}
                className="p-6 bg-gray-50 rounded-lg shadow-lg hover:bg-gray-100"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  {feature.title}
                </h2>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Section */}
        <Footer />
      </div>
    </div>
  );
};

export default Landingpage;
