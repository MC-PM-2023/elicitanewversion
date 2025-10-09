// Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-900  text-dark py-4 shadow-md z-50">
    {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4"> */}
      {/* <div className="text-lg font-semibold">Datasolve Analytics Private Limited</div> */}
  
      {/* <ul className="flex space-x-6 text-sm">
        <li><a href="#" className="hover:underline">Home</a></li>
        <li><a href="#" className="hover:underline">Services</a></li>
        <li><a href="#" className="hover:underline">Contact</a></li>
        <li><a href="#" className="hover:underline">Privacy</a></li>
      </ul> */}
  
      {/* <div className="flex space-x-4">
        <a href="#" className="hover:text-gray-400">🌐</a>
        <a href="#" className="hover:text-gray-400">🐦</a>
        <a href="#" className="hover:text-gray-400">📘</a>
      </div> */}
    {/* </div> */}
    {/* Copyright */} <div className="mt-6 text-center text-sm text-gray-400"> &copy; {new Date().getFullYear()} Datasolve Analytics. All rights reserved. </div>
  </footer>
  
  );
};

export default Footer;
