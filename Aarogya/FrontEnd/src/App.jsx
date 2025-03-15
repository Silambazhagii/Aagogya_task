import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Components/PatiendForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/landing" element={<LandingPage />} />
    </Routes>
  );
}

export default App;