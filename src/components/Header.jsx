import React, { useState, useEffect } from 'react';
import elicitalogo from '../assets/logos/elicitanewversionlogo.gif';
import datasolvelogo from '../assets/logos/datasolve.png';

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("user");
    if (userFromLocalStorage) {
      setUser(JSON.parse(userFromLocalStorage));
    }
  }, []);

  const defaultProfilePicture = "https://via.placeholder.com/40";

  return (
    <header className="border-b border-border-light dark:border-border-dark bg-white/80 dark:bg-background-dark/80 backdrop-blur-sm sticky top-0 z-30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 w-full">

          {/* Left: Elicita Logo */}
          <div className="flex items-center">
            <img
              src={elicitalogo}
              alt="Elicita New Version"
              className="h-[50px]"
            />
          </div>

          {/* Right: Username, Profile, Datasolve Logo */}
          <div className="flex items-center gap-4 ml-auto">
          <img
              src={datasolvelogo}
              alt="Datasolve Logo"
              className="h-[40px]"
            />
            {user ? (
              <>
                <span className="text-sm text-primary-600">{user.firstname || "User"}</span>
                <div className="w-10 h-10 rounded-full bg-cover bg-center border-2 border-primary-200">
                  <img
                    src={user.profilelink || defaultProfilePicture}
                    alt="User Profile"
                    style={{ width: 40, height: 40, borderRadius: 30 }}
                  />
                </div>
              </>
            ) : (
              <div className="text-sm text-gray-500">Not Logged in</div>
            )}

         
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
