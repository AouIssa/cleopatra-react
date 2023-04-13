import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="container mx-auto">
      <nav className="fixed top-0 mt-3 left-0 w-full bg-transparent z-10">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div>{/* Logo or Brand Name */}</div>
          <button
            type="button"
            className="md:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              // Close icon
              <svg
                className="w-8 h-8 text-black hover:text-blue-500 transition-colors duration-200"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              // Hamburger icon
              <svg
                className="w-8 h-8 text-black hover:text-blue-500 transition-colors duration-200"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </button>
          <ul
            className={`${
              isMenuOpen ? "block" : "hidden"
            } md:flex absolute md:relative bg-white md:bg-transparent shadow-md md:shadow-none p-4 md:p-0 mt-2 md:mt-0 rounded-md md:rounded-none left-0 right-0 md:flex-row space-y-4 md:space-y-0 md:space-x-8`}
          >
            <li>
              <a href="/" className="text-black hover:text-blue-500 text-xl">
                Home
              </a>
            </li>
            <li>
              <a href="/shop" className="text-black hover:text-blue-500 text-xl">
                Shop
              </a>
            </li>
            <li>
              <a
                href="/signin"
                className="text-black hover:text-blue-500 text-xl"
              >
                Sign in
              </a>
            </li>
            <li>
              <a href="/about" className="text-black hover:text-blue-500 text-xl">
                About Cleopatra
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
