import React from "react";
import Navbar from "./components/Navbar";
import { Route, Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import ContactUsPage from "./pages/ContactUsPage";

function App() {
  return (
    <div>
      <Navbar />
      <div className="mt-16">
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/contact" element={<ContactUsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
