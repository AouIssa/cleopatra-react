import React, { useState } from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import ShopPage from "./components/ShopPage";
import CartPage from "./components/CartPage";
import SignInPage from "./components/SignInPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {

  const [cartItems, setCartItems] = useState({});

  const updateCart = (newItems) => {
    setCartItems(newItems);
  };

  return (
    <div className="App">
      <Router>
        <div className="mx-auto max-w-screen-2xl">
          <Navbar cartItems={cartItems} />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/shop" element={<ShopPage updateCart={setCartItems} />} />
            <Route path="/cart" element={<CartPage cartItems={cartItems} updateCart={updateCart} />} />
            <Route path="/signin" element={<SignInPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
