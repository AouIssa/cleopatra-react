import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-300 text-gray-400 py-4 mt-7">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div>
          <p className="text-sm">
            &copy; 2023 Cleopatra. All rights reserved.
          </p>
        </div>
        <div>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="text-sm hover:text-gray-100">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-sm hover:text-gray-100">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
