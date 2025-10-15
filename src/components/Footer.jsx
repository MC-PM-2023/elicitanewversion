import React from 'react';
const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-900 text-gray-400 text-center py-3 text-sm z-50">
     Copyrights &copy; {new Date().getFullYear()} Datasolve Analytics. All rights reserved.
    </footer>

  );
};

export default Footer;
