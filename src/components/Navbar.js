import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ onSearchInputChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navbarBgColor, setNavbarBgColor] = useState("bg-transparent");
  const [logoScale, setLogoScale] = useState("scale-100");

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setNavbarBgColor("bg-gray-300");
      setLogoScale("scale-75");
    } else {
      setNavbarBgColor("bg-transparent");
      setLogoScale("scale-100");
    }
  };

  return (
    <nav
      className={`fixed top-0 pt-3 left-0 w-full z-10 ${navbarBgColor} transition-all duration-300`}
    >
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div
          className={`transform ${logoScale} transition-transform duration-300`}
        ></div>
        <button
          type="button"
          className="md:hidden focus:outline-none z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        ></button>
        <ul
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex absolute md:relative bg-white md:bg-transparent shadow-md md:shadow-none p-4 md:p-0 mt-2 md:mt-0 rounded-md md:rounded-none left-0 right-0 md:flex-row space-y-4 md:space-y-0 md:space-x-8`}
        >
          <li>
            <Link to="/" className="text-black hover:text-blue-500 text-xl">
              Home
            </Link>
          </li>
          <li>
            <Link to="/shop" className="text-black hover:text-blue-500 text-xl">
              Shop
            </Link>
          </li>
          <li>
            <Link
              to="/signin"
              className="text-black hover:text-blue-500 text-xl"
            >
              Sign in
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-black hover:text-blue-500 text-xl"
            >
              About Cleopatra
            </Link>
          </li>
          {/* Add the search input */}
          <li className="flex items-center">
            <input
              type="search"
              className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
              placeholder="Search"
              onChange={onSearchInputChange}
            />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
