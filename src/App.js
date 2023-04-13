import React from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <div className="App">
      <div className="mx-auto max-w-screen-2xl">
        <Navbar />
        <LandingPage />
        {/* Other components or routes */}
      </div>
    </div>
  );
}

export default App;
