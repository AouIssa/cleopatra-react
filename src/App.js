import React from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <div className="App">
      <div className="mx-auto max-w-screen-2xl">
        <Navbar />
        <LandingPage />
        <Footer />
      </div>
    </div>
  );
}

export default App;
