import React from 'react';

const Header = () => {
  return (
    <header className="border-b border-border-light dark:border-border-dark bg-white/80 dark:bg-background-dark/80 backdrop-blur-sm sticky top-0 z-30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <div className="text-primary-600">
              <span className="material-symbols-outlined text-4xl">database</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">Elicita New Version</h1>
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <a className="hover:text-primary-600 transition-colors" href="#">Home</a>
              <a className="text-primary-600 font-semibold border-b-2 border-primary-600" href="#">Search</a>
              <a className="hover:text-primary-600 transition-colors" href="#">Reports</a>
              <a className="hover:text-primary-600 transition-colors" href="#">Admin</a>
            </nav>
            <div
              className="w-10 h-10 rounded-full bg-cover bg-center border-2 border-primary-200"
              style={{
                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB7Ziqbhdf_LqE53nIjl6Rx932gog3iGGoQ6rcsVFPXsrmVHfSTJu1sKxNso6boPWVgPYCgXPXP0MTFIVEITDiVtRRLD_OWsE9nDt2P2z_X_GfQe9Tl150d1lVnw44lHTy6Fp2VaGCft5XL3fTzSUHA100QRb0TUti0z0BnFoD-aTpVvCJlR8SbyApRk09xsBmqVbpUg8CI5p6HCeGyzxcKFI5_fIz7ExVHQ7IzMux-RB-YmYEMC5cGL-Xm59A5L6aZUYpFZmEdAKM")'
              }}
            ></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
