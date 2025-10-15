import React, { useState, useEffect } from 'react';
import elicitalogo from '../assets/logos/elicitanewversionlogo.gif'
const Header = () => {
  const [user, setUser] = useState(null);

  // Check for a logged-in user when the component mounts
  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("user");
    if (userFromLocalStorage) {
      setUser(JSON.parse(userFromLocalStorage)); // Parse the user data and set to state
    }
  }, []);

  // Fallback for profile picture if not available
  const defaultProfilePicture = "https://via.placeholder.com/40"; // Fallback image URL

  return (
    <header className="border-b border-border-light dark:border-border-dark bg-white/80 dark:bg-background-dark/80 backdrop-blur-sm sticky top-0 z-30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* <div className="flex items-center gap-4">
            <div className="text-primary-600">
              <span className="material-symbols-outlined text-4xl">database</span>
            </div>
            <h1 className="text-xl font-extrabold">Elicita New Version</h1>
          </div> */}
          <div className="flex items-center gap-4">
  {/* <div className="text-primary-600">
    <span className="material-symbols-outlined text-4xl">database</span>
  </div> */}
  <img 
    src={elicitalogo} 
    alt="Elicita New Version" 
    className="h-[60px]"
   
  />
</div>

          <div className="flex items-center gap-6">
            {/* Conditional rendering based on user data */}
            {user ? (
              <div className="flex items-center gap-3">
                {/* Profile Picture */}
                <div className="w-10 h-10 rounded-full bg-cover bg-center border-2 border-primary-200">
                  <img
                    src={user.profilelink || defaultProfilePicture}
                    alt="User Profile"
                    style={{ width: 40, height: 40, borderRadius:30 }}
                  />
                </div>
                {/* User Name (if available) */}
                <span className="text-sm text-primary-600">{user.firstname || "User" }</span>
              </div>
            ) : (
              // Fallback for when user data isn't available
              <div className="text-sm text-gray-500">Not Logged In</div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
