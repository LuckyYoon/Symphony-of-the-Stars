import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LaunchPage from "./pages/launch";
import MainPage from "./pages/main";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LaunchPage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
