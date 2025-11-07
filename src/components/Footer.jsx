import React from 'react';
const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full  bg-gray-900 text-white text-center py-1.5 text-xs z-50">
     Copyrights &copy; {new Date().getFullYear()} Datasolve Analytics. All rights reserved.
    </footer>

  );
};

export default Footer;
